import { Request, Response } from "express"
import { prismaClient } from ".."

export const getClients = async (req:Request, res:Response) => {
  try {
    const {id} = req.user!

    const profile = await prismaClient.profile.findFirst({
      where:{
        userId: id
      }, 
      include:{
        Psychologist:{
          include:{
            clients: {
              include:{
                profile: true,
                children: true
              }
            }
          }
        }
      }
    })
    if(!profile || !profile.Psychologist){
      return res.status(400).json({error: "Unauthenticated"})
    }
    const clients = profile.Psychologist.clients
    
    return res.status(200).json({
      clients,
    })
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal server error!"})
  }
}