const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

let jwtToken;

//Register the user
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.hash_Secret
    ).toString(),
  });
  try {
    const currentSavedUser = await newUser.save();
    res.status(201).json(currentSavedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
//Login Users
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong Credentials.");
    }
    const password = CryptoJS.AES.decrypt(
      user.password,
      process.env.hash_Secret
    ).toString(CryptoJS.enc.Utf8);
    if (password != req.body.password) {
        res.status(401).json("Wrong Credentials.");
    } else {
        jwtToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.jwt_Secret,
          { expiresIn: "2d" }
        );
      res.status(200).json({...user._doc,jwtToken});
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
