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
exports.productService = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../error/AppError"));
const product_constant_1 = require("./product.constant");
const products_model_1 = require("./products.model");
//add single product
const addProductService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.create(payload);
    return result;
});
//Get All Product
const getAllProductService = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const allProductQuery = new QueryBuilder_1.default(products_model_1.Product.find(), searchTerm)
        .search(product_constant_1.productSearchableField)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield allProductQuery.modelQuery;
    const meta = yield allProductQuery.countTotal();
    return { result, meta };
});
//Get single Product
const getSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findById(id).select('-__v');
    if (!result) {
        throw new AppError_1.default(404, `Product with ID ${id} not found.`);
    }
    return result;
});
//delete Product
const deleteSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(404, `Product with ID ${id} not found.`);
    }
    return result;
});
// Update Product
const updateSingleProductService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select('-__v');
    if (!result) {
        throw new AppError_1.default(404, `Product with ID ${id} not found.`);
    }
    return result;
});
exports.productService = {
    addProductService,
    getAllProductService,
    getSingleProductService,
    updateSingleProductService,
    deleteSingleProductService,
};
