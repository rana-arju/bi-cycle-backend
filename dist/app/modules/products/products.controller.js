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
exports.productController = void 0;
const products_service_1 = require("./products.service");
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
const getAllProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (searchTerm && typeof searchTerm !== 'string') {
            res.status(400).json({
                success: false,
                message: 'Invalid search term. It must be a string.',
            });
            return;
        }
        const result = yield products_service_1.productService.getAllProductService(searchTerm);
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
