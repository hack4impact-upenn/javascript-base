import * as jwt from "jsonwebtoken";

/**
 * Given a token, attempt to decode it and confirm the
 * account of the appropriate user.
 */
const decodeResetPasswordLink = (token: string) => {
  console.log('Inside decodeResetPasswordLink');
  const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);

  if (decoded.type != "forgot-password") {
    throw new Error("Incorrect link");
  }
  else {
    return decoded.id;
  }
}

export { decodeResetPasswordLink };
