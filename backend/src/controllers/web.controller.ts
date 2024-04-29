import { Request, Response } from "express"
import { prismaClient } from ".."

export const checkRole = async (req:Request, res:Response) => {
  try {
    const {id} = req.user!

    const user = await prismaClient.user.findFirst({where: {id}, include:{ role: true }})
    
    return res.status(200).json({role: user?.role.name})

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal server error!"})
  }
}