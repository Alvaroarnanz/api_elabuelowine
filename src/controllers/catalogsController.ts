import { Request, Response } from "express"
import {
  getAllGrapeVarieties,
  getAllProducts,
  getAllWorkActivityTypes,
} from "../repositories/catalogsRepository"

export async function getGrapeVarieties(_req: Request, res: Response) {
  try {
    const grapeVarieties = await getAllGrapeVarieties()
    return res.status(200).json(grapeVarieties)
  } catch (error) {
    console.error("Error obteniendo tipos de uva:", error)
    return res.status(500).json({
      message: "Error obteniendo tipos de uva",
    })
  }
}

export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await getAllProducts()
    return res.status(200).json(products)
  } catch (error) {
    console.error("Error obteniendo productos:", error)
    return res.status(500).json({
      message: "Error obteniendo productos",
    })
  }
}

export async function getWorkActivityTypes(_req: Request, res: Response) {
  try {
    const activityTypes = await getAllWorkActivityTypes()
    return res.status(200).json(activityTypes)
  } catch (error) {
    console.error("Error obteniendo actividades:", error)
    return res.status(500).json({
      message: "Error obteniendo actividades",
    })
  }
}