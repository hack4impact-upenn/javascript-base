import React from "react";
import { Grid, AppBar, Button } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

type FormUpdate = React.ChangeEvent<HTMLInputElement>;

interface ChangeNameState {
  name: string;
  error: string;
}

class ChangeNamePage extends React.Component<{}, ChangeNameState> {
  state: ChangeNameState = {
    name: "",
    error: ""
  };
  public render() {
    return (
      <React.Fragment>
        <AppBar title="Login" />
        <Grid container justify="center">
          <Grid item xs = {10} sm = {6} md = {4} lg = {4}>
          <ValidatorForm
          onSubmit={this.handleSubmit}
          style={{
            padding: "20px",
            marginTop: "40px",
            backgroundColor: "white",
            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
            boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
        }}
        >
          <TextValidator
          type="text"
          placeholder="Enter new Name"
          label="Name"
          name="name"
          onChange={this.handleNameChange}
          validators={["required"]}
          errorMessages={["Required"]}
          value={this.state.name}
          style={{ margin: "10px 0" }}
          fullWidth
        />
          <Button
          style={{ margin: "10px 0" }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Save
        </Button>
        </ValidatorForm>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  private handleSubmit = (): void => {
    console.log("test");
    console.log(this.state.name);
  }

  private handleNameChange = (e: FormUpdate) => {
      this.setState({ ...this.state, name: e.target.value });
  };
}

export default ChangeNamePage