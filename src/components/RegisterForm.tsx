import React from "react";

import { Button, Typography } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import client from "./config/Apollo";
import { gql } from "apollo-boost";

type FormUpdate = React.ChangeEvent<HTMLInputElement>;

interface RegisterPageState {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
  error: string,
}

class RegisterForm extends React.Component<{}, RegisterPageState> {
  state: RegisterPageState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: ""
  };

  private SIGNUP_MUTATION = gql`
    mutation createUser(
      $email: String!
      $password: String!
      $firstName: String!
      $lastName: String!
      $role: String!
    ) {
      createUser(
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        role: $role
      ) {
        email
      }
    }
  `;

  private EMAIL_QUERY = gql`
    query emailTaken($email: String!) {
      emailTaken(email: $email)
    }
  `;

  // Takes a field name and returns a function that changes that name to event value
  private handleFieldChange = (field: string): ((e: FormUpdate) => void) => {
    return (e: FormUpdate) => {
      this.setState({ ...this.state, [field]: e.target.value });
    };
  };

  private handleRegister = (e: React.FormEvent<Element>): void => {
    client.mutate({
      mutation: this.SIGNUP_MUTATION,
      variables: {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        role: "user"
      }
    }).then((data: any) => {
      window.location.replace("/");
    }).catch((error: any) => {
      console.log(error)
    })
  }

  public componentDidMount = (): void => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value: string) => {
      return value === this.state.password;
    });

    ValidatorForm.addValidationRule("emailTaken", (value: string) => {
      return client
        .query({
          query: this.EMAIL_QUERY,
          variables: {
            email: value
          }
        })
        .then((data: any) => {
          return data.data.emailTaken;
        });
    });
  };

  public render = () => {
    return (
      <ValidatorForm
        onSubmit={this.handleRegister}
        style={{
          padding: "20px",
          marginTop: "40px",
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
        }}
      >
        <Typography variant="h5">Register</Typography>
        <TextValidator
          type="text"
          placeholder="Enter your first name"
          label="First Name"
          name="firstName"
          onChange={this.handleFieldChange("firstName")}
          validators={["required"]}
          errorMessages={["Required"]}
          value={this.state.firstName}
          style={{ margin: "10px 0" }}
          fullWidth
        />
        <br />
        <TextValidator
          type="text"
          placeholder="Enter your last name"
          label="Last Name"
          name="lastName"
          onChange={this.handleFieldChange("lastName")}
          validators={["required"]}
          errorMessages={["Required"]}
          value={this.state.lastName}
          style={{ margin: "10px 0" }}
          fullWidth
        />
        <br />
        <TextValidator
          type="text"
          placeholder="Enter your Email"
          label="Email"
          name="email"
          onChange={this.handleFieldChange("email")}
          validators={["required", "isEmail", "emailTaken"]}
          errorMessages={[
            "Required",
            "Enter a valid email",
            "This email is already in use"
          ]}
          value={this.state.email}
          style={{ margin: "10px 0" }}
          fullWidth
        />
        <br />
        <TextValidator
          type="password"
          placeholder="Enter your Password"
          label="Password"
          name="password"
          onChange={this.handleFieldChange("password")}
          validators={["required", "matchRegexp:.{8,}"]}
          errorMessages={[
            "Required",
            "Password must be longer than 8 characters"
          ]}
          value={this.state.password}
          style={{ margin: "10px 0" }}
          error={this.state.error != ""}
          helperText={this.state.error == "" ? "" : this.state.error}
          fullWidth
        />
        <br />
        <TextValidator
          type="password"
          placeholder="Confirm Password"
          label="Confirm Password"
          name="confirm_password"
          onChange={this.handleFieldChange("confirmPassword")}
          validators={["required", "isPasswordMatch"]}
          errorMessages={["Required", "Passwords don't match"]}
          value={this.state.confirmPassword}
          style={{ margin: "10px 0" }}
          fullWidth
        />
        <br />
        <Button
          style={{ margin: "10px 0" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </ValidatorForm>
    );
  };
}

export default RegisterForm;
