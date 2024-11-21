import { Request, Response } from "express";
import cors from "cors";
import express from "express";
const app = express();
// json parser middleware

app.use(express.json());
app.use(cors());
// Define a simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Server running...");
});

export default app;
