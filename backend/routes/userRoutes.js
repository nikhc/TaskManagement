const express=require("express");
const { registerUser, loginUser,logout } = require("../controller/userController");
const { protectRoute ,isAuthorised} = require("../middlewares/protectroute");

const userRouter=express.Router();
userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(logout)

module.exports=userRouter