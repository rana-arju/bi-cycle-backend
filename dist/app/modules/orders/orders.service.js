"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const products_model_1 = require("../products/products.model");
const orders_model_1 = require("./orders.model");
//Place order
const addOrderService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product, quantity, totalPrice } = payload;
    // find existing Product
    const existingProduct = yield products_model_1.Product.findById(product);
    if (!existingProduct) {
        throw new AppError_1.default(404, 'Product not found');
    }
    if (existingProduct.quantity < quantity) {
        throw new Error(`Insufficient stock for product "${existingProduct.name}". Only ${existingProduct.quantity} items left.`);
    }
    existingProduct.quantity -= quantity;
    if (existingProduct.quantity === 0) {
        existingProduct.inStock = false;
    }
    yield existingProduct.save();
    // Use provided totalPrice if it exists, otherwise use calculated value
    const calculatedTotalPrice = existingProduct.price * quantity;
    const finalTotalPrice = totalPrice !== null && totalPrice !== void 0 ? totalPrice : calculatedTotalPrice;
    const result = yield orders_model_1.Order.create({
        email,
        product,
        quantity,
        totalPrice: finalTotalPrice,
    });
    return result;
});
//Calculate Order revenue
const calculateRevenueService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
        {
            $project: {
                _id: 0, // Exclude _id
            },
        },
    ]);
    return result;
});
//Get All Product
const getAllOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(searchTerm);
    const result = yield orders_model_1.Order.find().select('-__v');
    return result;
});
//Get single Product
const getSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findById(id).select('-__v');
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
//delete Product
const deleteSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
// Update Product
const updateSingleOrderService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select('-__v');
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
exports.orderService = {
    addOrderService,
    calculateRevenueService,
    updateSingleOrderService,
    deleteSingleOrderService,
    getSingleOrderService,
    getAllOrderService,
};
