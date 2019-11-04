import React from "react";
import { makeStyles, WithStyles, withStyles } from "@material-ui/core/styles";

import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Theme, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import client from "./config/Apollo"
import { gql } from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo"

interface NavbarState {
  anchor: HTMLElement | null
}

class Navbar extends React.Component<WithStyles<typeof styles>, NavbarState> {
  state: NavbarState = {
    anchor: null
  }

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

  private handleMenu = (e: React.MouseEvent<HTMLElement>): void => {
    this.setState({ ...this.state, anchor: e.currentTarget })
  }

  private handleClose = () => {
    this.setState({ ...this.state, anchor: null })
  }

  public render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ApolloProvider client={client}>
          <Query query={this.CURRENT_USER_QUERY}>
            {({ data, loading }: { data: any, loading: Boolean }) => {
              return (
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                      JavaScript-Base
                  </Typography>
                    <div style={{ textAlign: "right" }}>
                      {!loading && data.me == null &&
                        <React.Fragment>
                          <Button href = "/login" color="inherit">Login</Button>
                          <Button href = "/login" color="inherit">Register</Button>
                        </React.Fragment>
                      }
                      {!loading && data.me != null &&
                        <React.Fragment>
                        <IconButton
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={this.handleMenu}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>
                        <Menu
                          id="menu-appbar"
                          anchorEl={this.state.anchor}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                          }}
                          open={Boolean(this.state.anchor)}
                          onClose={this.handleClose}
                        >
                          <MenuItem onClick={this.handleClose}>{ `${data.me.firstName} ${data.me.lastName}` }</MenuItem>
                          <MenuItem onClick={this.handleClose}>TODO : Logout</MenuItem>
                        </Menu>
                        </React.Fragment>
                    }

                    </div>
                  </Toolbar>
                </AppBar>
              )
            }}
          </Query>
        </ApolloProvider>
      </div>
    )
  }
}

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
});

export default withStyles(styles)(Navbar)
