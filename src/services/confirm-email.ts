import * as jwt from "jsonwebtoken";
import { User } from "../backend/models";
const sgMail = require("sgMail");

/**
 * Send confirmation email to the user expiring after 
 * a specified number of seconds.
 */
let sendConfirmationEmail = (user: User) => {
  let expiration_sec = 60 * 60 * 24 * 24 * 7; // 7 days
  let token = jwt.sign({ id: user._id, type: 'confirmation' },
    process.env.SECRET_KEY!, { expiresIn: expiration_sec });
  let confirmLink = '';
  sgMail.send({
    to: user.email,
    from: '@hack4impact.org',
    subject: 'Confirm Your Account',
    html: 'TODO' + confirmLink
  });
}

/**
 * Given a token, attempt to decode it and confirm the
 * email of the appropriate user.
 */
let attemptConfirmation = (token: string) => {
  let decoded = jwt.verify(token, process.env.SECRET_KEY!);
  User.find({ id: decoded.id })
}