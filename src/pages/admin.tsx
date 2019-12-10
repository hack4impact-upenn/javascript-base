import React from "react";
import { Grid } from "@material-ui/core";

import Layout from "../components/admin/Layout";
import Usertable from "../components/admin/Usertable";

export default class Admin extends React.Component {
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
