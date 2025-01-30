import { Router } from 'express';
import { orderController } from './orders.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.interface';

const orderRouter = Router();

orderRouter.get('/revenue', orderController.totalRevenue);
orderRouter.get('/verify', auth(USER_ROLE.user, USER_ROLE.admin), orderController.verifyPayment);
orderRouter.get('/:productId', orderController.getSingleOrder);
orderRouter.put('/:productId', orderController.updateOrder);
orderRouter.delete('/:productId', orderController.deleteOrder);
orderRouter.post('/', auth(USER_ROLE.user, USER_ROLE.admin), orderController.placeOrder);
orderRouter.get('/', auth(USER_ROLE.user), orderController.getAllOrder);

export default orderRouter;
