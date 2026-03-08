import { Router } from "express"
import { authenticateToken } from "../middlewares/authMiddleware"
import {
  getGrapeVarieties,
  getProducts,
} from "../controllers/catalogsController"

const router = Router()

router.get("/grape-varieties", authenticateToken, getGrapeVarieties)
router.get("/products", authenticateToken, getProducts)

export default router