import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { getSession } from "@auth/express";

config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const verifyToken = async (req, res, next) => {
  const session = await getSession(req, {
    providers: [],
  });

  if (!session) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  req.user = session.user;
  next();
};

app.get("/auth/resource", verifyToken, async (req, res) => {
  try {
    res.status(200).json({ message: "Secret Message" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(5000, async () => {
  console.log("Server started on port 5000");
});
