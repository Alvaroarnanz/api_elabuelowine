import { pool } from "../config/db"

export type Vineyard = {
  id: number
  name: string
  square_meters: number
  grape_type_id: number
  area: string | null
  description: string | null
  has_trellises: boolean | null
  tractor_access: boolean | null
}

export async function getAllVineyards(): Promise<Vineyard[]> {
  const result = await pool.query(
    `
    SELECT 
      id,
      name,
      square_meters,
      grape_type_id,
      area,
      description,
      has_trellises,
      tractor_access
    FROM vineyards
    ORDER BY id DESC
    `
  )

  return result.rows
}

export async function getVineyardById(id: number): Promise<Vineyard | null> {
  const result = await pool.query(
    `
    SELECT 
      id,
      name,
      square_meters,
      grape_type_id,
      area,
      description,
      has_trellises,
      tractor_access
    FROM vineyards
    WHERE id = $1
    `,
    [id]
  )

  if (result.rows.length === 0) {
    return null
  }

  return result.rows[0]
}

export async function createVineyard(data: Omit<Vineyard, "id">): Promise<Vineyard> {
  const result = await pool.query(
    `
    INSERT INTO vineyards (
      name,
      square_meters,
      grape_type_id,
      area,
      description,
      has_trellises,
      tractor_access
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING
      id,
      name,
      square_meters,
      grape_type_id,
      area,
      description,
      has_trellises,
      tractor_access
    `,
    [
      data.name,
      data.square_meters,
      data.grape_type_id,
      data.area,
      data.description,
      data.has_trellises,
      data.tractor_access,
    ]
  )

  return result.rows[0]
}

export async function updateVineyard(
  id: number,
  data: Omit<Vineyard, "id">
): Promise<Vineyard | null> {
  const result = await pool.query(
    `
    UPDATE vineyards
    SET
      name = $1,
      square_meters = $2,
      grape_type_id = $3,
      area = $4,
      description = $5,
      has_trellises = $6,
      tractor_access = $7
    WHERE id = $8
    RETURNING
      id,
      name,
      square_meters,
      grape_type_id,
      area,
      description,
      has_trellises,
      tractor_access
    `,
    [
      data.name,
      data.square_meters,
      data.grape_type_id,
      data.area,
      data.description,
      data.has_trellises,
      data.tractor_access,
      id,
    ]
  )

  if (result.rows.length === 0) {
    return null
  }

  return result.rows[0]
}

export async function deleteVineyard(id: number): Promise<boolean> {
  const result = await pool.query(
    `
    DELETE FROM vineyards
    WHERE id = $1
    `,
    [id]
  )

  return (result.rowCount ?? 0) > 0
}