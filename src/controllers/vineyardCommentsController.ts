import { Request, Response } from "express"
import {
  createVineyardComment,
  getCommentsByVineyardId,
  updateVineyardComment,
  deleteVineyardComment,
} from "../repositories/vineyardCommentsRepository"

export async function getVineyardComments(req: Request, res: Response) {
  try {
    const vineyardId = Number(req.params.id)

    if (Number.isNaN(vineyardId)) {
      return res.status(400).json({ message: "ID de finca inválido" })
    }

    const comments = await getCommentsByVineyardId(vineyardId)
    return res.status(200).json(comments)
  } catch (error) {
    console.error("Error obteniendo comentarios:", error)
    return res.status(500).json({ message: "Error obteniendo comentarios" })
  }
}

export async function postVineyardComment(req: Request, res: Response) {
  try {
    const vineyardId = Number(req.params.id)
    const userId = req.user?.id
    const { comment_text } = req.body

    if (Number.isNaN(vineyardId)) {
      return res.status(400).json({ message: "ID de finca inválido" })
    }

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" })
    }

    if (!comment_text || !String(comment_text).trim()) {
      return res.status(400).json({ message: "El comentario es obligatorio" })
    }

    const comment = await createVineyardComment({
      vineyard_id: vineyardId,
      user_id: userId,
      comment_text: String(comment_text).trim(),
    })

    return res.status(201).json(comment)
  } catch (error) {
    console.error("Error creando comentario:", error)
    return res.status(500).json({ message: "Error creando comentario" })
  }
}

export async function updateVineyardCommentController(
  req: Request,
  res: Response
) {
  try {
    const commentId = Number(req.params.commentId)
    const { comment_text } = req.body

    if (!comment_text || !String(comment_text).trim()) {
      return res.status(400).json({ message: "Comentario vacío" })
    }

    const updated = await updateVineyardComment(
      commentId,
      String(comment_text).trim()
    )

    return res.status(200).json(updated)

  } catch (error) {
    console.error("Error actualizando comentario:", error)
    return res.status(500).json({ message: "Error actualizando comentario" })
  }
}

export async function deleteVineyardCommentController(
  req: Request,
  res: Response
) {
  try {
    const commentId = Number(req.params.commentId)

    await deleteVineyardComment(commentId)

    return res.status(204).send()

  } catch (error) {
    console.error("Error borrando comentario:", error)
    return res.status(500).json({ message: "Error borrando comentario" })
  }
}