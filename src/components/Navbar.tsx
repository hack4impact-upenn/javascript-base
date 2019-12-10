import React from "react";
import NextLink from "next/link";
import { WithStyles, withStyles } from "@material-ui/core/styles";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
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

  public renderLoginRegisterButtons = () => (
    <React.Fragment>
      <NextLink href="/login">
        <Button color="inherit">
          Login
        </Button>
      </NextLink>
      <NextLink href="/register">
        <Button color="inherit">
          Register
        </Button>
      </NextLink>
    </React.Fragment>
  )

  public renderRightMenu(user: any) {
    if (!user) {
      return this.renderLoginRegisterButtons();
    }
    
    return (
      <React.Fragment>
        <NextLink href="/admin">
          <Button color="inherit">
            Admin Dashboard
          </Button>
        </NextLink>
        <NextLink href="/files">
          <Button color="inherit">
            Files
          </Button>
        </NextLink>
        <div style={{ textAlign: "right" }}>
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
            <NextLink href="/profile">
              <MenuItem onClick={this.handleClose}>
                {`${user.firstName} ${user.lastName}`}
              </MenuItem>
            </NextLink>
            <MenuItem onClick={this.handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </React.Fragment>
    );
  }

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
                    <NextLink href="/">
                      <Typography variant="h6" className={classes.title}>
                        JavaScript-Base
                      </Typography>
                    </NextLink>
                    <NextLink href="/api">
                      <Button color="inherit">
                        GraphQL
                      </Button>
                    </NextLink>
                    {!loading && this.renderRightMenu(data.me)}
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
    flexGrow: 1,
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

export default withStyles(styles)(Navbar);
