import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js";
import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import morgan from "morgan";
mongoose.set('strictQuery', false);

const app = express();
dotenv.config();

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use(morgan("combined"));
app.use(cors());

const port = process.env.PORT || 5000;

const connect = async() => {
  await mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};


//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.get("/", async (req, res) => {
  try {
    res.json({ message: "Hello from the express server!!" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  connect();
  console.log(`Connected to Server On Port ${port}`);
});


