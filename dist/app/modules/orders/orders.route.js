"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_controller_1 = require("./orders.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_interface_1 = require("../auth/auth.interface");
const orderRouter = (0, express_1.Router)();
orderRouter.get('/revenue', orders_controller_1.orderController.totalRevenue);
orderRouter.get('/verify', (0, auth_1.default)(auth_interface_1.USER_ROLE.user, auth_interface_1.USER_ROLE.admin), orders_controller_1.orderController.verifyPayment);
orderRouter.get('/:productId', orders_controller_1.orderController.getSingleOrder);
orderRouter.put('/:productId', orders_controller_1.orderController.updateOrder);
orderRouter.delete('/:productId', orders_controller_1.orderController.deleteOrder);
orderRouter.post('/', (0, auth_1.default)(auth_interface_1.USER_ROLE.user, auth_interface_1.USER_ROLE.admin), orders_controller_1.orderController.placeOrder);
orderRouter.get('/', (0, auth_1.default)(auth_interface_1.USER_ROLE.user), orders_controller_1.orderController.getAllOrder);
exports.default = orderRouter;
