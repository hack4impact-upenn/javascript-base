import React from "react";
import MaterialTable from "material-table";
import { Button, Grid, Typography, Paper } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

const style = { Paper: { padding: 20, margin: 20 } };

export default function Usertable() {
  const [state, setState] = React.useState({
    inviteUserOpen: false,
    addUserOpen: false,
    columns: [
      { title: "First Name", field: "first_name" },
      { title: "Last Name", field: "last_name" },
      { title: "Email", field: "email" },
      {
        title: "User Type",
        field: "userType",
        lookup: { 0: "Admin", 1: "Member" }
      }
    ],
    data: [
      {
        first_name: "John",
        last_name: "Smith",
        email: "jsmith@gmail.com",
        userType: 1
      },
      {
        first_name: "Sam",
        last_name: "Smith",
        email: "jsmith@gmail.com",
        userType: 0
      },
      {
        first_name: "Bob",
        last_name: "Smith",
        email: "jsmith@gmail.com",
        userType: 1
      },
      {
        first_name: "Ben",
        last_name: "Franklin",
        email: "jsmith@gmail.com",
        userType: 0
      },
      {
        first_name: "Amy",
        last_name: "Gutmann",
        email: "jsmith@gmail.com",
        userType: 0
      },
      {
        first_name: "Rajiv",
        last_name: "Gandhi",
        email: "jsmith@gmail.com",
        userType: 1
      }
    ]
  });

  const [values, setValues] = React.useState({
    inputFirstName: "",
    inputLastName: "",
    inputEmail: "",
    inputPassword: "",
    userType: ""
  });

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  };

  function handleInviteClick() {
    setState(oldStates => ({
      ...oldStates,
      inviteUserOpen: true
    }));
  }

  const handleInviteClose = () => {
    setState(oldStates => ({
      ...oldStates,
      inviteUserOpen: false
    }));
  };

  function handleAddClick() {
    setState(oldStates => ({
      ...oldStates,
      addUserOpen: true
    }));
  }

  const handleAddClose = () => {
    setState(oldStates => ({
      ...oldStates,
      addUserOpen: false
    }));

    setValues({});
  };

  const handleAddSubmit = () => {
    // Check if values are empty
    // TODO: more sophisticated checking once connected to backend
    if (
      values.inputFirstName === "" ||
      values.inputLastName === "" ||
      values.inputEmail === "" ||
      values.inputPassword === "" ||
      values.userType === ""
    ) {
      return;
    }

    let newData = {
      first_name: values.inputFirstName,
      last_name: values.inputLastName,
      email: values.inputEmail,
      password: values.inputPassword,
      userType: values.userType
    };

    let data = state.data;
    data.unshift(newData);

    console.log(data);
    setState(oldStates => ({
      ...oldStates,
      addUserOpen: false,
      data: data
    }));

    setValues({});
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <Dialog
        open={state.inviteUserOpen}
        onClose={handleInviteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Invite User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type in the email address of this user, and we'll take care of the
            rest.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleInviteClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleInviteClose} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={state.addUserOpen}
        onClose={handleAddClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill in the information below to add the user manually.
          </DialogContentText>
          <TextField
            margin="dense"
            id="first_name"
            label="First Name"
            style={{ width: "47.5%", marginRight: "5%" }}
            value={values.inputFirstName}
            onChange={handleChange}
            inputProps={{
              name: "inputFirstName"
            }}
            autoFocus
          />
          <TextField
            margin="dense"
            id="last_name"
            label="Last Name"
            style={{ width: "47.5%" }}
            value={values.inputLastName}
            onChange={handleChange}
            inputProps={{
              name: "inputLastName"
            }}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={values.inputEmail}
            onChange={handleChange}
            inputProps={{
              name: "inputEmail"
            }}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={values.inputPassword}
            onChange={handleChange}
            inputProps={{
              name: "inputPassword"
            }}
          />
          <FormControl fullWidth style={{ marginTop: 10 }}>
            <InputLabel>User Type</InputLabel>
            <Select
              value={values.userType}
              onChange={handleChange}
              inputProps={{
                name: "userType"
              }}
              autoWidth
            >
              <MenuItem value={0}>Admin</MenuItem>
              <MenuItem value={1}>Member</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Paper style={style.Paper}>
        <Grid container>
          <Grid item sm>
            <Typography variant="h4">User Management</Typography>
          </Grid>
          <Grid item sm>
            <div style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                style={{ marginRight: 20 }}
                onClick={handleInviteClick}
              >
                Invite User
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                onClick={handleAddClick}
              >
                Add User
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <MaterialTable
        title="Registered Users"
        columns={state.columns}
        style={{ padding: 20, margin: 20 }}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data[data.indexOf(oldData)] = newData;
                setState({ ...state, data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...state.data];
                data.splice(data.indexOf(oldData), 1);
                setState({ ...state, data });
              }, 600);
            })
        }}
      />
    </div>
  );
}
