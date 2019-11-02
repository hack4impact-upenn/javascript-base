import React from "react";

import { AppBar, Button, Grid, TextField } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import client from "../components/apollo"
import { ApolloProvider } from 'react-apollo'
import { gql } from "apollo-boost";


interface LoginPageState {
  email: string
  password: string
}

class LoginPage extends React.Component<{}, LoginPageState> {

  state: LoginPageState = {
    email: "",
    password: ""
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
      console.log(data)
    })
  }

  public render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <AppBar title="Login" />
          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
            <ValidatorForm onSubmit = {this.handleLogin}>
              <TextValidator type="text" placeholder="Enter your Email" label="Email" name = "email"
                             onChange={ this.handleEmailChange }
                             validators = {['required']}
                             errorMessages = {['Required']}
                             value = { this.state.email }
                             />
              <br />
              <TextValidator type="password" placeholder="Enter your Password" label="Password" name="password"
                             onChange={ this.handlePasswordChange }
                             validators = {['required']}
                             errorMessages = {['Required']}
                             value = { this.state.password }/>
              <br />
              <Button type = "submit">Log In</Button>
            </ValidatorForm>
          </Grid>
        </div>
      </ApolloProvider>
    );
  }
}

export default LoginPage;
