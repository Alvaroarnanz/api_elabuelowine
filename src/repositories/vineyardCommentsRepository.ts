import { pool } from "../config/db"

export type VineyardComment = {
  id: number
  vineyard_id: number
  user_id: number
  username: string
  comment_text: string
  created_at: string
}

export async function getCommentsByVineyardId(
  vineyardId: number
): Promise<VineyardComment[]> {
  const result = await pool.query(
    `
    SELECT
      vc.id,
      vc.vineyard_id,
      vc.user_id,
      u.username,
      vc.comment_text,
      vc.created_at
    FROM vineyard_comments vc
    INNER JOIN app_users u ON u.id = vc.user_id
    WHERE vc.vineyard_id = $1
    ORDER BY vc.created_at DESC
    `,
    [vineyardId]
  )

  return result.rows
}

export async function createVineyardComment(params: {
  vineyard_id: number
  user_id: number
  comment_text: string
}) {
  const result = await pool.query(
    `
    INSERT INTO vineyard_comments (
      vineyard_id,
      user_id,
      comment_text
    )
    VALUES ($1, $2, $3)
    RETURNING id, vineyard_id, user_id, comment_text, created_at
    `,
    [params.vineyard_id, params.user_id, params.comment_text]
  )

  return result.rows[0]
}