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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const products_model_1 = require("../products/products.model");
const orders_model_1 = require("./orders.model");
//Place order
const addOrderService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, product, quantity } = payload;
    // find existing Product
    const existingProduct = yield products_model_1.Product.findById(product);
    if (!existingProduct) {
        throw new Error('Product not found');
    }
    if (existingProduct.quantity < quantity) {
        throw new Error(`Insufficient stock for product "${existingProduct.name}". Only ${existingProduct.quantity} items left.`);
    }
    existingProduct.quantity -= quantity;
    if (existingProduct.quantity === 0) {
        existingProduct.inStock = false;
    }
    yield existingProduct.save();
    const totalPrice = existingProduct.price * quantity;
    const result = yield orders_model_1.Order.create({
        email,
        product,
        quantity,
        totalPrice,
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
    ]);
    return result;
});
//Get All Product
const getAllOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(searchTerm);
    const result = yield orders_model_1.Order.find();
    return result;
});
//Get single Product
const getSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findById(id);
    if (!result) {
        throw new Error(`Order with ID ${id} not found.`);
    }
    return result;
});
//delete Product
const deleteSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findByIdAndDelete(id);
    if (!result) {
        throw new Error(`Order with ID ${id} not found.`);
    }
    return result;
});
// Update Product
const updateSingleOrderService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new Error(`Order with ID ${id} not found.`);
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
