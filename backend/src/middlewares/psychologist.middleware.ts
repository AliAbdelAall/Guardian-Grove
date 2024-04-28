import { Request, Response, NextFunction } from "express"
import { prismaClient } from ".."

const psychologistMiddleware = async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { id } = req.user!
 
    const user = await prismaClient.user.findFirst({where:{id}})

    if(!user || user.roleId !== 3){
      return res.status(401).send("unauthorized")
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send("Internal server error")
  }
}

export default psychologistMiddleware