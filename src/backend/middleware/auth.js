import jwt from "jsonwebtoken";

export const createTokens = user => {
  const accessToken = jwt.sign(
    { userId: user.id },
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
