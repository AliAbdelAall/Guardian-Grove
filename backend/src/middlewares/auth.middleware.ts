import { Request, Response, NextFunction } from "express"
import { prismaClient } from ".."
import jwt from "jsonwebtoken"


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
      };
    }
  }
}

const authMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return res.status(400).send("Invalid user");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }

    if (!decoded) {
      return res.status(401).send("Unauthenticated");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: decoded.id,
      },
    })

    if (!user) {
      return res.status(401).send("Unauthenticated");
    }

    req.user = { id: user.id }
    next()
  } catch (error) {
    return res.status(401).send("Unauthenticated")
  }
}

export default authMiddleware

