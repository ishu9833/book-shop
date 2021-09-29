const express = require("express");
const router = express.Router();
const { userById } = require("../controllers/userController");
const {
  createProduct,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
  listSearch
} = require("../controllers/productControllers");
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require("../controllers/authController");



router.get("/product/:productId", read);
router.post(
  "/product/create/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  createProduct
);
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAuth,
  isAdmin,
  update
);

router.get('/products', list)
router.get("/products/search", listSearch);

router.get('/products/realted/:productId', listRelated)
router.get('/products/categories', listCategories)
router.post("/products/by/search", listBySearch);
router.get('/products/photo/:productId', photo)

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
