import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Catching errors in Node.js (outside of Express)
process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});

export default app;
