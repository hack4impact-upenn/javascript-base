import { Button, Typography } from "@material-ui/core";
import { gql } from "apollo-boost";
import React from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import client from "./config/Apollo";

type FormUpdate = React.ChangeEvent<HTMLInputElement>;

interface LoginFormState {
  email: string;
  password: string;
  error: string;
}

class LoginForm extends React.Component<{}, LoginFormState> {
  state: LoginFormState = {
    email: "",
    password: "",
    error: ""
  };

  private LOGIN_QUERY = gql`
    query login($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `;

  // Takes a field name and returns a function that changes that name to event value
  private handleFieldChange = (field: string): ((e: FormUpdate) => void) => {
    return (e: FormUpdate) => {
      this.setState({ ...this.state, [field]: e.target.value });
    };
  };

  private handleLogin = (): void => {
    client
      .query({
        query: this.LOGIN_QUERY,
        variables: {
          email: this.state.email,
          password: this.state.password
        }
      })
      .then(() => {
        window.location.href = "/";
      })
      .catch((error: any) => {
        this.setState({ ...this.state, error: error.graphQLErrors[0].message });
      });
  };

  public render = () => {
    return (
      <ValidatorForm
        onSubmit={this.handleLogin}
        style={{
          padding: "20px",
          marginTop: "40px",
          backgroundColor: "white",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
        }}
      >
        <Typography variant="h5">Log In</Typography>
        <TextValidator
          type="text"
          placeholder="Enter your Email"
          label="Email"
          name="email"
          onChange={this.handleFieldChange("email")}
          validators={["required"]}
          errorMessages={["Required"]}
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
          validators={["required"]}
          errorMessages={["Required"]}
          value={this.state.password}
          style={{ margin: "10px 0" }}
          error={this.state.error != ""}
          helperText={this.state.error == "" ? "" : this.state.error}
          fullWidth
        />
        <br />
        <Button
          style={{ margin: "10px 0" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Log In
        </Button>
      </ValidatorForm>
    );
  };
}

export default LoginForm;
