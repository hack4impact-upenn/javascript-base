import * as jwt from "jsonwebtoken";

/**
 * Given a token, attempt to decode it and confirm the
 * account of the appropriate user.
 */
const decodeResetPasswordLink = (token: string) => {
  console.log('Inside decodeResetPasswordLink with token: ' + token);
  console.log('secret key: ' + process.env.SECRET_KEY!);
  console.log('hello??');
  console.log(process.env.HOST);
  const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);

  if (decoded.type != "forgot-password") {
    console.log('the decoded type is not correct');
    throw new Error("Incorrect link");
  }
  else {
    console.log('backend: we decoded!');
    return decoded.id;
  }
}

export { decodeResetPasswordLink };
