import { pool } from "../config/db"

export type VineyardWorkLog = {
  id: number
  vineyard_id: number
  user_id: number
  username: string
  work_date: string
  hours_worked: number
  activity_type_id: number
  activity_name: string
  notes: string | null
  created_at: string
}

export async function getWorkLogsByVineyardId(
  vineyardId: number
): Promise<VineyardWorkLog[]> {
  const result = await pool.query(
    `
    SELECT
      vwl.id,
      vwl.vineyard_id,
      vwl.user_id,
      u.username,
      vwl.work_date,
      vwl.hours_worked,
      vwl.activity_type_id,
      wat.name AS activity_name,
      vwl.notes,
      vwl.created_at
    FROM vineyard_work_logs vwl
    INNER JOIN app_users u ON u.id = vwl.user_id
    INNER JOIN work_activity_types wat ON wat.id = vwl.activity_type_id
    WHERE vwl.vineyard_id = $1
    ORDER BY vwl.work_date DESC, vwl.created_at DESC
    `,
    [vineyardId]
  )

  return result.rows
}

export async function createVineyardWorkLog(params: {
  vineyard_id: number
  user_id: number
  work_date: string
  hours_worked: number
  activity_type_id: number
  notes: string | null
}) {
  const result = await pool.query(
    `
    INSERT INTO vineyard_work_logs (
      vineyard_id,
      user_id,
      work_date,
      hours_worked,
      activity_type_id,
      notes
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING
      id,
      vineyard_id,
      user_id,
      work_date,
      hours_worked,
      activity_type_id,
      notes,
      created_at
    `,
    [
      params.vineyard_id,
      params.user_id,
      params.work_date,
      params.hours_worked,
      params.activity_type_id,
      params.notes,
    ]
  )

  return result.rows[0]
}

export async function updateVineyardWorkLog(
  logId: number,
  params: {
    work_date: string
    hours_worked: number
    activity_type_id: number
    notes: string | null
  }
) {
  const result = await pool.query(
    `
    UPDATE vineyard_work_logs
    SET
      work_date = $1,
      hours_worked = $2,
      activity_type_id = $3,
      notes = $4,
      updated_at = NOW()
    WHERE id = $5
    RETURNING *
    `,
    [
      params.work_date,
      params.hours_worked,
      params.activity_type_id,
      params.notes,
      logId,
    ]
  )

  return result.rows[0]
}

export async function deleteVineyardWorkLog(logId: number) {
  await pool.query(
    `DELETE FROM vineyard_work_logs WHERE id = $1`,
    [logId]
  )
}