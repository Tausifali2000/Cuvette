import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { saveForm, addElementsToForm } from "../controllers/form.controllers.js"


const router = express.Router();

 router.put("/:formId/save", protectRoute, saveForm);
// router.post("/:id/element", protectRoute, addElement);
router.patch("/:formId/element", protectRoute, addElementsToForm);
// router.post("/element", protectRoute, buildForm );


export default router;
