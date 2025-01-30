"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("./products.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const auth_interface_1 = require("../auth/auth.interface");
const productRouter = (0, express_1.Router)();
productRouter.get('/:productId', products_controller_1.productController.getSingleProduct);
productRouter.put('/:productId', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), products_controller_1.productController.updateProduct);
productRouter.delete('/:productId', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), products_controller_1.productController.deleteProduct);
productRouter.post('/', (0, auth_1.default)(auth_interface_1.USER_ROLE.admin), products_controller_1.productController.addProduct);
productRouter.get('/', products_controller_1.productController.getAllProduct);
exports.default = productRouter;
