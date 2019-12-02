import React, { Component } from "react";
import Navbar from "../components/Navbar";
import {
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  Paper,
  Link,
  TextField
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { gql } from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import client from "../components/config/Apollo";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

class EditFields extends Component {
  state = {
    open: false
  };

  private CURRENT_USER_QUERY = gql`
    query me {
      me {
        firstName
        lastName
        email
        role
      }
    }
  `;

  private capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  private toggleDialog = () => {
    this.setState({ ...this.state, open: !this.state.open });
  };

  private handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              href="Profile"
            >
              <ArrowBackIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Paper
          style={{
            margin: "30px auto",
            width: "90vw",
            padding: "20px"
          }}
        >
          <Typography variant="h4">
            <b>Name</b>
          </Typography>
          <div style={{ margin: "10px auto" }}>
            <Typography component="p">
              Changes to your name will be reflected across your account.{" "}
              <Link href="#">Learn more</Link>
            </Typography>
          </div>
          <TextField
            id="outlined-required"
            defaultValue="John Smith"
            variant="outlined"
            style={{ margin: "20px auto", width: "100%" }}
            InputProps={{
              readOnly: true
            }}
          />
          <IconButton
            onClick={() => {
              this.toggleDialog();
            }}
            style={{
              position: "absolute",
              zIndex: 1,
              right: "10vw",
              margin: "23px auto auto auto",
              display: "inline-block"
            }}
          >
            <EditIcon />
          </IconButton>

          <Dialog
            open={this.state.open}
            onClose={() => {
              this.handleClose();
            }}
            fullWidth={true}
          >
            <DialogTitle>Change Name</DialogTitle>
            <DialogContent style={{ margin: "0px" }}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                color="primary"
                onClick={() => {
                  this.handleClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  this.handleClose();
                }}
              >
                save
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
      </ApolloProvider>
    );
  }
}

export default EditFields;
