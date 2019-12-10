import React from "react";
import { AppBar,Grid,  } from '@material-ui/core';

import ChangeNameForm from "../../components/ChangeNameForm"

class NamePage extends React.Component<{}, {}> {

  public render() {
    return (
        <React.Fragment>
          <AppBar title="Name" />
          <Grid container justify="center">
            <Grid item xs = {10} sm = {6} md = {4} lg = {4}>
              <ChangeNameForm></ChangeNameForm>
            </Grid>
          </Grid>
        </React.Fragment>
    );
  }
}

export default NamePage;