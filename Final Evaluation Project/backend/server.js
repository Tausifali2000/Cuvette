import express from "express"; //express module import
import cors from 'cors';
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"; //authroutes import
import homeRoutes from "./routes/home.route.js";
import { ENV_VARS } from "./config/envVars.js"; //Contant variable import
import { connectDB } from "./config/db.js"; //MongoDB connection import




const app = express();  //creating express instance
const PORT = ENV_VARS.PORT; //getting port value from envVars.js

app.use(express.json()); //middleware - parsed data in req.body
app.use(cookieParser()); //middleware - parse cookie from req

app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true // Enable cookies if needed
}));



app.use("/api/auth", authRoutes); //authentication routes
app.use("/api/home", homeRoutes);







app.listen(PORT, () => {
  console.log("Server started at " + PORT);
  connectDB(); //database connection
});