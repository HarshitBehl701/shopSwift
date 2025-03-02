import express  from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { getSellerDetailsForAdminSchema, loginSellerSchema, registerSellerSchema, updateSellerDetailsForAdminSchema, updateSellerDetailsSchema, updateSellerPhotoForAdminSchema, verifySellerAccountSchema } from "../validations/schemas/sellerSchema";
import { getAllSellersForAdmin, loginSeller, registerNewSeller, sellerDetails, updateSellerAccountForSeller, updateSellerAccountForAdmin, verifySellerAccount, getSellerDetailsForAdmin, updateSellerPhotoForAdmin, updateSellerPhotoForSeller, logoutSeller } from "../controllers/sellerController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { handleMulterError, upload } from "../middlewares/multer";
const router = express.Router();

router.post("/register",validateSchema(registerSellerSchema),registerNewSeller);

router.post("/seller_account_verified",validateSchema(verifySellerAccountSchema),verifySellerAccount);

router.post("/login",validateSchema(loginSellerSchema),loginSeller);

router.post("/logout",authMiddleware('seller'),logoutSeller);

router.post("/seller_details",authMiddleware('seller'),sellerDetails);

router.post("/seller_details_admin",authMiddleware('admin'),validateSchema(getSellerDetailsForAdminSchema),getSellerDetailsForAdmin);

router.post("/update_details_seller",authMiddleware('seller'),validateSchema(updateSellerDetailsSchema),updateSellerAccountForSeller);

router.post("/update_photo_seller_seller",authMiddleware('seller'),upload("brandLogo", { storage: "seller", multiple: false }),handleMulterError,updateSellerPhotoForSeller);

router.post("/update_details_admin",authMiddleware('admin'),validateSchema(updateSellerDetailsForAdminSchema),updateSellerAccountForAdmin);

router.post("/update_seller_photo_admin",authMiddleware('admin'),upload("brandLogo", { storage: "seller", multiple: false }),handleMulterError,validateSchema(updateSellerPhotoForAdminSchema),updateSellerPhotoForAdmin);

router.post("/get_all_sellers",authMiddleware('admin'),getAllSellersForAdmin);

export default router;