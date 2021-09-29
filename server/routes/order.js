const express = require("express");
const router = express.Router();

const {
  userById,
  addOrderToUserHistory,
} = require("../controllers/userController");

const { requireSignin, isAuth } = require("../controllers/authController");
const { create } = require("../controllers/orderControllers");
const { decreaseQuantity } = require("../controllers/productControllers");
router.post(
  "/order/create/:userId",
  requireSignin,
  isAuth,
  addOrderToUserHistory,
  decreaseQuantity,
  create
);

router.param("userId", userById);

module.exports = router;
