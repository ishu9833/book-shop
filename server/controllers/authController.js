const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");
// const {check, validationError } = require('express-validator')

exports.signup = (req, res) => {
  const user = new User(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ errors: errors.array().map((err) => err.msg)[0] });
  }
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "Email already taken",
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "Invalid caredntials",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        err: "Invalid caredntials",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

    res.cookie("t", token, { expire: new Date() + "2h" });

    const { _id, name, email, role } = user;
    res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout Successful" });
};

exports.requireSignin = expressJwt({
  secret: process.env.SECRET_KEY,
  algorithms: ["sha1", "RS256", "HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource. Access denied!",
    });
  }
  next();
};
