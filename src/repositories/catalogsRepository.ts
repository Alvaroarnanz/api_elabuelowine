import { pool } from "../config/db"

export type GrapeVariety = {
  id: number
  grape: string
  description: string | null
}

export type Product = {
  id: number
  product: string
  category: string | null
  color: string | null
}

export async function getAllGrapeVarieties(): Promise<GrapeVariety[]> {
  const result = await pool.query(
    `
    SELECT id, grape, description
    FROM grape_variety
    ORDER BY grape ASC
    `
  )

  return result.rows
}

export async function getAllProducts(): Promise<Product[]> {
  const result = await pool.query(
    `
    SELECT id, product, category, color
    FROM products
    ORDER BY id ASC
    `
  )

  return result.rows
}