import jwt from "jsonwebtoken";
import { User } from "../models"

export const createTokens = user => {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15min"
    }
  );
  const refreshToken = jwt.sign(
    {
      userId: user.id,
      count: user.count
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );

  return { refreshToken, accessToken };
};

export const authenticate = async (req, res, next) => {
  const refreshToken = req.cookies["refresh-token"];
  const accessToken = req.cookies["access-token"];
  if (!refreshToken && !accessToken) {
    return next();
  }

  try {
    const data = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    req.userId = data.userId;
    req.role = data.role
    return next();
  } catch {}

  if (!refreshToken) {
    return next();
  }

  let data;

  try {
    data = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
  } catch {
    return next();
  }

  const user = await User.findById(data.userId);

  // token has been invalidated
  if (!user || user.count !== data.count) {
    return next();
  }

  const tokens = createTokens(user);

  res.cookie("refresh-token", tokens.refreshToken);
  res.cookie("access-token", tokens.accessToken);
  req.userId = user.id;
  req.role = user.role

  next();
}
