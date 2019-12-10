import React from "react";
import { makeStyles, WithStyles, withStyles } from "@material-ui/core/styles";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Theme,
  Button
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";

import client, { CURRENT_USER_QUERY } from "./config/Apollo";
import { gql } from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";

interface NavbarState {
  anchor: HTMLElement | null;
}

class Navbar extends React.Component<WithStyles<typeof styles>, NavbarState> {
  state: NavbarState = {
    anchor: null
  };

  private LOGOUT_MUTATION = gql`
    mutation {
      invalidateTokens
    }
  `;

  private handleMenu = (e: React.MouseEvent<HTMLElement>): void => {
    this.setState({ ...this.state, anchor: e.currentTarget });
  };

  private handleClose = () => {
    this.setState({ ...this.state, anchor: null });
  };

  private handleLogout = () => {
    this.setState({ ...this.state, anchor: null });
    client.mutate({ mutation: this.LOGOUT_MUTATION }).then(() => {
      window.location.reload();
    });
  };

  public render = () => {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <ApolloProvider client={client}>
          <Query query={CURRENT_USER_QUERY}>
            {({ data, loading }: { data: any; loading: Boolean }) => {
              return (
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                      JavaScript-Base
                    </Typography>
                    <div style={{ textAlign: "right" }}>
                      {!loading && data.me == null && (
                        <React.Fragment>
                          <Button href="/login" color="inherit">
                            Login
                          </Button>
                          <Button href="/register" color="inherit">
                            Register
                          </Button>
                        </React.Fragment>
                      )}
                      {!loading && data.me != null && (
                        <React.Fragment>
                          <Button href="/files" color="inherit">
                            My Files
                          </Button>
                          <Button href="/upload" color="inherit">
                            Upload
                          </Button>
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
                            <MenuItem
                              onClick={this.handleClose}
                            >{`${data.me.firstName} ${data.me.lastName}`}</MenuItem>
                            <MenuItem onClick={this.handleClose}><Link href="/account" color="inherit">
                           Account Settings 
                          </Link></MenuItem> 
                            <MenuItem onClick={this.handleLogout}>
                              Logout
                            </MenuItem>
                          </Menu>
                        </React.Fragment>
                      )}
                    </div>
                  </Toolbar>
                </AppBar>
              );
            }}
          </Query>
        </ApolloProvider>
      </div>
    );
  };
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

export default withStyles(styles)(Navbar);
