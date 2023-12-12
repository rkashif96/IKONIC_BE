const { verify } = require("jsonwebtoken")

const isAuthenticated = (req, res, next) => {
  if (req.cookies.token) {
    const decoded = verify(req.cookies.token.toString(), "mySceretKey")
    if (decoded) {
      req.user = decoded
      console.log('decoded : ', decoded)
      next()
    }
  }
  else {
    throw new Error("Please Login to Continue")
  }

}

module.exports= isAuthenticated;