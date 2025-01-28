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
const AppError_1 = __importDefault(require("../../error/AppError"));
const products_model_1 = require("./products.model");
//add single product
const addProductService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Product.create(payload);
    return result;
});
//Get All Product
const getAllProductService = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(searchTerm);
    let filter = {};
    if (searchTerm) {
        const searchRegex = new RegExp(searchTerm, 'i');
        filter = {
            $or: [
                { name: searchRegex },
                { brand: searchRegex },
                { type: searchRegex },
            ],
        };
    }
    const result = yield products_model_1.Product.find(filter).select('-__v');
    return result;
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
