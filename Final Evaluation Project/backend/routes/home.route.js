import express from "express";
import { postFolders } from "../controllers/home.controllers.js";



const router = express.Router();

router.post("/folders", postFolders)

export default router;
