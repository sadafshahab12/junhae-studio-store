import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { productRouter } from "./routes/productRoutes.js";
import { connectDb } from "./config/connectDb.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
connectDb();
const port = 5000;

app.get("/", (req, res) => {
  res.json("Welcome to junhae store");
});
app.use(productRouter);
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
