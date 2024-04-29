import { Request, Response } from "express"
import { prismaClient } from ".."

export const checkRole = async (req:Request, res:Response) => {
  try {
    const {id} = req.user!

    const user = await prismaClient.user.findFirst({where: {id}, include:{ 
      role: true
    }})

    if (user?.roleId === 3){
      const psychologist =  await prismaClient.profile.findFirst({where:{userId: user.id}, include:{Psychologist:true}})
      return res.status(200).json({
        userRole: user?.role.name,
        profile: psychologist
      })
    }
    if (user?.roleId === 2){
      const teacher = await prismaClient.profile.findFirst({where:{userId: user.id}, include:{Teacher:true}})
      return res.status(200).json({
        userRole: user?.role.name,
        profile: teacher
      })
    }

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal server error!"})
  }
}