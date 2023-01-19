const express = require("express");
const { User } = require("../models/userModel");
const userRoute = express.Router();
const jwt = require("jsonwebtoken");
const {
  authMiddleWare,
  authLoginMiddleWare,
} = require("../middleWares/authMiddleware");
const privateKey = process.env.secret_key;

// For Sign-up Router

userRoute.post("/signup", authMiddleWare, async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    await User.create({ email, password });
    res.status(200).send({ msg: "signing up successfully !" });
  } catch (err) {
    res.status(500).send({ msg: "Signup failed !" });
  }
});

// For Login Router

userRoute.post("/login", authLoginMiddleWare, async (req, res) => {
  const { user } = req.body;
  console.log(user)
  try {
    jwt.sign({ user }, privateKey, function (err, token) {
      if (err) {
        res.status(500).send({ msg: "Login failed !" });
      }
      if (token) {
        res.status(200).send({ msg: "Login Successful", token });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "Login failed !" });
  }
});

module.exports = { userRoute };
