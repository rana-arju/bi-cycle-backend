"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
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
}, { timestamps: true });
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
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
