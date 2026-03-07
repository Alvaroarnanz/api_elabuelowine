import { Request, Response } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"

export function login(req: Request, res: Response) {
  const { username, password } = req.body

  if (username !== "admin" || password !== "1234") {
    return res.status(401).json({
      message: "Usuario o contraseña incorrectos",
    })
  }

  const user = {
    username: "admin",
    role: "admin",
  }

  const token = jwt.sign(user, JWT_SECRET, { expiresIn: "1h" })

  return res.status(200).json({
    message: "Login correcto",
    token,
    user,
  })
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