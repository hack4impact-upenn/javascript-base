import React from "react";
import axios from "axios";
import { AppBar, Button, Grid, TextField } from '@material-ui/core';


interface LoginPageState {
  username: string
  password: string
}

class LoginPage extends React.Component<{}, LoginPageState> {

  state: LoginPageState = {
    username: "",
    password: ""
  }

  private handleClick() {
    var apiBaseUrl = "http://localhost:4000/api/";
    var payload = {
      email: this.state.username,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "login", payload)
      .then(function(response: any) {
        console.log(response);
        if (response.data.code == 200) {
          console.log("Login successful");
        } else if (response.data.code == 204) {
          console.log("Username password do not match");
          alert("username password do not match");
        } else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }
  
  public render() {
    return (
      <div>
        <AppBar title="Login" />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <TextField
            placeholder="Enter your Username"
            label="Username"
            onChange={(event) =>
              this.setState({ username: event.target.value })
            }
          />
          <br />
          <TextField
            type="password"
            placeholder="Enter your Password"
            label="Password"
            onChange={(event) =>
              this.setState({ password: event.target.value })
            }
          />
          <br />
          <Button
            color="primary"
            style={{ margin: 15 }}
            onClick={() => this.handleClick()}
          >
            Submit
          </Button>
        </Grid>
      </div>
    );
  }
}

export default LoginPage;
