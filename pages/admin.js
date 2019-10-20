import React, { Component } from "react";
import Layout from "../components/admin/Layout";
import Usertable from "../components/admin/Usertable";
import { Grid } from "@material-ui/core";

class Admin extends Component {
  render() {
    return (
      <Layout>
        <Grid item xs={12}>
          <Usertable />
        </Grid>
      </Layout>
    );
  }
}

export default Admin;
