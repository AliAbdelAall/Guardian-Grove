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
      return res.status(401).send("Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number }

    if (decoded) {
      const user = await prismaClient.user.findFirst({
        where: {
          id: decoded.id,
        },
      })

      if (user) {
        req.user = { id: user.id }
      }
    }
    next()
  } catch (error) {
    return res.status(401).send("unauthenticated")
  }
}

export default authMiddleware

