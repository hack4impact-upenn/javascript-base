import React from "react";
import { AppBar, Button, Grid, TextField, FormControlLabel, Checkbox, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import client from "../components/apollo"
import { ApolloProvider } from 'react-apollo'
import { gql } from "apollo-boost";


interface LoginPageState {
  email: string,
  password: string,
  error: string
}

class LoginPage extends React.Component<{}, LoginPageState> {

  state: LoginPageState = {
    email: "",
    password: "",
    error: ""
  }

  private LOGIN_QUERY = gql`
   query login($email: String!, $password: String!){
      login(email: $email, password: $password)
    }
  `;

  private handleEmailChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    this.setState({...this.state, email: e.target.value})
  }

  private handlePasswordChange = (e : React.ChangeEvent<HTMLInputElement>) : void => {
    this.setState({...this.state, password: e.target.value})
  }

  private handleLogin = (e : React.FormEvent<Element>) : void => {
    client.query({
      query: this.LOGIN_QUERY,
      variables: {
        email: this.state.email,
        password: this.state.password
      }
    }).then((data : any) => {
      // TODO : Redirect to different page
    }).catch((error : any) => {
      this.setState({...this.state, error: error.graphQLErrors[0].message})
    })
  }

  public render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <AppBar title="Login" />

          <Grid container justify="center">
            <Grid item xs = {10} sm = {6} md = {4} lg = {4}>
            <ValidatorForm onSubmit = {this.handleLogin} style = {{ 
                padding: "20px", 
                marginTop: "40px",
                backgroundColor: "white",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)" }}>
              <Typography variant="h5">Log In</Typography>
              <TextValidator type="text" placeholder="Enter your Email" label="Email" name = "email"
                             onChange={ this.handleEmailChange }
                             validators = {['required']}
                             errorMessages = {['Required']}
                             value = { this.state.email }
                             style = {{ margin: "10px 0" }}
                             fullWidth
                             />
              <br />
              <TextValidator type="password" placeholder="Enter your Password" label="Password" name="password"
                             onChange={ this.handlePasswordChange }
                             validators = {['required']}
                             errorMessages = {['Required']}
                             value = { this.state.password }
                             style = {{ margin: "10px 0" }}
                             error = { this.state.error != "" }
                             helperText = {this.state.error == "" ? "" : this.state.error}
                             fullWidth/>
              <br />
              <Button style = {{ margin: "10px 0" }} variant = "contained" color = "primary" type = "submit">Log In</Button>
            </ValidatorForm>
            </Grid>
          </Grid>
        </div>
      </ApolloProvider>
    );
  }
}

export default LoginPage;
