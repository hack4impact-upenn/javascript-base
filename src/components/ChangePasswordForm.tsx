import React from "react";

import { Button, Link, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import client from "./config/Apollo"
import { gql } from "apollo-boost";

type FormUpdate = React.ChangeEvent<HTMLInputElement>;

interface ChangePasswordPageState {
  currUser: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  error: string;
}

class ChangePasswordForm extends React.Component<{}, ChangePasswordPageState> {
  state: ChangePasswordPageState = {
    currUser: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    error: ""
  }

  private CURRENT_USER_QUERY = gql`
    query me {
      me {
        firstName
        lastName
        email
        role
      }
    }
  `;

  private PASSWORD_MUTATION = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!) {
      changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
    }
  `;

  // Takes a field name and returns a function that changes that name to event value
  private handleFieldChange = (field: string): ((e: FormUpdate) => void) => {
    return (e: FormUpdate) => {
      this.setState({ ...this.state, [field]: e.target.value })
    }
  }

  private handleChangePassword = (): void => {
    client.mutate({
      mutation: this.PASSWORD_MUTATION,
      variables: {
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      }
    }).then(() => {
      // Redirect to home page
      // TODO: success message
      window.location.href = "/";
    }).catch((error: any) => {
      console.log(error)
    })
  }

  public componentDidMount = (): void => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value: string) => {
      return value === this.state.newPassword;
    });
 }

  public render = () => {
    return (
      <ValidatorForm onSubmit={this.handleChangePassword} style={{
        padding: "20px",
        marginTop: "40px",
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
      }}>
        <Link href="/">Back</Link>
        <br />
        <br />
        <Typography variant="h5">Change Password</Typography>
        <TextValidator type="password" placeholder="Old Password" label="Old Password" name="password"
          onChange={this.handleFieldChange("oldPassword")}
          validators={['required']} 
          errorMessages={['Required', 'Doesn\'t match old password']}
          value={this.state.oldPassword}
          style={{ margin: "10px 0" }}
          error={this.state.error != ""}
          helperText={this.state.error == "" ? "" : this.state.error}
          fullWidth />
        <br />
        <TextValidator type="password" placeholder="New Password" label="New Password" name="password"
          onChange={this.handleFieldChange("newPassword")}
          validators={['required', 'matchRegexp:.{8,}']}
          errorMessages={['Required', 'Password must be longer than 8 characters']}
          value={this.state.newPassword}
          style={{ margin: "10px 0" }}
          error={this.state.error != ""}
          helperText={this.state.error == "" ? "" : this.state.error}
          fullWidth />
        <br />
        <TextValidator type="password" placeholder="Confirm New Password" label="Confirm New Password" name="confirm_password"
          onChange={this.handleFieldChange("confirmPassword")}
          validators={['required', 'isPasswordMatch']}
          errorMessages={['Required', 'Passwords don\'t match']}
          value={this.state.confirmPassword}
          style={{ margin: "10px 0" }}
          fullWidth />
        <br />
        <Button style={{ margin: "10px 0" }} variant="contained" color="primary" type="submit">Update Password</Button>
      </ValidatorForm>
    )
  }
}

export default ChangePasswordForm 