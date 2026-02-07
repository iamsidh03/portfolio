/*
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.routes.js";

dotenv.config();

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-19y5.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(express.json());

app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
*/
import "../env.js"; // MUST be first line

import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-19y5.onrender.com",
      "https://portfolio-7op2jeowl-siddharth-rajs-projects-07008074.vercel.app/",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());
app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
