import React from "react";
import { AppBar,Grid,  } from '@material-ui/core';

import RegisterForm from "../components/RegisterForm"

class RegisterPage extends React.Component<{}, {}> {

  public render() {
    return (
        <React.Fragment>
          <AppBar title="Login" />
          <Grid container justify="center">
            <Grid item xs = {10} sm = {6} md = {4} lg = {4}>
              <RegisterForm></RegisterForm>
            </Grid>
          </Grid>
        </React.Fragment>
    );
  }
}

export default RegisterPage;
