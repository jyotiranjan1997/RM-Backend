const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = JSON.parse(process.env.salt);
const { User } = require("../models/userModel");
const privateKey = process.env.secret_key;
// To store password in hash format

const authMiddleWare = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(200).send({ msg: "user Alredy Presnt with this mail Id" });
  } else {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      // Store hash in your password DB.
      if (err) {
        res.status(500).send({ msg: "something went wrong to store password" });
      }

      if (hash) {
        req.body.password = hash;
        next();
      }
    });
  }
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
        req.body.user = user;
        next();
      } else {
        res.status(200).send({ msg: "Invalid Credentials" });
      }
    });
  } catch (err) {
    res.status(500).send({ msg: "Invalid Credentials" });
  }
};

const authValidator = (req, res, next) => {
  const { auth } = req.headers;
  console.log(auth);
  console.log(req.body)

  var decoded = jwt.verify(auth, privateKey);
  
    if (decoded) {
      
      req.body.user_id = decoded.user._id;
      next();
    }
 
};

module.exports = { authMiddleWare, authLoginMiddleWare, authValidator };
