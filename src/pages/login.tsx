import React from "react";
import { AppBar, Button, Grid, TextField, FormControlLabel, Checkbox, Typography } from '@material-ui/core';

import client from "../components/config/Apollo"
import { gql } from "apollo-boost";

import LoginForm from '../components/LoginForm'

class LoginPage extends React.Component<{}, {}> {

  public render() {
    return (
      <React.Fragment>
        <AppBar title="Login" />
        <Grid container justify="center">
          <Grid item xs = {10} sm = {6} md = {4} lg = {4}>
            <LoginForm></LoginForm>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default LoginPage;
