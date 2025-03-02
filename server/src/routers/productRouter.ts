import express  from "express";
import { createNewProduct, getSellerAllProductsForAdmin, getAllLiveProducts, getAllProductsForAdmin, getAllProductsForSeller, manageUserCart, manageUserCartForAdmin, manageUserWhislist, manageUserWhislistForAdmin, updateProductForAdmin, updateProductForSeller } from "../controllers/productController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { createNewProductSchema, getSellerAllProductsForAdminSchema, manageUserCartForAdminSchema, manageUserCartSchema, manageUserWhislistSchema, updateProductDetailsForAdminSchema, updateProductDetailsForSellerSchema } from "../validations/schemas/productSchema";
import { handleMulterError, upload } from "../middlewares/multer";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/create_new_product",authMiddleware('seller'),upload("images[]", { storage: "product", multiple: true, maxCount: 5 }),handleMulterError,validateSchema(createNewProductSchema),createNewProduct);

router.post("/update_product_seller",authMiddleware('seller'),upload("images[]", { storage: "product", multiple: true, maxCount: 5 }),handleMulterError,validateSchema(updateProductDetailsForSellerSchema),updateProductForSeller)

router.post("/update_product_admin",authMiddleware('admin'),upload("images[]", { storage: "product", multiple: true, maxCount: 5 }),handleMulterError,validateSchema(updateProductDetailsForAdminSchema),updateProductForAdmin)

router.post("/get_all_live_products",getAllLiveProducts);

router.post("/get_all_products_seller",authMiddleware('seller'),getAllProductsForSeller);

router.post("/get_all_products_seller_admin",authMiddleware('admin'),validateSchema(getSellerAllProductsForAdminSchema),getSellerAllProductsForAdmin);

router.post("/get_all_products_admin",authMiddleware('admin'),getAllProductsForAdmin);

router.post("/manage_user_cart",authMiddleware('user'),validateSchema(manageUserCartSchema),manageUserCart);

router.post("/manage_user_whislist",authMiddleware('user'),validateSchema(manageUserWhislistSchema),manageUserWhislist)

router.post("/manage_user_cart_for_admin",authMiddleware('admin'),validateSchema(manageUserCartForAdminSchema),manageUserCartForAdmin);

router.post("/manage_user_whislist_for_admin",authMiddleware('admin'),validateSchema(manageUserWhislistSchema),manageUserWhislistForAdmin)

export default router;