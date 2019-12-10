import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Typography,
  Paper,
  Link,
  TextField
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { gql } from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import client from "../../components/config/Apollo";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import { useRouter } from "next/router";

const EditFieldsWithRouter = (props: any) => {
  const router = useRouter();
  return <EditFields {...props} router={router} />;
};

class EditFields extends Component {
  private CURRENT_USER_QUERY = gql`
    query me {
      me {
        firstName
        lastName
        password
        email
        role
        id
      }
    }
  `;

  private UPDATE_MUTATION = gql`
    mutation updateUser(
      $email: String!
      $password: String!
      $firstName: String!
      $lastName: String!
      $role: String!
    ) {
      updateUser(
        email: $email
        password: $password
        firstName: $firstName
        lastName: $lastName
        role: $role
      )
    }
  `;

  state: { [key: string]: any } = {
    open: false,
    fieldType: "",
    defaultValue: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: ""
  };

  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      fieldType: props.router.query.fieldType,
      defaultValue: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: ""
    };
    this.setDefaultValue();
  }

  private handleChange = (event: any) => {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };

  private toggleDialog = () => {
    this.setState({ ...this.state, open: !this.state.open });
  };

  private handleClose = () => {
    this.setState({ ...this.state, open: false });
  };

  private handleSubmit = () => {
    client.query({ query: this.CURRENT_USER_QUERY }).then((data: any) => {
      const user = JSON.parse(JSON.stringify(data.data.me));
      const ft = this.state.fieldType;
      switch (ft) {
        case "name":
          user.firstName = this.state.firstName;
          user.lastName = this.state.lastName;
          break;
        case "email":
          user.email = this.state.email;
          break;
        case "password":
          user.password = this.state.password;
          break;
        case "role":
          user.role = this.state.role;
          break;
        default:
          break;
      }

      client
        .mutate({
          mutation: this.UPDATE_MUTATION,
          variables: {
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role
          },
          fetchPolicy: "no-cache"
        })
        .then(() => {
          this.setDefaultValue();
          this.setState({ ...this.state, open: false });
        })
        .catch((error: any) => {
          console.log(error);
        });
    });
  };

  capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  setDefaultValue = () => {
    client
      .query({ query: this.CURRENT_USER_QUERY, fetchPolicy: "network-only" })
      .then((data: any) => {
        console.log(data.data.me);
        const ft = this.state.fieldType;
        let defaultValue;
        switch (ft) {
          case "name":
            defaultValue = data.data.me.firstName + " " + data.data.me.lastName;
            break;
          case "email":
            defaultValue = data.data.me.email;
            break;
          case "password":
            defaultValue = "********";
            break;
          case "role":
            defaultValue = this.capitalize(data.data.me.role);
            break;
          default:
            break;
        }

        this.setState({
          ...this.state,
          defaultValue: defaultValue
        });
      });
  };

  render() {
    const fieldType = this.state.fieldType;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              href="/profile"
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
          <div>
            <Typography variant="h4">
              <b>{this.capitalize(fieldType)}</b>
            </Typography>
            <div style={{ margin: "10px auto" }}>
              <Typography component="p">
                Changes to your {fieldType} will be reflected across your
                account. <Link href="#">Learn more</Link>
              </Typography>
            </div>
            <TextField
              id="outlined-required"
              value={this.state.defaultValue}
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
              <DialogTitle>Change {this.capitalize(fieldType)}</DialogTitle>
              <DialogContent style={{ margin: "0px" }}>
                {(fieldType == "name" && (
                  <div>
                    <TextField
                      autoFocus
                      margin="dense"
                      name="firstName"
                      label="First Name"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      name="lastName"
                      label="Last Name"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      fullWidth
                    />
                  </div>
                )) || (
                  <div>
                    <TextField
                      autoFocus
                      margin="dense"
                      value={this.state[fieldType]}
                      onChange={this.handleChange}
                      name={fieldType}
                      label={this.capitalize(fieldType)}
                      fullWidth
                    />
                  </div>
                )}
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
                    this.handleSubmit();
                  }}
                >
                  Done
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Paper>
      </div>
    );
  }
}

export default EditFieldsWithRouter;
