"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const products_route_1 = __importDefault(require("./app/modules/products/products.route"));
const orders_route_1 = __importDefault(require("./app/modules/orders/orders.route"));
const auth_route_1 = require("./app/modules/auth/auth.route");
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const notFound_1 = require("./app/middleware/notFound");
const app = (0, express_1.default)();
// json parser middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://by-cycle-store.vercel.app'],
    credentials: true,
}));
// routers for products and orders
app.use('/api/products', products_route_1.default);
app.use('/api/orders', orders_route_1.default);
app.use('/api/auth', auth_route_1.authRoutes);
// Define a simple route
app.get('/', (req, res) => {
    res.send('Server running...');
});
// Error-handling middleware
app.use(globalErrorHandler_1.globalErrorHandler);
app.use(notFound_1.notFound);
exports.default = app;
