const AuthService = require('../services/authService')


class AuthController {

    // Register a new User
    static async registerUser(req, res) {
        const authData = req.body
        console.log(authData)
        const userCreated = await AuthService.signup(authData)


        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: userCreated,
        });
    }

    // Login for the User
    static async login(req, res) {
        const credentials = req.body
        const loginUser = await AuthService.login(credentials)

        return res.status(200).cookie("token", loginUser.accessToken.toString()).status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: loginUser,
        });
    }

    //Reset Password for the User
    static async resetPassword(req, res) {
        let { password } = req.body
        req.body.registeredUser.password = password
        await req.body.registeredUser.save()
        return res.status(200).json({ message: 'Password Changed Successfully', user: req.body.registeredUser })
    }


    // Logout the current User
    static async logOutUser(req, res) {
        res.clearCookie("token")
        return res.status(200).json({ message: 'User Logged Out Successfully.' })
    }

}

module.exports= AuthController