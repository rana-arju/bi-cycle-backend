import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import { IUser } from '../auth/auth.interface';
import { Product } from '../products/products.model';
import { orderUtils } from './order.utils';
import { IOrder } from './orders.interface';
import { Order } from './orders.model';
import { User } from '../auth/auth.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { OrderSearchableField } from './order.constant';

//Place order

const addOrderService = async (
  userId: JwtPayload,
  payload: {
    products: { product: string; quantity: number }[];
    totalPrice: number;
    totalQuantity: number;
    userInfo: IUser;
  },
  client_ip: string,
): Promise<string> => {
  if (!payload?.products?.length)
    throw new AppError(406, 'Order is not specified');
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const { address, city, phone } = payload.userInfo;

  //user update
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      address,
      city,
      phone,
    },
    { new: true },
  );

  const products = payload.products;
  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);

      if (product) {
        if (item?.quantity > product?.quantity) {
          throw new Error(
            `Insufficient stock for product "${product.name}". Only ${product.quantity} items left.`,
          );
        }
        const updateQuantity = product?.quantity - item?.quantity;
        await Product.findByIdAndUpdate(product?._id, {
          quantity: updateQuantity,
        });
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  //create order
  let order = await Order.create({
    user: user._id,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice.toFixed(2),
    order_id: order._id,
    currency: 'BDT',
    customer_name: updatedUser?.name,
    customer_address: updatedUser?.address || address,
    customer_email: updatedUser?.email,
    customer_phone: updatedUser?.phone || phone,
    customer_city: updatedUser?.city || city,
    client_ip,
  };
  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};

//Calculate Order revenue
const calculateRevenueService = async () => {
  const result = await Order.aggregate([
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
};

//Get All Product
const getAllOrderService = async (searchTerm: Record<string, unknown>) => {
  const allOrderQuery = new QueryBuilder(
    Order.find().populate('user').populate('products.product'),
    searchTerm,
  )
    .search(OrderSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await allOrderQuery.modelQuery;
  const meta = await allOrderQuery.countTotal();

  return { result, meta };
};

//Get All Product
const getMyOrderService = async (userId: JwtPayload) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(404, 'User not found!');
  }

  const result = await Order.find({ user: user._id })
    .sort({ createdAt: -1 })
    .populate('user')
    .populate('products.product');
  return result;
};

//Get single Product
const getSingleOrderService = async (id: string) => {
  const result = await Order.findById(id).select('-__v');
  if (!result) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  return result;
};
//delete Product
const deleteSingleOrderService = async (id: string) => {
  const orderExist = await Order.findById(id);
  if (!orderExist) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  if (orderExist?.status === 'Paid') {
    throw new AppError(400, `This order can not delete!`);
  }

  const result = await Order.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  return result;
};
// Update Product
const updateSingleOrderService = async (
  id: string,
  payload: Partial<IOrder>,
) => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select('-__v');
  if (!result) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  return result;
};
const updateStatusService = async (id: string, payload: { status: string }) => {
  const orderExist = await Order.findById(id);
  if (!orderExist) {
    throw new AppError(404, 'This order not found!');
  }
  const result = await Order.findByIdAndUpdate(orderExist._id, payload, {
    new: true,
  }).select('-__v');
  if (!result) {
    throw new AppError(404, `Order with ID ${id} not found.`);
  }
  return result;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

export const orderService = {
  addOrderService,
  calculateRevenueService,
  updateSingleOrderService,
  deleteSingleOrderService,
  getSingleOrderService,
  getAllOrderService,
  verifyPayment,
  getMyOrderService,
  updateStatusService,
};
