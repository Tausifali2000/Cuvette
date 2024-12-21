import express from "express"; //express module import


import authRoutes from "./routes/auth.route.js"; //authroutes import
import { ENV_VARS } from "./config/envVars.js"; //Contant variable import
import { connectDB } from "./config/db.js"; //MongoDB connection import



const app = express();  //creating express instance
const PORT = ENV_VARS.PORT; //getting port value from envVars.js

app.use("/api/auth", authRoutes); //authentication routes







app.listen(PORT, () => {
  console.log("Server started at " + PORT);
  connectDB(); //database connection
});