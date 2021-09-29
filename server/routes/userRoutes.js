const express = require("express");
const router = express.Router();
const { userById, read, update } = require("../controllers/userController");
const { requireSignin, isAuth, isAdmin } = require("../controllers/authController")

router.get("/secret/:userId", requireSignin, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
})

router.get("/user/:userId", requireSignin, isAuth, read)
router.put("/user/:userId", requireSignin,isAuth,  update)

router.param('userId', userById)

module.exports = router;
