import { Request, Response } from "express"
import {
  createVineyardComment,
  getCommentsByVineyardId,
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