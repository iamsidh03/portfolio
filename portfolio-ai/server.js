import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import chatRoute from "./routes/chat.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
//app.use(rateLimiter);
app.get("/", (req, res) => {
  res.send("Server is alive");
});
// Routes
app.use("/api/chat", chatRoute);

// Error handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});