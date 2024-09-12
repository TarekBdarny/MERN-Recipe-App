import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import cookieParser from "cookie-parser";

// routers
import { authRouter } from "./routes/auth.route.js";
import { postRouter } from "./routes/post.route.js";
import { userRouter } from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 3001;
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

try {
  connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (error) {
  console.log(error.message);
}
