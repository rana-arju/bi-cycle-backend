import { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import express from "express";
import ErrorHandler from "./app/modules/globalError";
import productRouter from "./app/modules/products/products.route";
const app : Application= express();

// json parser middleware
app.use(express.json());
app.use(cors());



// routers for products and orders
 app.use('/api/products', productRouter);
// app.use("/api/orders", productsRoute)



// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const formattedError = ErrorHandler(err);
  res.status(400).json(formattedError); // You can adjust the status code based on the error type
});
// Define a simple route
app.get("/", (req: Request, res: Response) => {
  res.send("Server running...");
});

export default app;
