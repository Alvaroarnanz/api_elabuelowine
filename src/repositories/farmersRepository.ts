import { pool } from "../config/db"

export type Farmer = {
  id: number
  name: string
  area: string | null
  phone_number: string | null
  description: string | null
}

export async function getAllFarmers(): Promise<Farmer[]> {
  const result = await pool.query(
    `
    SELECT 
      id,
      name,
      area,
      phone_number
    FROM farmers
    ORDER BY id DESC
    `
  )

  return result.rows
}

export async function getFarmerById(id: number): Promise<Farmer | null> {
  const result = await pool.query(
    `
    SELECT 
      id,
      name,
      area,
      phone_number,
      description
    FROM farmers
    WHERE id = $1
    `,
    [id]
  )

  if (result.rows.length === 0) {
    return null
  }

  return result.rows[0]
}

export async function createFarmer(data: Omit<Farmer, "id">): Promise<Farmer> {
  const result = await pool.query(
    `
    INSERT INTO farmer (
      name,
      area,
      phone_number
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      name,     
      area,
      phone_number
    `,
    [
      data.name,
      data.area,
      data.phone_number,
    ]
  )

  return result.rows[0]
}

export async function updateFarmer(
  id: number,
  data: Omit<Farmer, "id">
): Promise<Farmer | null> {
  const result = await pool.query(
    `
    UPDATE farmer
    SET
      name = $1,     
      area = $2,
      phone_number = $3,
      description = $4,
    WHERE id = $5
    RETURNING
      id,
      name,
      area,
      phone_number,
      description,
    `,
    [
      data.name,
      data.area,
      data.phone_number,
      data.description,
      id,
    ]
  )

  if (result.rows.length === 0) {
    return null
  }

  return result.rows[0]
}

export async function deleteFarmer(id: number): Promise<boolean> {
  const result = await pool.query(
    `
    DELETE FROM farmers
    WHERE id = $1
    `,
    [id]
  )

  return (result.rowCount ?? 0) > 0
}