"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("./app/modules/products/products.route"));
const globalError_1 = require("./app/modules/globalError");
const orders_route_1 = __importDefault(require("./app/modules/orders/orders.route"));
const app = (0, express_1.default)();
// json parser middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routers for products and orders
app.use('/api/products', products_route_1.default);
app.use('/api/orders', orders_route_1.default);
// Define a simple route
app.get('/', (req, res) => {
    res.send('Server running...');
});
app.use(globalError_1.ErrorHandler);
exports.default = app;
