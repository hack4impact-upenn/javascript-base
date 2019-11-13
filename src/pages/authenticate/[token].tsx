import React from "react";
import * as emailService from "../../services/confirm-email";
import { matchPath } from "react-router";
import { useRouter } from "next/router";

import client from "../../components/config/Apollo"
import { gql } from "apollo-boost";

export default class Authenticate extends React.Component {

  public componentDidMount = (): void => {
    const router = useRouter();

    const token: any = router.query.token;
    if (token) {
      console.log("Attempting to confirm email");
      // TODO: replace this with a call to graphql stuff
      emailService.attemptConfirmation(token);
    }

    return client.query({
      query: this.CONFIRM_EMAIL,
      variables: {
        token: token
      }
    }).then((data: any) => {
      return data.data.emailTaken
    })
  }

  render() {
    return(
      <div>
        hello ?
      </div>
    );
  }

  CONFIRM_EMAIL = gql`
  mutation confirmEmail($token: String!){
    confirmEmail(token: $token)
  }/
  `;
  
}