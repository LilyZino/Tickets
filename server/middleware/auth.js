const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header  = req.header("Authorization");
  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
    console.log(bearer.lengh)
    console.log(typeof header)
    console.log(header)
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
      console.log(error)
      res.status(401).json({ msg: "Token is not valid" });
    }
  }
};
