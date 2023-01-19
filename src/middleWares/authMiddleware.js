const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = JSON.parse(process.env.salt);
const { User } = require("../models/userModel");

// To store password in hash format

const authMiddleWare = (req, res, next) => {
  const { password } = req.body;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      res.status(500).send("something went wrong to store password");
    }

    if (hash) {
      req.body.password = hash;
      next();
    }
  });
};

//Verify password hash with the actual password

const authLoginMiddleWare = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        res.status(500).send({ msg: "Password verification Error !" });
      }

      if (result) {
        req.user = user;
        next();
      } else {
        res.status(500).send({ msg: "Invalid Credentials" });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "Invalid Credentials" });
  }
};

module.exports = { authMiddleWare, authLoginMiddleWare };
