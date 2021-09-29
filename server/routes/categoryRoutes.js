const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/userController");
const { create, categoryById, read, update, remove, list  } = require("../controllers/categoryController");
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");


router.get('/category/:categoryId', read)
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update)
router.delete('/category/:categoryId/:userId',requireSignin, isAuth, isAdmin, remove)
router.get('/categories', list)



router.param("userId", userById);
router.param("categoryId", categoryById);


module.exports = router;
