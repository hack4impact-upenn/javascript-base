import React, { Component } from "react";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Usertable from "../components/Usertable";
import { Grid, Paper } from "@material-ui/core";

class Home extends Component {
  render() {
    return (
      <Layout>
        <Banner />
        <Grid item xs={12}>
          <Usertable />
        </Grid>
      </Layout>
    );
  }
}

export default Home;
