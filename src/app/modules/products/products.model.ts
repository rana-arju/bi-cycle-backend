import { model, Schema } from 'mongoose';
import { IProduct } from './products.interface';

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Please enter product name!'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'The brand of the bicycle is required.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'The price of the bicycle is required.'],
      min: [0, 'The price must be at least 0.'],
    },
    type: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message: '{VALUE} is not a valid bicycle type.',
      },
      required: [true, 'The type of the bicycle is required.'],
    },
    description: {
      type: String,
      required: [true, 'The description of the bicycle is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'The quantity of the bicycle is required.'],
      min: [0, 'The quantity must be at least 0.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'The inStock field is required.'],
      default: true,
    },
  },
  { timestamps: true },
);

// Create the product model
export const Product = model<IProduct>("Product", productSchema)
