import { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import productRouter from './app/modules/products/products.route';
import { ErrorHandler } from './app/modules/globalError';
import orderRouter from './app/modules/orders/orders.route';

const app: Application = express();

// json parser middleware
app.use(express.json());
app.use(cors());

// routers for products and orders
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);


// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Server running...');
});
app.use(ErrorHandler);

export default app;
