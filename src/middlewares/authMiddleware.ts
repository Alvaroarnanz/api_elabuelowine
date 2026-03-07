import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "default_secret"

type JwtPayload = {
  username: string
  role: string
  iat?: number
  exp?: number
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      message: "Token no proporcionado",
    })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
    req.user = decoded
    next()
  } catch {
    return res.status(403).json({
      message: "Token inválido o expirado",
    })
  }
}