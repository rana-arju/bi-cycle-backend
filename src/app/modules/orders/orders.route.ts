import { Router } from "express";
import { orderController } from "./orders.controller";

const orderRouter = Router()

orderRouter.post('/', orderController.placeOrder);

export default orderRouter