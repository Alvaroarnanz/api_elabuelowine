import "dotenv/config"
import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import { pool } from "./config/db"

const app = express()
const PORT = process.env.PORT || 3001

console.log("DB_HOST:", process.env.DB_HOST)
console.log("DB_USER:", process.env.DB_USER)
console.log("DB_PASSWORD existe:", !!process.env.DB_PASSWORD)
console.log("DB_NAME:", process.env.DB_NAME)
console.log("DB_PORT:", process.env.DB_PORT)

const allowedOrigins = [
  "http://localhost:5173",
  "https://app.elabuelowine.com",
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Origen no permitido por CORS"))
      }
    },
    credentials: true,
  })
)

app.use(express.json())

app.get("/", (_req, res) => {
  res.json({ message: "API funcionando" })
})

app.use("/auth", authRoutes)

async function startServer() {
  try {
    await pool.query("SELECT NOW()")
    console.log("Conectado a PostgreSQL")

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Error conectando a PostgreSQL:", error)
    process.exit(1)
  }
}

startServer()