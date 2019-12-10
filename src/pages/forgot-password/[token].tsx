import React from "react";
import { Button, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useRouter } from "next/router";
import client from "../../components/config/Apollo";
import { gql } from "apollo-boost";
import { decodeResetPasswordLink } from "../../services/decode-link";

// TODO: convert to hook in order to be able to useRouter();
//       or do the long verbose thing

type FormUpdate = React.ChangeEvent<HTMLInputElement>;

interface ForgotPasswordPageState {
  userId: string;
  password: string;
  confirmPassword: string;
  error: string;
}

class ForgotPasswordForm extends React.Component<{}, ForgotPasswordPageState> {
  state: ForgotPasswordPageState = {
    userId: "",
    password: "",
    confirmPassword: "",
    error: ""
  }

  private RESET_PASSWORD_MUTATION = gql`
    mutation resetPassword($userId: String!, $newPassword: String!) {
      resetPassword(userId: $userId, newPassword: $newPassword)
    }
  `;

  // Takes a field name and returns a function that changes that name to event value
  private handleFieldChange = (field: string): ((e: FormUpdate) => void) => {
    return (e: FormUpdate) => {
      this.setState({ ...this.state, [field]: e.target.value })
    }
  }

  private handleSubmitForgotPassword = (e: React.FormEvent<Element>): void => {
    client.mutate({
      mutation: this.RESET_PASSWORD_MUTATION,
      variables: {
        userId: this.state.userId,
        newPassword: this.state.password,
      }
    }).then(() => {
      // TODO : Redirect to different page
      console.log('> Successfully reset password');
    }).catch((error: any) => {
      console.log(error)
    })
  }

  public componentDidMount = (): void => {
    // Check that URL is a proper URL for resetting a password 
    const router = useRouter();
    const token: any = router.query.token;

    // Store userId
    const userId: string = decodeResetPasswordLink(token);
    this.setState({
      userId: userId
    });
    console.log('> URL is valid');

    ValidatorForm.addValidationRule('isPasswordMatch', (value: string) => {
      return value === this.state.password;
    });
  }

  public render = () => {
    return (
      <ValidatorForm onSubmit={this.handleSubmitForgotPassword} style={{
        padding: "20px",
        marginTop: "40px",
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
      }}>
        <Typography variant="h5">Forgot your password? Reset it here!</Typography>
        <TextValidator 
          type="password" 
          placeholder="Enter your Password" 
          label="Password" 
          name="password"
          onChange={this.handleFieldChange("password")}
          validators={['required', 'matchRegexp:.{8,}']}
          errorMessages={['Required', 'Password must be longer than 8 characters']}
          value={this.state.password}
          style={{ margin: "10px 0" }}
          error={this.state.error != ""}
          helperText={this.state.error == "" ? "" : this.state.error}
          fullWidth />
        <br />
        <TextValidator 
          type="password" 
          placeholder="Confirm Password" 
          label="Confirm Password" 
          name="confirm_password"
          onChange={this.handleFieldChange("confirmPassword")}
          validators={['required', 'isPasswordMatch']}
          errorMessages={['Required', 'Passwords don\'t match']}
          value={this.state.confirmPassword}
          style={{ margin: "10px 0" }}
          fullWidth />
        <br />
        <Button 
          style={{ margin: "10px 0" }} 
          variant="contained" 
          color="primary" 
          type="submit">Reset password</Button>
      </ValidatorForm>
    )
  }
}

export default ForgotPasswordForm