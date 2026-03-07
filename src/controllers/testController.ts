import { Request, Response } from "express"
import { pool } from "../config/db"

export async function testDb(_req: Request, res: Response) {
  try {
    const result = await pool.query("SELECT NOW() as current_time")
    res.json({
      message: "Conexión a DB OK",
      data: result.rows[0],
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Error consultando la base de datos",
    })
  }
}