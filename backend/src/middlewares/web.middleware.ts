import { Request, Response, NextFunction} from "express"
import { prismaClient } from ".."

export const webMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.user!

    const user = await prismaClient.user.findFirst({where:{id}})

    if(!user || [2,3].includes(user.roleId)){
      return res.status(401).send("unauthorized")
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal server error")
  }
}

export default webMiddleware