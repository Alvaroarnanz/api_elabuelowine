import "dotenv/config"
import { Pool } from "pg"

const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
const port = Number(process.env.DB_PORT)

if (!host || !user || !password || !database || !port) {
  throw new Error("Faltan variables de entorno de PostgreSQL")
}

export const pool = new Pool({
  host,
  user,
  password,
  database,
  port,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
})