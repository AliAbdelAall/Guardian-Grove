import { Request, Response } from "express";
import { prismaClient } from "..";


export const getStudents = async (req:Request, res: Response) => {
  try {
    const {id} = req.user!

    const teacher = await prismaClient.profile.findFirst({where:{userId:id}, include:{Teacher:{include:{students: {include: {parent: {include:{profile: true}}}}}}}})

    return res.status(200).json({students: teacher?.Teacher?.students})

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal server error!"})
  }
}
