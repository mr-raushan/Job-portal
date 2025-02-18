import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

import userRoute from "./route/user.js";
import companyRoute from "./route/company.js";
import jobRoute from "./route/job.js";
import applicationRoute from "./route/application.js";

dotenv.config({});

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
