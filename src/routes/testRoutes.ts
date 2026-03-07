import { Router } from "express"
import { testDb } from "../controllers/testController"

const router = Router()

router.get("/db", testDb)

export default router