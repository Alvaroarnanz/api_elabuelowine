import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getGrapeVarieties,
  getProducts,
  getWorkActivityTypes,
} from "../controllers/catalogsController"

const router = Router()

router.get("/grape-varieties", authenticateToken, getGrapeVarieties)
router.get("/products", authenticateToken, getProducts)
router.get("/work-activity-types", authenticateToken, getWorkActivityTypes)

export default router