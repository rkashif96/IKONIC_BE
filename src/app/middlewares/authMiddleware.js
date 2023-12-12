const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];

  if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.split(' ')[1];

    try {
      const decoded = jwt.verify((token), "mySecretKey");
      console.log('decoded: ', decoded);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "Please Login to Continue" });
  }
};


module.exports = isAuthenticated;
