import React, { useEffect } from "react";
import { useRouter } from "next/router";

import client from "../../components/config/Apollo"
import { gql } from "apollo-boost";

const CONFIRM_EMAIL_MUTATION = gql`
  mutation confirmEmail($token: String!){
    confirmEmail(token: $token)
  }
  `;

const Authenticate = () => {
  const router = useRouter();

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked 3 times`;
    attemptAuthentication();
    console.log("useEffect()")
  });

  function attemptAuthentication() {
    const token: any = router.query.token;
    if (token) {
      console.log("Attempting to confirm email");
      // TODO: replace this with a call to graphql stuff
      client.mutate({
        mutation: CONFIRM_EMAIL_MUTATION,
        variables: {
          token: token
        }
      }).then((data: any) => {
        // TODO: redirect maybe?
        console.log("> User is authenticated");
      }).catch((error: any) => {
        console.log(error);
      })
    }
  }

  return(
      <div>
        hello ?
      </div>
  );
}

export default Authenticate;