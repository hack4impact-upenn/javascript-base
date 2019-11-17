import React, { Component } from "react";

import Navbar from "../components/Navbar";
import UserTable from "../components/admin/UserTable";

import { Grid } from "@material-ui/core";

class AdminPage extends React.Component {
  public render = () => {
    return (
      <React.Fragment> 
        <Navbar></Navbar>
        <Grid container justify="center">
          <Grid style = {{ paddingTop: "30px", paddingBottom: "30px"}} item xs = {12} sm = {10} md = {10} lg = {10}>
            <UserTable></UserTable>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default AdminPage;
