import { Router } from 'express';
import { productController } from './products.controller';

const productRouter = Router();
productRouter.get('/:productId', productController.getSingleProduct);
productRouter.put('/:productId', productController.updateProduct);
productRouter.delete('/:productId', productController.deleteProduct);
productRouter.post('/', productController.addProduct);
//.get('/', productController.getAllProduct);

export default productRouter;
