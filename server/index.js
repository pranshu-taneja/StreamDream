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
import * as url from 'url';
import path from 'path';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Set Mongoose option to avoid errors with empty ObjectIDs
mongoose.set("strictQuery", false);

// Load environment variables
dotenv.config();
const app = express();


// adding frontend build
app.use(express.static(path.join(__dirname, 'build')));

// Configure middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(cors());

//for api calls
app.get("/api", async (req, res) => {
  try {
    res.json({ message: "Hello from the express server!!" });
  } catch (err) {
    console.log(err);
  }
});
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);

// Render index.html for all other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Handle errors
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  res.status(status).json({
    success: false,
    status,
    message,
  });
});


// Connect to MongoDB
const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    setTimeout(connectToDB, 1000); // Retry connection after delay
  }
};

// Start server when connected to MongoDB
const startServer = async () => {
  try {
    await connectToDB();
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
