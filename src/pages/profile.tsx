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
import { gql } from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import client from "../components/config/Apollo";

class Profile extends Component {
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

  capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Query query={this.CURRENT_USER_QUERY}>
          {({ data, loading }: { data: any; loading: boolean }) => {
            return (
              <div>
                <Navbar></Navbar>
                <Paper
                  style={{
                    margin: "30px auto",
                    width: "90vw",
                    padding: "20px"
                  }}
                >
                  {!loading && data.me == null && (
                    <div>
                      <Typography variant="h4">
                        <b>Oops... You are not logged in</b>
                      </Typography>
                      <div style={{ margin: "10px auto" }}>
                        <Typography component="p">
                          You must login in order to view your profile.
                        </Typography>
                      </div>
                    </div>
                  )}
                  {loading && (
                    <div>
                      <Typography variant="h4">
                        <b>Profile</b>
                      </Typography>
                      <div style={{ margin: "10px auto" }}>
                        <Typography component="p">
                          Some info may be visible to other people using
                          Organization's services.{" "}
                          <Link href="#">Learn more</Link>
                        </Typography>
                      </div>
                      <List>
                        <ListItem
                          button
                          component="a"
                          href="/EditFields"
                          style={{ margin: "5px 0px" }}
                        >
                          <ListItemText secondary="NAME" />
                          <ListItemText
                            primary=""
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
                            primary=""
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
                            primary=""
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
                            primary={""}
                            style={{
                              position: "absolute",
                              left: "30%",
                              margin: "0px auto"
                            }}
                          />
                          <ArrowForwardIosIcon />
                        </ListItem>
                      </List>
                    </div>
                  )}
                  {!loading && data.me != null && (
                    <div>
                      <Typography variant="h4">
                        <b>Profile</b>
                      </Typography>
                      <div style={{ margin: "10px auto" }}>
                        <Typography component="p">
                          Some info may be visible to other people using
                          Organization's services.{" "}
                          <Link href="#">Learn more</Link>
                        </Typography>
                      </div>
                      <List>
                        <ListItem
                          button
                          component="a"
                          href="/EditFields"
                          style={{ margin: "5px 0px" }}
                        >
                          <ListItemText secondary="NAME" />
                          <ListItemText
                            primary={data.me.firstName + " " + data.me.lastName}
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
                          href="/EditFields"
                          style={{ margin: "5px 0px" }}
                        >
                          <ListItemText secondary="EMAIL" />
                          <ListItemText
                            primary={data.me.email}
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
                          href="/EditFields"
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
                          href="/EditFields"
                          style={{ margin: "5px 0px" }}
                        >
                          <ListItemText secondary="ROLE" />
                          <ListItemText
                            primary={this.capitalize(data.me.role)}
                            style={{
                              position: "absolute",
                              left: "30%",
                              margin: "0px auto"
                            }}
                          />
                          <ArrowForwardIosIcon />
                        </ListItem>
                      </List>
                    </div>
                  )}
                </Paper>
              </div>
            );
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default Profile;
