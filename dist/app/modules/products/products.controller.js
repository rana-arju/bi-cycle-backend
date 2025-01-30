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
exports.productController = void 0;
const products_service_1 = require("./products.service");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
// Product add controller
const addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield products_service_1.productService.addProductService(payload);
        res.json({
            status: true,
            message: 'Bicycle created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// All Product get controller
const getAllProduct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_service_1.productService.getAllProductService(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: 'Bicycles retrieved successfully',
        data: result === null || result === void 0 ? void 0 : result.result,
        meta: result === null || result === void 0 ? void 0 : result.meta,
    });
}));
// Single Product get controller
const getSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.productService.getSingleProductService(productId);
        res.json({
            status: true,
            message: 'Bicycles retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Single Product delete controller
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield products_service_1.productService.deleteSingleProductService(productId);
        res.json({
            status: true,
            message: 'Bicycle deleted successfully',
            data: {},
        });
    }
    catch (error) {
        next(error);
    }
});
// Single Product update controller
const updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const payload = req.body;
        const result = yield products_service_1.productService.updateSingleProductService(productId, payload);
        res.json({
            status: true,
            message: 'Bicycle updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.productController = {
    addProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
    updateProduct,
};
