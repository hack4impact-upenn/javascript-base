import React from "react"
import NextLink from "next/link";

import { Button, Grid, Paper, Typography } from '@material-ui/core'

import Navbar from "../components/Navbar"
import FileTable from "../components/FileTable"


class FilePage extends React.Component {
  public render = () => {
    return (
      <React.Fragment> 
        <Navbar />
        <Paper style={{ padding: 20, margin: 20 }}>
          <Grid container justify="center">
            <Grid item sm>
              <Typography variant="h5">Files</Typography>
            </Grid>
            <Grid item sm style={{ textAlign: "right" }}>
              <NextLink href="/upload">
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  Upload File
                </Button>
              </NextLink>
            </Grid>
          </Grid>
        </Paper>
        <div style={{ margin: 20 }}>
          <FileTable />
        </div>
      </React.Fragment>
    )
  }
}

export default FilePage