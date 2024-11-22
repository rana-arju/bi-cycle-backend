import { IProduct } from './products.interface';
import { Product } from './products.model';

//add single product
const addProductService = async (payload: IProduct): Promise<IProduct> => {
  const result = await Product.create(payload);
  return result;
};

//Get All Product
const getAllProductService = async () => {
  const result = await Product.find();
  return result;
};

//Get single Product
const getSingleProductService = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
//delete Product
const deleteSingleProductService = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};
// Update Product
const updateSingleProductService = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload);
  return result;
};

export const productService = {
  addProductService,
  getAllProductService,
  getSingleProductService,
  updateSingleProductService,
  deleteSingleProductService,
};
