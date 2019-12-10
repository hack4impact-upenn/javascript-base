import React from "react";
import { Grid, AppBar, Button, Link } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import client from "./config/Apollo"
import {gql} from "apollo-boost";

type FormUpdate = React.ChangeEvent<HTMLInputElement>;

interface ChangeNameState {
  newFirstName: string;
  newLastName: string;
  
  error: string;
}

class ChangeNameForm extends React.Component<{}, ChangeNameState> {
  state: ChangeNameState = {
    newFirstName: "",
    newLastName: "",
    error: ""
  };
  public render() {
    return (
      <ValidatorForm onSubmit={this.handleChangeName} style={{
        padding: "20px",
        marginTop: "40px",
        backgroundColor: "white",
        borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
        boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
      }}>
        <Link href="/">Back</Link>
        <br />
        <TextValidator type="firstName" placeholder="New First Name" label="New First Name" name="firstName"
          onChange={this.handleFieldChange("newFirstName")}
          value={this.state.newFirstName}
          style={{ margin: "10px 0" }}
          error={this.state.error != ""}
          helperText={this.state.error == "" ? "" : this.state.error}
          fullWidth />
          <br />
          <br />
          <TextValidator type="lastName" placeholder="New Last Name" label="New Last Name" name="lastName"
          onChange={this.handleFieldChange("newLastName")}
          value={this.state.newLastName}
          style={{ margin: "10px 0" }}
          error={this.state.error != ""}
          helperText={this.state.error == "" ? "" : this.state.error}
          fullWidth />
          <br />
          <Button style={{ margin: "10px 0" }} variant="contained" color="primary" type="submit">Update Name</Button>
      </ValidatorForm>
      
    );
  }

  private NAME_MUTATION = gql`
    mutation changeName($newFirstName: String!, $newLastName: String!) {
      changeName(newFirstName: $newFirstName, newLastName: $newLastName)
    }
  `;

  private handleFieldChange = (field: string): ((e: FormUpdate) => void) => {
    return (e: FormUpdate) => {
      this.setState({ ...this.state, [field]: e.target.value })
    }
  }

  private handleChangeName = (): void => {
      client.mutate({
        mutation: this.NAME_MUTATION,
        variables: {
          newFirstName: this.state.newFirstName,
          newLastName: this.state.newLastName,
        }
      }).then(() => {
        window.location.href = "/";
      }).catch((error: any) => {
        console.log(error)
      })
  };
}

export default ChangeNameForm