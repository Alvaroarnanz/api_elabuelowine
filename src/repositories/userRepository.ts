import { pool } from "../config/db"

export type AppUser = {
  id: number
  username: string
  password_hash: string
  role: string
}

export async function findUserByUsername(username: string): Promise<AppUser | null> {
  const result = await pool.query(
    `
    SELECT id, username, password_hash, role
    FROM app_users
    WHERE username = $1
    `,
    [username]
  )

  if (result.rows.length === 0) {
    return null
  }

  return result.rows[0]
}