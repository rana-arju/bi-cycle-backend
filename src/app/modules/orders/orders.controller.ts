import { NextFunction, Request, Response } from 'express';
import { orderService } from './orders.service';

// Place order controller
const placeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await orderService.addOrderService(payload);

    res.json({
      status: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const orderController = {
  placeOrder,
};
