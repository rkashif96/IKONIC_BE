const express = require ('express')
const AuthController = require("../controllers/authController")
const { validateUser } = require("../middlewares/validationMiddleware")
const isAuthenticated = require("../middlewares/authMiddleware")
const router = express.Router()
const  myAsyncHandler  = require('../utils/asyncHandler')


router.route('/register').post(myAsyncHandler(validateUser), myAsyncHandler(AuthController.registerUser))
router.route('/login').post(myAsyncHandler(validateUser), myAsyncHandler(AuthController.login))
router.route('/resetPassword').post(myAsyncHandler(validateUser), myAsyncHandler(AuthController.resetPassword))
router.route('/logout').post(myAsyncHandler(isAuthenticated), myAsyncHandler(AuthController.logOutUser))

module.exports = router;