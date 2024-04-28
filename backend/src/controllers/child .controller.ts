import { Request, Response } from "express";
import { prismaClient } from "..";

export const addChild = async (req: Request, res:Response) => {
  try {
    const {id} = req.user!
    const { name, dob, profilePic } = req.body
    
    const parent = await prismaClient.profile.findFirst({where:{userId:id}, include:{parent: true}})

    const child = await prismaClient.child.create({
      data:{
        name,
        dob: new Date(dob),
        profilePic,
        parentId: parent?.parent?.id,
      }
    })

    await prismaClient.parent.update({
      where:{profileId: parent?.id},
      data:{children:{connect:{id: child.id}}}
    })

    return res.status(201).json({
      message: "child profile created successfully",
      child,  
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal server error!"})
  }
}