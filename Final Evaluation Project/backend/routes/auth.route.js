import express from "express";
import {signup, login, logout} from "../controllers/auth.controllers.js";

const router = express.Router(); //creating router instance

router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;
