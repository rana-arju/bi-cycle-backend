import { Router } from "express";
import { orderController } from "./orders.controller";

const orderRoute = Router()

orderRoute.post('/', orderController.placeOrder);