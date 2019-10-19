import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Grid } from "@material-ui/core";
import axios from "axios";


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
        <MuiThemeProvider>
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
                hintText="Enter your Username"
                floatingLabelText="Username"
                onChange={(_: React.FormEvent<{}>, newValue: string) =>
                  this.setState({ username: newValue })
                }
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(_: React.FormEvent<{}>, newValue: string) =>
                  this.setState({ password: newValue })
                }
              />
              <br />
              <RaisedButton
                label="Submit"
                primary={true}
                style={{ margin: 15 }}
                onClick={() => this.handleClick()}
              />
            </Grid>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default LoginPage;
