import jwt from "jsonwebtoken";
const JWT_SECRET = "authsecret";

const authmiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token)
    if (!token)
      return res.status(401).json({ mag: "No auth token, access denied" });
    const verified = jwt.verify(token, JWT_SECRET);

    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    req.user = verified.username;
    req.token = token;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token invalid" });
  }
};
export default authmiddleware;
