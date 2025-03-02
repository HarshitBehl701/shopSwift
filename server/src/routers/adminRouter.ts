import  express from "express";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { getAdminDetailsSchema, loginAdminSchema, registerAdminSchema, updateAdminDetailsSchema } from "../validations/schemas/adminSchema";
import { getAdminAccountDetails, getAllAdmins, getLoginAdminDetails, loginAdmin, logoutAdmin, registerAdmin, updateAdmin } from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";
const router   = express.Router();

router.post("/register",validateSchema(registerAdminSchema),registerAdmin);

router.post("/login",validateSchema(loginAdminSchema),loginAdmin);

router.post("/logout",logoutAdmin);

router.post("/account_update",authMiddleware('admin'),validateSchema(updateAdminDetailsSchema),updateAdmin);

router.post("/get_login_admin_details",authMiddleware('admin'),getLoginAdminDetails);

router.post("/get_admin_details",authMiddleware("admin"),validateSchema(getAdminDetailsSchema),getAdminAccountDetails);

router.post("/get_admins",authMiddleware('admin'),getAllAdmins);

export default  router;