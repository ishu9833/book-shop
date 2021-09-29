const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { signup, signin,requireSignin, signout } = require("../controllers/authController");
router.post(
  "/signup",
  //express-validation
  body("name", "Name is required").notEmpty(),
  body("email", "Email must be between 3 to 32 characters")
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    }),
  body("password", "Password is required").notEmpty(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
  signup
);
router.post('/signin', signin)
router.get('/signout', signout)
router.get("/hola",requireSignin,  (req, res) => {
  res.json({message:"hello world whats app"})
})

module.exports = router;
