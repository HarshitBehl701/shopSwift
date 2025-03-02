import express  from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { contactUs, createCategory, createSubCategory, getAllActiveCategoriesAndSubCategories, getAllCategoriesAndSubCategories, getContactRows, updateCategory, updateSubCategory } from "../controllers/mainController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { contactUsSchema, createNewCategorySchema, createNewSubCategorySchema, updateCategorySchema, updateSubCategorySchema } from "../validations/schemas/mainSchema";
import { handleMulterError, upload } from "../middlewares/multer";
const router = express.Router();

router.post("/create_contact_us",validateSchema(contactUsSchema),contactUs);

router.post("/get_contact_us",authMiddleware("admin"),getContactRows);

router.post("/create_category",authMiddleware('admin'),upload("image", { storage: "main", multiple: false, maxCount: 1 }),handleMulterError,validateSchema(createNewCategorySchema),createCategory);

router.post("/update_category",authMiddleware('admin'),upload("image", { storage: "main", multiple: false, maxCount: 1 }),handleMulterError,validateSchema(updateCategorySchema),updateCategory);

router.post("/create_sub_category",authMiddleware('admin'),upload("image", { storage: "main", multiple: false, maxCount: 1 }),handleMulterError,validateSchema(createNewSubCategorySchema),createSubCategory);

router.post("/update_sub_category",authMiddleware('admin'),upload("image", { storage: "main", multiple: false, maxCount: 1 }),handleMulterError,validateSchema(updateSubCategorySchema),updateSubCategory);

router.post("/get_active_categories_sub_categories",getAllActiveCategoriesAndSubCategories);

router.post("/get_all_categories_sub_categories",authMiddleware("admin"),getAllCategoriesAndSubCategories);

export default router;