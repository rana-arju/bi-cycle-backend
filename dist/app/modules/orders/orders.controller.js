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
exports.orderController = void 0;
const orders_service_1 = require("./orders.service");
// Place order controller
const placeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield orders_service_1.orderService.addOrderService(payload);
        res.json({
            status: true,
            message: 'Order created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// All Order get controller
const getAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_service_1.orderService.getAllOrderService();
        res.json({
            status: true,
            message: 'Order retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Single Order get controller
const getSingleOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield orders_service_1.orderService.getSingleOrderService(productId);
        res.json({
            status: true,
            message: 'Order retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Single Order delete controller
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield orders_service_1.orderService.deleteSingleOrderService(productId);
        res.json({
            status: true,
            message: 'Order deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Single order update controller
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const payload = req.body;
        const result = yield orders_service_1.orderService.updateSingleOrderService(productId, payload);
        res.json({
            status: true,
            message: 'Order updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Total Revenua calculate
const totalRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_service_1.orderService.calculateRevenueService();
        res.json({
            status: true,
            message: 'Revenue calculated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.orderController = {
    placeOrder,
    getAllOrder,
    getSingleOrder,
    deleteOrder,
    updateOrder,
    totalRevenue,
};
