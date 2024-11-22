import { NextFunction, Request, Response } from 'express';
import { productService } from './products.service';

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
const getAllProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { searchTerm } = req.query;

    if (searchTerm && typeof searchTerm !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid search term. It must be a string.',
      });
      return;
    }

    const result = await productService.getAllProductService(searchTerm);

    res.json({
      status: true,
      message: 'Bicycles retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

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

    const result = await productService.deleteSingleProductService(productId);

    res.json({
      status: true,
      message: 'Bicycle deleted successfully',
      data: result,
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
