import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { findUserByUsername } from "../repositories/userRepository"

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"

export async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        message: "Usuario y contraseña son obligatorios",
      })
    }

    const dbUser = await findUserByUsername(username)

    if (!dbUser) {
      return res.status(401).json({
        message: "Usuario o contraseña incorrectos",
      })
    }

    const isPasswordValid = await bcrypt.compare(password, dbUser.password_hash)

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Usuario o contraseña incorrectos",
      })
    }

    const user = {
      id: dbUser.id,
      username: dbUser.username,
      role: dbUser.role,
    }

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" })

    return res.status(200).json({
      message: "Login correcto",
      token,
      user,
    })
  } catch (error) {
    console.error("Error en login:", error)
    return res.status(500).json({
      message: "Error interno del servidor",
    })
  }
}

export function logout(_req: Request, res: Response) {
  return res.status(200).json({
    message: "Logout correcto",
  })
}

export function me(req: Request, res: Response) {
  return res.status(200).json({
    user: req.user,
  })
}