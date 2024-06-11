const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ err: true, msg: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Received token:", token);

  try {
    const decoded = jwt.verify(token, process.env.SERVER_KEY1);

    req.user = decoded;

    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return res.status(403).json({ err: true, msg: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
};
