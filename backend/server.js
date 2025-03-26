import express from "express";
import dotenv from "dotenv";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json({limit: "10mb"}));

app.use("/api/v1/auth", authRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});