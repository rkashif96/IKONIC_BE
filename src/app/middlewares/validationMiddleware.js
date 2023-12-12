const  myAsyncHandler = require("../utils/asyncHandler")
const User = require("../models/userModel")
const { signupValidationSchema, loginValidationSchema, logoutValidationSchema } = require("../validations/authValidation")
const {postValidationSchema}= require("../validations/postValidation")
const jwt = require('jsonwebtoken')
const validateUser = myAsyncHandler(async (req, res, next) => {
    try {
        const {path} = req
        const { name, email, password } = req.body
        console.log(req.body, path)
        if (path === '/register') {
            const value = await signupValidationSchema.validateAsync({ name, email, password })
            if (value) {
                let registeredUser = await User.find({ email: req.body.email })
                if (registeredUser.length > 0) {
                    return res.status(404).json({ message: 'This User is already Registered.' })
                }
                next()
            }
        }
        else if (path === '/logout') {
            const value = await logoutValidationSchema.validateAsync({ email })
            if (value) next()        
        }
        else if (path === '/login') {
            const value = await loginValidationSchema.validateAsync({ email, password })
            if (value) {
                let registeredUser = await User.find({ email: req.body.email })
                if (registeredUser.length > 0) {
                    req.registeredUser = registeredUser[0]
                    next()
                }
            }
        }
    } catch (error) {
        next(error)
    }
})

const verifyToken = (req, res, next) => {
    try {
        const accessToken = req.cookies.jwt
        if (accessToken){
            if (jwt.verify(accessToken, 'mySecretKey')){
                next()
            }
        }
        else{ 
            res.status(400).json({message : 'Please Log In to Continue'})
        }     
    } catch (error) {
        next(error)
    }

}

const validatePost = (async (req, res, next) => {
    try {
        let { title, content, Author } = req.body
        const value = await postValidationSchema.validateAsync({ title, content, Author })
        if (value) next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

module.exports = {
    validateUser,
    verifyToken,
    validatePost
}