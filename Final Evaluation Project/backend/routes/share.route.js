import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { fetchWorkspaces, shareWorkspace } from "../controllers/share.controller.js";


const router = express.Router(); //creating router instance

router.post("/share", protectRoute, shareWorkspace);


router.get("/shared", protectRoute, fetchWorkspaces);
export default router;
