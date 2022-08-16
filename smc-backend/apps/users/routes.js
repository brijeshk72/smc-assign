const express = require("express");
const { routeGuard } = require("../routeGuard");
const { userSignupValidator } = require("./validator");
const {
  signup,
  signin,
  signout,
  userById,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("./views");

const { getUserCart, addCart, updateCart } = require("./cartViews");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);

router.get("/", allUsers);

// cart related routes
router.post("/cart",routeGuard, addCart);
router.put("/cart",routeGuard, updateCart);
router.get("/cart",routeGuard, getUserCart);

router.get("/:userId", routeGuard, getUser);

router.put("/:userId", routeGuard, updateUser);

router.delete("/:userId", deleteUser);



// any route containing :userId our app will first execute userById
router.param("userId", userById);


module.exports = router;
