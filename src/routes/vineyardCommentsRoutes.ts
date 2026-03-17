import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getVineyardComments,
  postVineyardComment,
  updateVineyardCommentController,
  deleteVineyardCommentController,
} from "../controllers/vineyardCommentsController"

const router = Router({ mergeParams: true })

router.get("/", authenticateToken, getVineyardComments)
router.post("/", authenticateToken, postVineyardComment)
router.put("/:commentId", authenticateToken, updateVineyardCommentController)
router.delete("/:commentId", authenticateToken, deleteVineyardCommentController)
export default router