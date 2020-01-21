const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("Im here!!!")
  console.log(req.header)
  console.log(req.header.console)
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("No token, authorization denied")
    return res.status(401).json({
      msg: "No token, authorization denied"
    });
  }

  try {
    console.log("there is token")
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("Token is not valid")
    res.status(401).json({ msg: "Token is not valid" });
  }
};
