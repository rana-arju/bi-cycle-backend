import { NextFunction, Request, Response } from 'express';
import { productService } from './products.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// Product add controller
const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const result = await productService.addProductService(payload);

    res.json({
      status: true,
      message: 'Bicycle created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// All Product get controller
const getAllProduct = catchAsync(async (req, res) => {
  const result = await productService.getAllProductService(req.query);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Bicycles retrieved successfully',
    data: result?.result,
    meta: result?.meta,
  });
});

// Single Product get controller
const getSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    const result = await productService.getSingleProductService(productId);

    res.json({
      status: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Single Product delete controller
const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;

    await productService.deleteSingleProductService(productId);

    res.json({
      status: true,
      message: 'Bicycle deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// Single Product update controller
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params;
    const payload = req.body;

    const result = await productService.updateSingleProductService(
      productId,
      payload,
    );

    res.json({
      status: true,
      message: 'Bicycle updated successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const productController = {
  addProduct,
  getAllProduct,
  getSingleProduct,
  deleteProduct,
  updateProduct,
};
