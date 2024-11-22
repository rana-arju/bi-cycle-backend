import { Router } from 'express';
import { orderController } from './orders.controller';

const orderRouter = Router();

orderRouter.get('/:productId', orderController.getSingleOrder);
orderRouter.put('/:productId', orderController.updateOrder);
orderRouter.delete('/:productId', orderController.deleteOrder);
orderRouter.post('/', orderController.placeOrder);
orderRouter.get('/', orderController.getAllOrder);

export default orderRouter;
