import { Application, Request, Response } from "express";
import cors from "cors";
import express from "express";
const app : Application= express();

// json parser middleware
app.use(express.json());
app.use(cors());



// routers for products and orders
// app.use("/api/products", productsRoute)
// app.use("/api/orders", productsRoute)

// Define a simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Server running...");
});

export default app;
