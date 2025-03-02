import express  from "express";
import { addNewCommentForUser, getAllCommentsForAdmin, getOrderAllComments, getOrderAllCommentsForUser, getProductAllComments, getUserAllComments, updateCommentForAdmin, updateCommentForUser } from "../controllers/commentController";
import { validateSchema } from "../middlewares/schemaMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createNewcommentSchema, getOrderAllCommentsSchema, getProductAllCommentsSchema, getUserAllCommentsSchema, updateCommentForAdminSchema, updateCommentSchema } from "../validations/schemas/commentSchema";
const router = express.Router();

router.post('/create_comment',authMiddleware('user'),validateSchema(createNewcommentSchema),addNewCommentForUser);

router.post("/update_comment_user",authMiddleware('user'),validateSchema(updateCommentSchema),updateCommentForUser);

router.post("/update_comment_admin",authMiddleware('admin'),validateSchema(updateCommentForAdminSchema),updateCommentForAdmin);

router.post("/get_order_comments_user",authMiddleware('user'),validateSchema(getOrderAllCommentsSchema),getOrderAllCommentsForUser);

router.post("/get_order_comments",authMiddleware(['seller','admin']),validateSchema(getOrderAllCommentsSchema),getOrderAllComments);

router.post("/get_user_comments",authMiddleware('admin'),validateSchema(getUserAllCommentsSchema),getUserAllComments);

router.post("/get_all_comments",authMiddleware('admin'),getAllCommentsForAdmin)

router.post("/get_product_comments",validateSchema(getProductAllCommentsSchema),getProductAllComments);

export default router;