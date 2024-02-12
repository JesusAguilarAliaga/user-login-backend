import express from "express";
import { createUser, deleteUser, getAllUsers, getOneUser, loginUser, resetPassword, setNewPassword, updateUser, userLogged, verifyUser } from "../controllers/user.controller.js";
import jwtVerify from "../utils/jwtVerify.js";

const userRouter = express.Router();

userRouter.route("/")
    .get(jwtVerify, getAllUsers)
    .post(createUser)

userRouter.route("/login")
    .post(loginUser)

userRouter.route("/me")
    .get(jwtVerify, userLogged)

userRouter.route("/reset_password")
    .post(resetPassword)

userRouter.route("/reset_password/:code")
    .post(setNewPassword)

userRouter.route("/verify/:code")
    .get(verifyUser)

userRouter.route("/:id")
    .get(jwtVerify, getOneUser)
    .delete(jwtVerify, deleteUser)
    .put(jwtVerify, updateUser)


export default userRouter;