import HtttpStatusCode from "../exceptions/HttpStatusCode.js";
import jwt from "jsonwebtoken";
export default function checkToken(req, res, next) {
  if (
    req.url.toLowerCase().trim() == "/users/login".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/users/register".toLowerCase().trim() ||
    req.url.toLowerCase().trim() == "/students/getAll".toLowerCase().trim()
  ) {
    next();
    return;
  }
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObj = jwt.verify(token, process.env.SALT);
    const isExpired = Date.now() >= jwtObj.exp * 1000;
    if (isExpired) {
      res.status(HtttpStatusCode.UNAUTHORIZED).json({
        message: "Token has expired",
      });
      res.end();
    } else {
      next();
      return;
    }

  } catch (error) {
    res.status(HtttpStatusCode.BAD_REQUEST).json({
      message: error.message,
    });
  }
}
