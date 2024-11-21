import { model, Schema, Types } from 'mongoose';
import { IOrder } from './orders.interface';

const orderSchema = new Schema<IOrder>({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please enter a valid email address',
    ],
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  totalPrice: {
    type: Number,
    required: true,
    min: [0, 'Total price must be at least 0'],
  },
});

export const Order = model<IOrder>('Order', orderSchema);
