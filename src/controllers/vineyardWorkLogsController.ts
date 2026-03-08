import { Request, Response } from "express"
import {
  createVineyardWorkLog,
  getWorkLogsByVineyardId,
} from "../repositories/vineyardWorkLogsRepository"

export async function getVineyardWorkLogs(req: Request, res: Response) {
  try {
    const vineyardId = Number(req.params.id)

    if (Number.isNaN(vineyardId)) {
      return res.status(400).json({ message: "ID de finca inválido" })
    }

    const logs = await getWorkLogsByVineyardId(vineyardId)
    return res.status(200).json(logs)
  } catch (error) {
    console.error("Error obteniendo histórico de trabajo:", error)
    return res.status(500).json({ message: "Error obteniendo histórico de trabajo" })
  }
}

export async function postVineyardWorkLog(req: Request, res: Response) {
  try {
    const vineyardId = Number(req.params.id)
    const userId = req.user?.id

    const {
      work_date,
      hours_worked,
      activity_type_id,
      notes,
    } = req.body

    if (Number.isNaN(vineyardId)) {
      return res.status(400).json({ message: "ID de finca inválido" })
    }

    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" })
    }

    if (!work_date || !hours_worked || !activity_type_id) {
      return res.status(400).json({
        message: "work_date, hours_worked y activity_type_id son obligatorios",
      })
    }

    const log = await createVineyardWorkLog({
      vineyard_id: vineyardId,
      user_id: userId,
      work_date,
      hours_worked: Number(hours_worked),
      activity_type_id: Number(activity_type_id),
      notes: notes ?? null,
    })

    return res.status(201).json(log)
  } catch (error) {
    console.error("Error creando histórico de trabajo:", error)
    return res.status(500).json({ message: "Error creando histórico de trabajo" })
  }
}