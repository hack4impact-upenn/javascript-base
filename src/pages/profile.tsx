import React, { Component } from "react";
import Navbar from "../components/Navbar";
import {
  Typography,
  Paper,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider
} from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

class Profile extends Component {
  render() {
    return (
      <div>
        <Navbar></Navbar>
        <Paper style={{ margin: "30px auto", width: "90vw", padding: "20px" }}>
          <Typography variant="h4">
            <b>Profile</b>
          </Typography>
          <div style={{ margin: "10px auto" }}>
            <Typography component="p">
              Some info may be visible to other people using Organization's
              services. <Link href="#">Learn more</Link>
            </Typography>
          </div>
          <List>
            <ListItem
              button
              component="a"
              href="#"
              style={{ margin: "5px 0px" }}
            >
              <ListItemText secondary="NAME" />
              <ListItemText
                primary="John Smith"
                style={{
                  position: "absolute",
                  left: "30%",
                  margin: "0px auto"
                }}
              />
              <ArrowForwardIosIcon />
            </ListItem>
            <Divider component="li" />
            <ListItem
              button
              component="a"
              href="#"
              style={{ margin: "5px 0px" }}
            >
              <ListItemText secondary="EMAIL" />
              <ListItemText
                primary="jsmith@gmail.com"
                style={{
                  position: "absolute",
                  left: "30%",
                  margin: "0px auto"
                }}
              />
              <ArrowForwardIosIcon />
            </ListItem>
            <Divider component="li" />
            <ListItem
              button
              component="a"
              href="#"
              style={{ margin: "5px 0px" }}
            >
              <ListItemText secondary="PASSWORD" />
              <ListItemText
                primary="********"
                style={{
                  position: "absolute",
                  left: "30%",
                  margin: "0px auto"
                }}
              />
              <ArrowForwardIosIcon />
            </ListItem>
            <Divider component="li" />
            <ListItem
              button
              component="a"
              href="#"
              style={{ margin: "5px 0px" }}
            >
              <ListItemText secondary="ROLE" />
              <ListItemText
                primary="Admin"
                style={{
                  position: "absolute",
                  left: "30%",
                  margin: "0px auto"
                }}
              />
              <ArrowForwardIosIcon />
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

export default Profile;
