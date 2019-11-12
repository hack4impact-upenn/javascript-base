import React from "react";
import * as emailService from "../../services/confirm-email";
import { matchPath } from "react-router";

export default class Authenticate extends React.Component {
  // TODO: Redirect to home when authenticated
  constructor(props: any) {
    console.log("from jediah's laptop");
    super(props);

    const match = matchPath(props.history.location.pathname, {
      path: '/authenticate/:token',
      exact: true,
      strict: false
    })

    if (match) {
      console.log("URL is proper");
      const token = match.params.token;
      if (token) {
        console.log("Attempting to confirm email");
        emailService.attemptConfirmation(token);
      }
    }
    else {
      console.log("URL is not proper");
    }
  }

  render() {
    return(
      <div>
        hello ?
      </div>
    );
  }
}