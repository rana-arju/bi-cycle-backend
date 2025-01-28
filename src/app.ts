import { Application, Request, Response } from 'express';
import cors from 'cors';
import express from 'express';
import productRouter from './app/modules/products/products.route';
import orderRouter from './app/modules/orders/orders.route';
import { authRoutes } from './app/modules/auth/auth.route';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';

const app: Application = express();

// json parser middleware
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://by-cycle-store.vercel.app'],
    credentials: true,
  }),
);

// routers for products and orders
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRoutes);

// Define a simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Server running...');
});
// Error-handling middleware
app.use(globalErrorHandler);
app.use(notFound);
export default app;
