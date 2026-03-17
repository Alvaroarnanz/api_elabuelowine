import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getVineyardWorkLogs,
  postVineyardWorkLog,
  updateVineyardWorkLogController,
  deleteVineyardWorkLogController,
} from "../controllers/vineyardWorkLogsController"

const router = Router({ mergeParams: true })

router.get("/", authenticateToken, getVineyardWorkLogs)
router.post("/", authenticateToken, postVineyardWorkLog)
router.put("/:logId", authenticateToken, updateVineyardWorkLogController)
router.delete("/:logId", authenticateToken, deleteVineyardWorkLogController)
export default router