import React from "react";
 import { AppBar,Grid,  } from '@material-ui/core';

  import ChangePasswordForm from "../../components/ChangePasswordForm"

  class AccountPage extends React.Component<{}, {}> {

    public render() {
     return (
         <React.Fragment>
           <AppBar title="Account" />
           <Grid container justify="center">
             <Grid item xs = {10} sm = {6} md = {4} lg = {4}>
               <ChangePasswordForm></ChangePasswordForm>
             </Grid>
           </Grid>
         </React.Fragment>
     );
   }
 }

  export default AccountPage;