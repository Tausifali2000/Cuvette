import express from "express"; //express module import

import authRoutes from "./routes/auth.route.js"; //authroutes import

const app = express();  //creating express instance

app.use("/api/auth", authRoutes); //authentication routes







app.listen(5000, () => {
  console.log("Server started at 5000");
});