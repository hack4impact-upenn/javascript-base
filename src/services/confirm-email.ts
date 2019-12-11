import * as jwt from "jsonwebtoken";
import { DocumentType } from '@typegoose/typegoose'
import { IUser } from '../backend/modules/user/model'
import { User } from '../backend/models'
const sgMail = require("@sendgrid/mail");

/**
 * Send confirmation email to the user expiring after 
 * a specified number of seconds.
 */
const sendConfirmationEmail = (user: DocumentType<IUser>) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const expirationSeconds = 60 * 60 * 24 * 24 * 7; // 7 days
  const token = jwt.sign({ id: user.id, type: 'confirmation' },
    process.env.JWT_SECRET_KEY!, { expiresIn: expirationSeconds });
  // TODO (annie/jediah): use a more robust link generator.
  const authenticationURL = "http://" + process.env.HOST + ":" + process.env.PORT + 
                    "/authenticate/" + token;
  sgMail.send({
    to: user.email,
    from: 'anniesumail@gmail.com',
    subject: 'Confirm Your Account',
    html: `<p>
            Hello, ${user.firstName}!<br/><br/>
            Thanks for registering for [application]. Before we get started, we
            just need to confirm that this is you. Click below to verify your
            email address:<br/>
            <a href="${authenticationURL}">Confirm your email</a><br/>
            <br/><br/>
            Once confirmed, you'll be able to log in with your new account!<br/><br/>
            Best,<br/>
            Hack4Impact
          </p>`,
  }).then((res: any) => {console.log("> Verification email sent to new user");})
  .catch((err: any) => {console.log(err);});
}

/**
 * Given a token, attempt to decode it and confirm the
 * account of the appropriate user.
 */
const attemptConfirmation = (token: string) => {
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

  User.findById(decoded.id, function (err: Error, user: DocumentType<IUser>) {
    if (err) {
      console.log(err);
      return;
    }
    user.isVerified = true;
    user.save();
  });
}

export { sendConfirmationEmail, attemptConfirmation };