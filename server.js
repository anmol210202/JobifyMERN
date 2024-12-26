import "express-async-errors"; // handle async errors // avoid try catch blocks // server never stops // custom error response
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

//importing routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// public folder
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

//importing middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Enable trust proxy
// app.set("trust proxy", true); // Fix for X-Forwarded-For issue

//middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); // Detailed error middleware
}

// public folder
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(cookieParser());
app.use(express.json());
//security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        scriptSrc: ["'self'"], // Adjust other sources as needed
        styleSrc: ["'self'", "'unsafe-inline'"], // Adjust as needed
      },
    },
  })
);

app.use(mongoSanitize());
// app.get("/", (req, res) => {
//   res.send(__dirname);
// });

// app.get("/api/v1/test", (req, res) => {
//   res.json({ msg: "test route" });
// });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobRouter); // we need to authenticate user before accessing jobs
app.use("/api/v1/users", authenticateUser, userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  // route not listed errors
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL); // no need of async function , directly use await
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
