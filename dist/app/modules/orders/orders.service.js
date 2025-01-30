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
exports.orderService = void 0;
const AppError_1 = __importDefault(require("../../error/AppError"));
const products_model_1 = require("../products/products.model");
const order_utils_1 = require("./order.utils");
const orders_model_1 = require("./orders.model");
const auth_model_1 = require("../auth/auth.model");
//Place order
const addOrderService = (userId, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new AppError_1.default(406, 'Order is not specified');
    const user = yield auth_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(404, 'User not found');
    }
    const { address, city, phone } = payload.userInfo;
    const updatedUser = yield auth_model_1.User.findByIdAndUpdate(user._id, {
        address,
        city,
        phone,
    }, { new: true });
    const products = payload.products;
    let totalPrice = 0;
    const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield products_model_1.Product.findById(item.product);
        if (product) {
            if ((item === null || item === void 0 ? void 0 : item.quantity) > (product === null || product === void 0 ? void 0 : product.quantity)) {
                throw new Error(`Insufficient stock for product "${product.name}". Only ${product.quantity} items left.`);
            }
            const subtotal = product ? (product.price || 0) * item.quantity : 0;
            totalPrice += subtotal;
            return item;
        }
    })));
    let order = yield orders_model_1.Order.create({
        user: user._id,
        products: productDetails,
        totalPrice,
    });
    // payment integration
    const shurjopayPayload = {
        amount: totalPrice.toFixed(2),
        order_id: order._id,
        currency: 'BDT',
        customer_name: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name,
        customer_address: (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.address) || address,
        customer_email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
        customer_phone: (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.phone) || phone,
        customer_city: (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.city) || city,
        client_ip,
    };
    const payment = yield order_utils_1.orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
        order = yield order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
});
//Calculate Order revenue
const calculateRevenueService = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
        {
            $project: {
                _id: 0, // Exclude _id
            },
        },
    ]);
    return result;
});
//Get All Product
const getAllOrderService = () => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(searchTerm);
    const result = yield orders_model_1.Order.find().select('-__v');
    return result;
});
//Get single Product
const getSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findById(id).select('-__v');
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
//delete Product
const deleteSingleOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
// Update Product
const updateSingleOrderService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Order.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    }).select('-__v');
    if (!result) {
        throw new AppError_1.default(404, `Order with ID ${id} not found.`);
    }
    return result;
});
const verifyPayment = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPaymentAsync(order_id);
    if (verifiedPayment.length) {
        yield orders_model_1.Order.findOneAndUpdate({
            'transaction.id': order_id,
        }, {
            'transaction.bank_status': verifiedPayment[0].bank_status,
            'transaction.sp_code': verifiedPayment[0].sp_code,
            'transaction.sp_message': verifiedPayment[0].sp_message,
            'transaction.transactionStatus': verifiedPayment[0].transaction_status,
            'transaction.method': verifiedPayment[0].method,
            'transaction.date_time': verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == 'Success'
                ? 'Paid'
                : verifiedPayment[0].bank_status == 'Failed'
                    ? 'Pending'
                    : verifiedPayment[0].bank_status == 'Cancel'
                        ? 'Cancelled'
                        : '',
        });
    }
    return verifiedPayment;
});
exports.orderService = {
    addOrderService,
    calculateRevenueService,
    updateSingleOrderService,
    deleteSingleOrderService,
    getSingleOrderService,
    getAllOrderService,
    verifyPayment,
};
