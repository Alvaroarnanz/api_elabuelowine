import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json())

app.get("/", (_req, res) => {
  res.json({ message: "API funcionando" })
})

app.use("/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})