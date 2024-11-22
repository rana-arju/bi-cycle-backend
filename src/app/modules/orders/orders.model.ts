import { model, Schema } from 'mongoose';
import { IOrder } from './orders.interface';

const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
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
      required: [true, 'Quantity is required!'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      min: [0, 'Total price must be at least 0'],
    },
  },
  { timestamps: true },
);

/*
orderSchema.pre('save', async function (next) {
  if (!this.isModified('quantity') && !this.isModified('product'))
    return next();

  try {
    const product = await Product.findById(this.product);
    if (product) {
      this.totalPrice = product.price * this.quantity; // Calculate the total price
    }
    next();
  } catch (error) {
    next(error as any);
  }
});
*/
export const Order = model<IOrder>('Order', orderSchema);
