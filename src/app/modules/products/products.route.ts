import { Router } from 'express';
import { productController } from './products.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../auth/auth.interface';

const productRouter = Router();
productRouter.get('/:productId', productController.getSingleProduct);
productRouter.put(
  '/:productId',
  auth(USER_ROLE.admin),
  productController.updateProduct,
);
productRouter.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  productController.deleteProduct,
);
productRouter.post('/', auth(USER_ROLE.admin), productController.addProduct);
productRouter.get('/', productController.getAllProduct);

export default productRouter;
