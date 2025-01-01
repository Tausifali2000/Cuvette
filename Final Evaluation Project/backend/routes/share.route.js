import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { shareWorkspace } from "../controllers/share.controller.js";


const router = express.Router(); //creating router instance

router.post("/share", protectRoute, shareWorkspace);

export default router;
