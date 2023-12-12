const bcrypt = require('bcrypt');
const User= require('../models/userModel')
const { sign } =require('jsonwebtoken');

module.exports= class AuthService {

   static async signup(authData) {
    const user = await User.create({
      name: authData.name,
      email: authData.email,
      password: await bcrypt.hash(authData.password, 10)
    })
    if (user) return user
  }


   static async login(loginDto) {
    const { email, password } = loginDto;
    const user = await User.find({ email })
    if (!user[0] || await bcrypt.compare(password, user[0].password)) {
      throw new Error('Invalid credentials')
    }
    await user[0].save();
    return { accessToken: this.createToken(user[0]._id, "mySecretKey"), user: user[0] }
  }




  // Create a unique token if login or register
   static createToken(_id, sk) {
    let token = sign({ _id }, 'mySceretKey')
    return token
  }


}