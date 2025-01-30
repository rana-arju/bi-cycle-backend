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
exports.orderController = void 0;
const orders_service_1 = require("./orders.service");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
// Place order controller
const placeOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield orders_service_1.orderService.addOrderService(userId, req.body, req.ip);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        message: 'Order placed successfully',
        success: true,
        data: result,
    });
}));
// All Order get controller
const getAllOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_service_1.orderService.getAllOrderService();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Order get successfully',
        success: true,
        data: result,
    });
}));
// All Order get controller
const getMyOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield orders_service_1.orderService.getMyOrderService(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Order retrieved successfully',
        success: true,
        data: result,
    });
}));
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
        yield orders_service_1.orderService.deleteSingleOrderService(productId);
        res.json({
            status: true,
            message: 'Order deleted successfully',
            data: {},
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
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orders_service_1.orderService.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        message: 'Order verified successfully',
        data: order,
        statusCode: 200,
        success: true,
    });
}));
exports.orderController = {
    placeOrder,
    getAllOrder,
    getSingleOrder,
    deleteOrder,
    updateOrder,
    totalRevenue,
    verifyPayment,
    getMyOrder,
};
