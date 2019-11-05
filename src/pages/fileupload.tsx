import React from "react";
import { AppBar, Button, Grid, TextField, FormControlLabel, Checkbox, Typography } from '@material-ui/core';

import client from "../components/config/Apollo"
import { gql } from "apollo-boost";

import FileUploadForm from '../components/FileUploadForm'

class FileUpload extends React.Component<{}, {}> {

  public render() {
    return (
      <React.Fragment>
        <AppBar title="Login" />
        <Grid container justify="center">
          <Grid item xs = {10} sm = {6} md = {4} lg = {4}>
            <FileUploadForm></FileUploadForm>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default FileUpload;
