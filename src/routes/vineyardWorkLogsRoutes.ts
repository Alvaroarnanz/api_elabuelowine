import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getVineyardWorkLogs,
  postVineyardWorkLog,
  updateVineyardWorkLogController,
} from "../controllers/vineyardWorkLogsController"

const router = Router({ mergeParams: true })

router.get("/", authenticateToken, getVineyardWorkLogs)
router.post("/", authenticateToken, postVineyardWorkLog)
router.put("/:logId", authenticateToken, updateVineyardWorkLogController)
export default router