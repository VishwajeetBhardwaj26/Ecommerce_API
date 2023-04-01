const router = require('express').Router();
const User = require('../models/User');
const {
    verifyJwt,
    verifyTokenAndAdmin,
  } = require("./verifyJwt");


  //Get All User
  router.get("/getAllUsers",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const user= await User.find();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
  })


module.exports= router;