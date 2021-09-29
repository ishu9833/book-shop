const express = require("express")
const router = express.Router()

const { userById} = require("../controllers/userController");

const { requireSignin, isAuth } = require("../controllers/authController")
const { generateToken, processPayment } = require("../controllers/braintreeControllers")

router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken)
router.post('/braintree/payment/:userId', requireSignin, isAuth, processPayment)

router.param('userId', userById)

module.exports = router;
