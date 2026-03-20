import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getFarmers,
  getFarmer,
  postFarmer,
  putFarmer,
  removeFarmer,
} from "../controllers/farmersController"

const router = Router()

router.get("/", authenticateToken, getFarmers)
router.get("/:id", authenticateToken, getFarmer)
router.post("/", authenticateToken, postFarmer)
router.put("/:id", authenticateToken, putFarmer)
router.delete("/:id", authenticateToken, removeFarmer)

export default router