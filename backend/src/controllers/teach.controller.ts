import { Request, Response } from "express";
import { prismaClient } from "..";


export const addStudent = async (req:Request, res: Response) => {
  try {
    const {id} = req.user!

    const {childId} = req.body

    const teacher = await prismaClient.profile.findFirst({where:{userId:id}, include:{Teacher:true}})


    await prismaClient.child.update({
      where:{id: childId},
      data:{teacherId: teacher?.Teacher?.id}
    })

    await prismaClient.teacher.update({
      where:{profileId: teacher?.id},
      data:{students:{connect: {id: childId}}}
    })

    const updatedTeacher = await prismaClient.teacher.findFirst({where:{profileId: teacher!.id}, include:{students: true}})
    const updatedStudent = await prismaClient.child.findFirst({where:{id:childId}, include:{parent: {include:{profile: true}}}})

    return res.status(200).json({
      message: "student added successfuly",
      teacher: updatedTeacher,
      student: updatedStudent
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "Internal server error!"})
  }
}


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
