import React from "react"

import { Grid } from '@material-ui/core'

import Navbar from "../components/Navbar"
import FileTable from "../components/FileTable"


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