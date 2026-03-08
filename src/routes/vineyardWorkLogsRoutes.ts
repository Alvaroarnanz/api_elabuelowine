import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getVineyardWorkLogs,
  postVineyardWorkLog,
} from "../controllers/vineyardWorkLogsController"

const router = Router({ mergeParams: true })

router.get("/", authenticateToken, getVineyardWorkLogs)
router.post("/", authenticateToken, postVineyardWorkLog)

export default router