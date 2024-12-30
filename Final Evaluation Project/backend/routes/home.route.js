import express from "express";
import { createFolder, createForm, getFolderById, getHome, getFormById, deleteFolderById, deleteFormById} from "../controllers/home.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";





const router = express.Router();

router.get("/", protectRoute, getHome )
router.get("/folder/:id", protectRoute, getFolderById);
// router.get("/form/:id", protectRoute, getFormById);
// router.get("/folder/:id/form/:id", protectRoute, getFolderById);

router.post("/createfolder", protectRoute,  createFolder);
router.post("/createform", protectRoute, createForm);



router.delete("/:id", protectRoute, deleteFormById);
router.delete("/:id", protectRoute, deleteFolderById);


export default router;
