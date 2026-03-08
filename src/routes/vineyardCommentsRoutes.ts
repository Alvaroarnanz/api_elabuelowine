import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getVineyardComments,
  postVineyardComment,
} from "../controllers/vineyardCommentsController"

const router = Router({ mergeParams: true })

router.get("/", authenticateToken, getVineyardComments)
router.post("/", authenticateToken, postVineyardComment)

export default router