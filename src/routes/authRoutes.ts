import { Router } from "express"
import { login, logout, me } from "../controllers/authController"
import { authenticateToken } from "../middlewares/authMiddleware"

const router = Router()

router.post("/login", login)
router.post("/logout", logout)
router.get("/me", authenticateToken, me)

export default router