import "dotenv/config"
import { Pool } from "pg"

console.log("DB_HOST:", process.env.DB_HOST)
console.log("DB_USER:", process.env.DB_USER)
console.log("DB_PASSWORD existe:", !!process.env.DB_PASSWORD)
console.log("DB_NAME:", process.env.DB_NAME)
console.log("DB_PORT:", process.env.DB_PORT)

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