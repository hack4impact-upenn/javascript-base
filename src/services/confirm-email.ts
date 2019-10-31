import * as jwt from "jsonwebtoken";
import { User, UserDocument } from "../backend/models";
const sgMail = require("sgMail");

/**
 * Send confirmation email to the user expiring after 
 * a specified number of seconds.
 */
let sendConfirmationEmail = (recipientName: string, recipientId: string, 
                             recipientEmail: string) => {
  // TODO: wait on jediah to update to typegoose and change the 
  // function arg back to "user: User"

  let expiration_sec = 60 * 60 * 24 * 24 * 7; // 7 days
  let token = jwt.sign({ id: recipientId, type: 'confirmation' },
    process.env.SECRET_KEY!, { expiresIn: expiration_sec });
  let confirmLink = process.env.HOST + ":" + process.env.PORT + "/" + token;
  sgMail.send({
    to: recipientEmail,
    from: '@hack4impact.org',
    subject: 'Confirm Your Account',
    html: `<p>
            Welcome, ${recipientName}!<br/><br/>
            Please confirm your account by clicking on the link below:<br/>
            ${confirmLink}<br/><br/>
            Once confirmed, you'll be able to log in with your new account!<br/><br/>
            Best,<br/>
            Hack4Impact
          </p>`,
  });
}

/**
 * Given a token, attempt to decode it and confirm the
 * account of the appropriate user.
 */
let attemptConfirmation = (token: string) => {
  let decoded: any = jwt.verify(token, process.env.SECRET_KEY!);

  User.findById(decoded.id, function (err: Error, user: UserDocument) {
    if (err) {
      console.log(err);
      return;
    }
    user.isVerified = true;
    user.save();
  });
}