import express from "express";

import { protectRoute } from "../middleware/protectRoute.js";
import { fetchForm } from "../controllers/form.controllers.js";

const router = express.Router();


router.get("/:formId", protectRoute, fetchForm);

export default router;