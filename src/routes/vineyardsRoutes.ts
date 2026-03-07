import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getVineyard,
  getVineyards,
  postVineyard,
  putVineyard,
  removeVineyard,
} from "../controllers/vineyardsController"

const router = Router()

router.get("/", authenticateToken, getVineyards)
router.get("/:id", authenticateToken, getVineyard)
router.post("/", authenticateToken, postVineyard)
router.put("/:id", authenticateToken, putVineyard)
router.delete("/:id", authenticateToken, removeVineyard)

export default router