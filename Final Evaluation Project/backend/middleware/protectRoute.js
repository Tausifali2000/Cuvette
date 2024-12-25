import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies("jwt-formbot") //fetching cookie

    if(!token) { //if token not available 
      return res.status(401).jsom({Success: false, Message: "Unthorized  - No Token Provided"});
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET); //Verifing if token valid with salt

    if(!decoded) { //if token doesnt match
      return res.status(401).json({Success: false, Message: "Unthorized  - Invalid Token"});
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user) {
      return res.status(404).json({Success: false, Message: "User not found"});
    }

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({Success: false, Message: "Internal Server Error"});
  }
}
