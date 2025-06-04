import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import path from "path";

dotenv.config();
db.connectDB();

const app = express();
app.use(express.json());
app.use("/uploads", express.static(path.resolve("uploads")));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", emailRoutes);
app.use("/api", bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
