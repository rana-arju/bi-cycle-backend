import { Types } from 'mongoose';

export type IOrder = {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
};
