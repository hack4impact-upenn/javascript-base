import * as jwt from "jsonwebtoken";
import { DocumentType } from '@typegoose/typegoose'
import { IUser } from '../backend/modules/user/model'
const sgMail = require("@sendgrid/mail");

/**
 * Send email to the user who forgot their password. Email contains a unique 
 * link o reset the password. 
 */
const sendForgotPasswordEmail = (user: DocumentType<IUser>) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const expirationSeconds = 60 * 60 * 24 * 24 * 1; // 1 day
  const token = jwt.sign({ id: user.id, type: 'forgot-password' },
    process.env.SECRET_KEY!, { expiresIn: expirationSeconds });
  // TODO (annie/jediah): use a more robust link generator.
  const forgotPasswordURL = "http://" + process.env.HOST + ":" + 
                            process.env.PORT + "/authenticate/" + token;
  sgMail.send({
    to: user.email,
    from: 'anniesumail@gmail.com',
    subject: 'Reset Your Password',
    html: `<p>
            Hello, ${user.firstName}!<br/><br/>
            Forgot your password? We have your back! Click here to make up a new 
            password and get back to it!:<br/>
            <a href="${forgotPasswordURL}">Reset Password Link</a><br/>
            <br/><br/>
            Best,<br/>
            Hack4Impact
          </p>`,
  }).then((res: any) => {console.log("> Forgot-password email sent to new user");})
  .catch((err: any) => {console.log(err);});
}

export { sendForgotPasswordEmail };