import express from "express";
import cors from "cors";
import router from "./router";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", router);

// Catching errors in Node.js (outside of Express)
process.on("uncaughtException", () => {});
process.on("unhandledRejection", () => {});

export default app;
