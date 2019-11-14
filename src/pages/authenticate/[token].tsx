import React, { useEffect } from "react";
import { useRouter } from "next/router";

import client from "../../components/config/Apollo"
import { gql } from "apollo-boost";

const CONFIRM_EMAIL_MUTATION = gql`
  mutation confirmEmail($token: String!){
    confirmEmail(token: $token)
  }
  `;

// React Hook for Authenticate: we must use a hook in order to be compatible
// with next's useRouter
const Authenticate = () => {
  const router = useRouter();

  useEffect(() => {
    // When the component renders, attempt to authenticate the
    // user's email.
    attemptAuthentication();
  });

  function attemptAuthentication() {
    // Extract the token from the route.
    const token: any = router.query.token;
    if (token) {
      // Hand off to Apollo to decode the token and update the user's 
      // verification status.
      client.mutate({
        mutation: CONFIRM_EMAIL_MUTATION,
        variables: {
          token: token
        }
      }).then((data: any) => {
        console.log("> User is authenticated");
        // TODO: Redirect to home page

      }).catch((error: any) => {
        console.log(error);
      })
    }
  }
  return(
      <div>
        User authentication pending
      </div>
  );
}

export default Authenticate;