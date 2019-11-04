import * as jwt from "jsonwebtoken";
import { DocumentType } from '@typegoose/typegoose'
import { IUser } from '../backend/modules/user/model'
import { User } from '../backend/models'
const sgMail = require("@sendgrid/mail");
//import * as sgMail from "@sendgrid/mail";

/**
 * Send confirmation email to the user expiring after 
 * a specified number of seconds.
 */
let sendConfirmationEmail = (user: DocumentType<IUser>) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  let expiration_sec = 60 * 60 * 24 * 24 * 7; // 7 days
  let token = jwt.sign({ id: user.id, type: 'confirmation' },
    process.env.SECRET_KEY!, { expiresIn: expiration_sec });
  let confirmLink = process.env.HOST + ":" + process.env.PORT + "/authenticate/" + token;
  sgMail.send({
    to: user.email,
    from: 'anniesumail@gmail.com',
    subject: 'Confirm Your Account',
    html: `<p>
            Welcome, ${user.firstName}!<br/><br/>
            Please confirm your account by clicking on the link below:<br/>
            ${confirmLink}<br/><br/>
            Once confirmed, you'll be able to log in with your new account!<br/><br/>
            Best,<br/>
            Hack4Impact
          </p>`,
  }).then((res: any) => {console.log(res)})
  .catch((err: any) => {console.log(err)}); // TODO: delete
}

/**
 * Given a token, attempt to decode it and confirm the
 * account of the appropriate user.
 */
let attemptConfirmation = (token: string) => {
  let decoded: any = jwt.verify(token, process.env.SECRET_KEY!);

  User.findById(decoded.id, function (err: Error, user: IUser) {
    if (err) {
      console.log(err);
      return;
    }
    user.isVerified = true;
    // TODO: confirm this saves (?)
  });
}

export { sendConfirmationEmail, attemptConfirmation };