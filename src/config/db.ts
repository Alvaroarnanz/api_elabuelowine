import "dotenv/config"
import { Pool } from "pg"

const env = {
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT
}

const missing = Object.entries(env)
  .filter(([_, value]) => !value)
  .map(([key]) => key)

if (missing.length > 0) {
  throw new Error(`Faltan variables de entorno de PostgreSQL: ${missing.join(", ")}`)
}

const host = env.DB_HOST!
const user = env.DB_USER!
const password = env.DB_PASSWORD!
const database = env.DB_NAME!
const port = Number(env.DB_PORT)

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