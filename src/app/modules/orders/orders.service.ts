import { IOrder } from "./orders.interface";
import { Order } from "./orders.model";


//Place order

const addOrderService = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);
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
