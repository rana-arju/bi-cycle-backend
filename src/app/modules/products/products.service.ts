import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { productSearchableField } from './product.constant';
import { IProduct } from './products.interface';
import { Product } from './products.model';

//add single product
const addProductService = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

//Get All Product
const getAllProductService = async (searchTerm: Record<string, unknown>) => {
  const allProductQuery = new QueryBuilder(Product.find(), searchTerm)
    .search(productSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await allProductQuery.modelQuery;
  const meta = await allProductQuery.countTotal();

  return { result, meta };
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
  const product = await Product.findById(id);
  if (!product) {
    throw new AppError(404, `Product with ID ${id} not found.`);
  }
  const result = await Product.findByIdAndDelete(id);
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
