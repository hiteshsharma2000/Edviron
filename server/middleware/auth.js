const jwt = require("jsonwebtoken");
require('dotenv').config()
module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  // console.log("hhhhhhhhhhhhhh",req.headers);
  
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
