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

// All Order get controller
const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await orderService.getAllOrderService();

    res.json({
      status: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Single Order get controller
const getSingleOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    const result = await orderService.getSingleOrderService(productId);

    res.json({
      status: true,
      message: 'Order retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Single Order delete controller
const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;

     await orderService.deleteSingleOrderService(productId);

    res.json({
      status: true,
      message: 'Order deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// Single order update controller
const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.params;
    const payload = req.body;

    const result = await orderService.updateSingleOrderService(
      productId,
      payload,
    );

    res.json({
      status: true,
      message: 'Order updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Total Revenua calculate

const totalRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    
    const result = await orderService.calculateRevenueService();

    res.json({
      status: true,
      message: 'Revenue calculated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const orderController = {
  placeOrder,
  getAllOrder,
  getSingleOrder,
  deleteOrder,
  updateOrder,
  totalRevenue,
};
