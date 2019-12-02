import React, { Component } from "react";
import Navbar from "../components/Navbar";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Paper style={{ margin: "30px auto", width: "90vw", padding: "20px" }}>
          <Typography variant="h4">My Profile</Typography>
          <Typography component="p">
            Paper can be used to build surface or other elements for your
            application.
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <BeachAccessIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Password" />
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

export default Profile;
