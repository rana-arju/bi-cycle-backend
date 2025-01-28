import AppError from '../../error/AppError';
import { IProduct } from './products.interface';
import { Product } from './products.model';

//add single product
const addProductService = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

//Get All Product
const getAllProductService = async (searchTerm: string | undefined) => {
  // console.log(searchTerm);
  let filter = {};
  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm as string, 'i');
    filter = {
      $or: [
        { name: searchRegex },
        { brand: searchRegex },
        { type: searchRegex },
      ],
    };
  }
  const result = await Product.find(filter).select('-__v');
  return result;
};

//Get single Product
const getSingleProductService = async (id: string) => {
  const result = await Product.findById(id).select('-__v');
  if (!result) {
    throw new AppError(404, `Product with ID ${id} not found.`);
  }
  return result;
};
//delete Product
const deleteSingleProductService = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, `Product with ID ${id} not found.`);
  }
  return result;
};
// Update Product
const updateSingleProductService = async (
  id: string,
  payload: Partial<IProduct>,
) => {
  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-__v');
  if (!result) {
    throw new AppError(404, `Product with ID ${id} not found.`);
  }
  return result;
};

export const productService = {
  addProductService,
  getAllProductService,
  getSingleProductService,
  updateSingleProductService,
  deleteSingleProductService,
};
