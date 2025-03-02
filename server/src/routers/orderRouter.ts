import express  from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { cancelOrderSchema, createNewOrderSchema, getAllOrdersOfProductForAdminSchema, getAllOrdersOfProductForSellerSchema, getAllOrdersOfUserForAdminSchema, manageOrderRatingForUserSchema, updateExistingOrderForAdminSchema, updateExistingOrderForSellerSchema } from "../validations/schemas/orderSchema";
import { cancelOrderForUser, getAllOrders, getAllOrdersForSeller, getAllOrdersOfProductForAdmin, getAllOrdersOfProductForSeller, getAllOrdersOfUserForAdmin, getAllOrdersOfUserForUser, manageOrderRatingForUser, placeNewOrder, updateOrderForAdmin, updateOrderForSeller } from "../controllers/orderController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/place_order",authMiddleware('user'),validateSchema(createNewOrderSchema),placeNewOrder);

router.post("/cancel_order",authMiddleware('user'),validateSchema(cancelOrderSchema),cancelOrderForUser);

router.post("/manage_order_rating",authMiddleware('user'),validateSchema(manageOrderRatingForUserSchema),manageOrderRatingForUser);

router.post("/update_order_seller",authMiddleware('seller'),validateSchema(updateExistingOrderForSellerSchema),updateOrderForSeller);

router.post("/update_order_admin",authMiddleware('admin'),validateSchema(updateExistingOrderForAdminSchema),updateOrderForAdmin);

router.post("/get_product_orders_seller",authMiddleware('seller'),validateSchema(getAllOrdersOfProductForSellerSchema),getAllOrdersOfProductForSeller);

router.post("/get_all_orders_seller",authMiddleware('seller'),getAllOrdersForSeller)

router.post("/get_product_orders_admin",authMiddleware('admin'),validateSchema(getAllOrdersOfProductForAdminSchema),getAllOrdersOfProductForAdmin);

router.post("/get_user_orders_user",authMiddleware('user'),getAllOrdersOfUserForUser)

router.post("/get_user_orders_admin",authMiddleware('admin'),validateSchema(getAllOrdersOfUserForAdminSchema),getAllOrdersOfUserForAdmin)

router.post("/get_all_orders_admin",authMiddleware('admin'),getAllOrders)

export default router;