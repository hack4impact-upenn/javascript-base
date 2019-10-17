import React, { Component } from "react";
import { Button, Grid, Typography, Paper } from "@material-ui/core";

const style = { Paper: { padding: 20, margin: 20 } };

const Banner = props => (
  <Paper style={style.Paper}>
    <Grid container>
      <Grid item sm>
        <Typography variant="h4">User Management</Typography>
      </Grid>
      <Grid item sm>
        <div style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            style={{ marginRight: 20 }}
          >
            Invite User
          </Button>
          <Button variant="contained" color="primary" size="medium">
            Add User
          </Button>
        </div>
      </Grid>
    </Grid>
  </Paper>
);

export default Banner;
