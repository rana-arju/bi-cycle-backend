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
  const result = await Order.find();
  return result;
};

export const orderService = {
  addOrderService,
  calculateRevenueService,
};
