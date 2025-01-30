import { model, Schema } from 'mongoose';
import { IOrder } from './orders.interface';

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
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
