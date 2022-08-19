const  User =  require('../model/userModel')
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const dotenv = require('dotenv').config()
// const cookieParser = require('cookie-parser')


const getAllUser = async(req, res, next) => {
    let users
    try{
        users = await User.find();

    }catch(err){
        console.log(err)

    }
    if(!users){
        return res.status(404).json({message:"No user Found"})
    }
    return res.status(200).json({users})


}

const signUp = async(req, res, next)=>{
    const {name, email, password}=req.body

    let existingUser
    try {
        existingUser = await User.findOne({email})

    } catch (error) {
        console.log(err)

    }
    if(existingUser){
           return res.status(400).json({message:"User Already exists! Login instead"})
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)

    const user = new User({
        name,
        email,
        password:hashedPassword,
        blogs:[]

    })

    try {
         await user.save()

    } catch (error) {
        console.log(error)

    }
    return res.status(201).json({user})

}
const login =  async(req, res, next) => {
    const { email, password}= req.body

    let existingUser
    try {
        existingUser = await User.findOne({email})

    } catch (error) {
        console.log(err)

    }
    if(!existingUser){
           return res.status(400).json({message:"User doesn't exist, Signup please!"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
      if(!isPasswordCorrect){
          return res.status(400).json({message:"Incorrect password"})
      }
      return res.status(200).json({message:"Successfully logged In", user:existingUser})


}


module.exports = {
    getAllUser,
    signUp,
    login

}