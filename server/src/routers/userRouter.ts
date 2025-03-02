import express  from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { getUserDetailsSchema, loginUserSchema, manageUserAccountForAdminSchema, registerNewUserSchema, updateUserDetailsSchema, updateUserPhotoForAdminSchema, verifyAccountSchema } from "../validations/schemas/userSchema";
import { getAllUsersForAdmin, getUserDetailsForAdmin, loginUser, logoutUser, manageUserAccountForAdmin, registerNewUser, updateUserAccountForUser, updateUserPhotoForAdmin, userDetailsForUser, verifyUserAccount } from "../controllers/userController";
import { handleMulterError, upload } from "../middlewares/multer";
import { authMiddleware } from "../middlewares/authMiddleware";
const router = express.Router();

router.post("/register",validateSchema(registerNewUserSchema),registerNewUser);

router.post("/verify_account",validateSchema(verifyAccountSchema),verifyUserAccount);

router.post("/login",validateSchema(loginUserSchema),loginUser);

router.post("/logout",authMiddleware("user"),logoutUser);

router.post("/account_details",authMiddleware('user'),userDetailsForUser);

router.post("/get_user_details_admin",authMiddleware('admin'),validateSchema(getUserDetailsSchema),getUserDetailsForAdmin);

router.post("/update_account_user",authMiddleware('user'),upload("userPhoto", { storage: "user", multiple: false, maxCount: 1 }),handleMulterError,validateSchema(updateUserDetailsSchema),updateUserAccountForUser);

router.post("/manage_user_admin",authMiddleware('admin'),validateSchema(manageUserAccountForAdminSchema),manageUserAccountForAdmin);

router.post("/update_user_photo_admin",authMiddleware('admin'),upload("userPhoto", { storage: "user", multiple: true, maxCount: 1 }),handleMulterError,validateSchema(updateUserPhotoForAdminSchema),updateUserPhotoForAdmin);

router.post("/get_all_users_admin",authMiddleware('admin'),getAllUsersForAdmin);

export default router;