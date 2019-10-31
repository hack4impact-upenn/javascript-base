import path from "path";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config({ path: path.resolve(__dirname, "../../../.env") });

// middleware function
// next indicate it moves onto next
module.exports = function(request, response, next) {
  // Get token from header
  const token = request.header("x-auth-token");

  // Check if not token
  if (!token) {
    return response.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.user = decoded.user;
    next();
  } catch (error) {
    response.status(401).json({ msg: "Token is not valid" });
  }
};
