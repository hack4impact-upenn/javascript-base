import React from "react"
import client, { CURRENT_USER_QUERY } from "../components/config/Apollo"
import { Query, ApolloProvider } from "react-apollo";

import Navbar from "../components/Navbar"
import FileTable from "../components/FileTable"

import { Grid } from '@material-ui/core'
import { gql } from "apollo-boost";

interface FilePageInterface {

}

class FilePage extends React.Component {
  public render = () => {
    return (
      <React.Fragment> 
        <Navbar></Navbar>
        <Grid container justify="center">
          <Grid style = {{ paddingTop: "30px", paddingBottom: "30px"}} item xs = {12} sm = {10} md = {10} lg = {10}>
            <FileTable></FileTable>
          </Grid>
        </Grid>
      </React.Fragment>
    )
  }
}

export default FilePage