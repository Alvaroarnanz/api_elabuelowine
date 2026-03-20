import { Request, Response } from "express"
import {
  createVineyard,
  deleteVineyard,
  getAllVineyards,
  getVineyardById,
  updateVineyard,
} from "../repositories/vineyardsRepository"

export async function getVineyards(_req: Request, res: Response) {
  try {
    const vineyards = await getAllVineyards()
    return res.status(200).json(vineyards)
  } catch (error) {
    console.error("Error obteniendo fincas:", error)
    return res.status(500).json({ message: "Error obteniendo fincas" })
  }
}

export async function getVineyard(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const vineyard = await getVineyardById(id)

    if (!vineyard) {
      return res.status(404).json({ message: "Finca no encontrada" })
    }

    return res.status(200).json(vineyard)
  } catch (error) {
    console.error("Error obteniendo finca:", error)
    return res.status(500).json({ message: "Error obteniendo finca" })
  }
}

export async function postVineyard(req: Request, res: Response) {
  try {
    const {
      name,
      hectares,
      grape_type_id,
      area,
      description,
      has_trellises,
      tractor_access,
      coordinates,
    } = req.body

    if (!name || !hectares || !grape_type_id) {
      return res.status(400).json({
        message: "name, hectares y grape_type_id son obligatorios",
      })
    }

    const vineyard = await createVineyard({
      name,
      hectares: Number(hectares),
      grape_type_id: Number(grape_type_id),
      area: area ?? null,
      description: description ?? null,
      has_trellises: has_trellises ?? null,
      tractor_access: tractor_access ?? null,
      coordinates: coordinates ?? null,
    })

    return res.status(201).json(vineyard)
  } catch (error) {
    console.error("Error creando finca:", error)
    return res.status(500).json({ message: "Error creando finca" })
  }
}

export async function putVineyard(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const {
      name,
      hectares,
      grape_type_id,
      area,
      description,
      has_trellises,
      tractor_access,
      coordinates,
    } = req.body

    if (!name || !hectares || !grape_type_id) {
      return res.status(400).json({
        message: "name, hectares y grape_type_id son obligatorios",
      })
    }

    const vineyard = await updateVineyard(id, {
      name,
      hectares: Number(hectares),
      grape_type_id: Number(grape_type_id),
      area: area ?? null,
      description: description ?? null,
      has_trellises: has_trellises ?? null,
      tractor_access: tractor_access ?? null,
      coordinates: coordinates ?? null,
    })

    if (!vineyard) {
      return res.status(404).json({ message: "Finca no encontrada" })
    }

    return res.status(200).json(vineyard)
  } catch (error) {
    console.error("Error actualizando finca:", error)
    return res.status(500).json({ message: "Error actualizando finca" })
  }
}

export async function removeVineyard(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const deleted = await deleteVineyard(id)

    if (!deleted) {
      return res.status(404).json({ message: "Finca no encontrada" })
    }

    return res.status(200).json({ message: "Finca eliminada correctamente" })
  } catch (error) {
    console.error("Error eliminando finca:", error)
    return res.status(500).json({ message: "Error eliminando finca" })
  }
}