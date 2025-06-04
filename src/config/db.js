import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB conectado: ${connect.connection.db.databaseName}`);
  } catch (error) {
    console.error(`❌ Error al conectar MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const config = {
  PORT: process.env.PORT,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
};

const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });
};

export default { connectDB, config, createTransporter };
