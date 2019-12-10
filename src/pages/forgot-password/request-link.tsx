import React, { useEffect, useState } from "react";
import { Button, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import client from "../../components/config/Apollo";
import { gql } from "apollo-boost";

const EMAIL_TAKEN_QUERY = gql`
  query emailTaken($email: String!) {
    emailTaken(email: $email)
  }
`;
const SEND_FORGOT_EMAIL = gql`
  query attemptSendForgotPasswordEmail($email: String!) {
    attemptSendForgotPasswordEmail(email: $email)
  }
`;

type FormUpdate = React.ChangeEvent<HTMLInputElement>;

const RequestForgotPasswordLink = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sentEmail, setSentEmail] = useState(false);

  // Execute once on initial page load
  useEffect(() => {
    ValidatorForm.addValidationRule('emailTaken', (value: string) => {
      return client.query({
        query: EMAIL_TAKEN_QUERY,
        variables: {
          email: value
        }
      }).then((data: any) => {
        // Return FALSE if the email is taken to indicate that there is no error
        return !data.data.emailTaken
      })
    });
  }, []); // This arg is an empty array in order to only execute this effect once


  // Takes a field name and returns a function that changes that field to
  // the event value and stores it in the state
  function handleFieldChange(field: string): ((e: FormUpdate) => void) {
    return (e: FormUpdate) => {
      if (field === "email") {
        setEmail(e.target.value);
      }
    }
  }

  function handleSubmitForm() {
    client.query({
      query: SEND_FORGOT_EMAIL,
      variables: {
        email: email,
      }
    }).then((data: any) => {
      if (data.error) {
        setError(data.error);
      }
      else {
        // Update state to reflect that email is not registered
        setSentEmail(true);
        console.log('> Sent reset password email');
      }
    }).catch((error: any) => {
      console.log(error)
    })
  }

  return (
    <ValidatorForm onSubmit={handleSubmitForm} style={{
      padding: "20px",
      marginTop: "40px",
      backgroundColor: "white",
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"
    }}>
      <Typography variant="h5">Forgot your password? Enter your email, 
      and we will send you a link to reset your password!</Typography>
        <TextValidator type="text" placeholder="Enter your Email" label="Email" name="email"
        onChange={handleFieldChange("email")}
        validators={['required', 'isEmail', 'emailTaken']}
        errorMessages={['Required', 'Enter a valid email', 'This email does not belong to a registered user']}
        value={email}
        style={{ margin: "10px 0" }}
        fullWidth
        />
        <br />
        <Button 
          style={{ margin: "10px 0" }} 
          variant="contained" 
          color="primary" 
          type="submit">Reset password</Button>
    </ValidatorForm>
  );
}

export default RequestForgotPasswordLink