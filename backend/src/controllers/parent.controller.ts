import { Request, Response } from "express"
import { prismaClient } from ".."

export const connectParentPsychologist = async (req:Request, res:Response) => {
  try {
    const {id} = req.user!
    const { psychologistId } = req.body

    const parent = await prismaClient.profile.findFirst({where:{userId: id}, include:{parent:true}})
    
    const psychologist =  await prismaClient.profile.findFirst({where:{id: psychologistId}, include:{Psychologist: true}})
    if(!psychologist){
      return res.status(400).json({message: 'Invalid psychologist!'})
    }

    await prismaClient.parent.update({
      where: { profileId: parent!.id },
      data: { psychologists: { connect: { id: psychologist.id } } },
    })

    await prismaClient.psychologist.update({
      where: { profileId: psychologist.id },
      data: { clients: { connect: { id: parent!.id } } },
    })

    const updatedParent = await prismaClient.parent.findFirst({where:{profileId: parent!.id}, include:{psychologists:true}})
    const updatedPsychologist = await prismaClient.psychologist.findFirst({where:{profileId:psychologist.id}, include:{clients:true}})

    return res.status(200).json({
      parent: updatedParent,
      psychologist: updatedPsychologist
    })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({error: "Internal server error!"})
  }
}