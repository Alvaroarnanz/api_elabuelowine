import "dotenv/config"
import express from "express"
import cors from "cors"
import authRoutes from "./routes/authRoutes"
import vineyardsRoutes from "./routes/vineyardsRoutes"
import { pool } from "./config/db"

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  "http://localhost:5174",
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
app.use("/vineyards", vineyardsRoutes)


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