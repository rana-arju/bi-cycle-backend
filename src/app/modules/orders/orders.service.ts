import { Product } from '../products/products.model';
import { IOrder } from './orders.interface';
import { Order } from './orders.model';

//Place order

const addOrderService = async (payload: IOrder): Promise<IOrder> => {
  const { email, product, quantity } = payload;

  // find existing Product
  const existingProduct = await Product.findById(product);
  if (!existingProduct) {
    throw new Error('Product not found');
  }
  if (existingProduct.quantity < quantity) {
    throw new Error(
      `Insufficient stock for product "${existingProduct.name}". Only ${existingProduct.quantity} items left.`,
    );
  }
  existingProduct.quantity -= quantity;

  if (existingProduct.quantity === 0) {
    existingProduct.inStock = false;
  }
  await existingProduct.save();

  const totalPrice = existingProduct.price * quantity;

  const result = await Order.create({
    email,
    product,
    quantity,
    totalPrice,
  });
  return result;
};

//Calculate Order revenue
const calculateRevenueService = async () => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return result;
};

//Get All Product
const getAllOrderService = async () => {
  // console.log(searchTerm);

  const result = await Order.find();
  return result;
};

//Get single Product
const getSingleOrderService = async (id: string) => {
  const result = await Order.findById(id);
  if (!result) {
    throw new Error(`Order with ID ${id} not found.`);
  }
  return result;
};
//delete Product
const deleteSingleOrderService = async (id: string) => {
  const result = await Order.findByIdAndDelete(id);
  if (!result) {
    throw new Error(`Order with ID ${id} not found.`);
  }
  return result;
};
// Update Product
const updateSingleOrderService = async (
  id: string,
  payload: Partial<IOrder>,
) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new Error(`Order with ID ${id} not found.`);
  }
  return result;
};

export const orderService = {
  addOrderService,
  calculateRevenueService,
  updateSingleOrderService,
  deleteSingleOrderService,
  getSingleOrderService,
  getAllOrderService,
};
