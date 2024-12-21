import dotenv from "dotenv"; //dotenv import

dotenv.config(); //dotenv config

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT || 5000,
} 