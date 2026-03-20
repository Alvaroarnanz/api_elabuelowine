import { Request, Response } from "express"
import {
  createFarmer,
  deleteFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmer,
} from "../repositories/farmersRepository"

export async function getFarmers(_req: Request, res: Response) {
  try {
    const Farmers = await getAllFarmers()
    return res.status(200).json(Farmers)
  } catch (error) {
    console.error("Error obteniendo Agricultores:", error)
    return res.status(500).json({ message: "Error obteniendo Agricultores" })
  }
}

export async function getFarmer(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const Farmer = await getFarmerById(id)

    if (!Farmer) {
      return res.status(404).json({ message: "Agricultor no encontrado" })
    }

    return res.status(200).json(Farmer)
  } catch (error) {
    console.error("Error obteniendo Agricultor:", error)
    return res.status(500).json({ message: "Error obteniendo Agricultor" })
  }
}

export async function postFarmer(req: Request, res: Response) {
  try {
    const {
      name,
      area,
      phone_number,
      description,
    } = req.body

    if (!name) {
      return res.status(400).json({
        message: "nombre es obligatorio",
      })
    }

    const Farmer = await createFarmer({
      name,
      area: area ?? null,
      phone_number: phone_number ?? null,
      description: description ?? null,
    })

    return res.status(201).json(Farmer)
  } catch (error) {
    console.error("Error creando Agricultor:", error)
    return res.status(500).json({ message: "Error creando Agricultor" })
  }
}

export async function putFarmer(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const {
      name,
      area,
      phone_number,
      description,
    } = req.body

    if (!name ) {
      return res.status(400).json({
        message: "nombre es obligatorio",
      })
    }

    const Farmer = await updateFarmer(id, {
      name,
      area: area ?? null,
      phone_number: phone_number ?? null,
      description: description ?? null,
    })

    if (!Farmer) {
      return res.status(404).json({ message: "Agricultor no encontrado" })
    }

    return res.status(200).json(Farmer)
  } catch (error) {
    console.error("Error actualizando Agricultor:", error)
    return res.status(500).json({ message: "Error actualizando Agricultor" })
  }
}

export async function removeFarmer(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" })
    }

    const deleted = await deleteFarmer(id)

    if (!deleted) {
      return res.status(404).json({ message: "Agricultor no encontrado" })
    }

    return res.status(200).json({ message: "Agricultor eliminado correctamente" })
  } catch (error) {
    console.error("Error eliminando Agricultor:", error)
    return res.status(500).json({ message: "Error eliminando Agricultor" })
  }
}