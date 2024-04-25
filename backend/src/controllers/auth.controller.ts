import { Request, Response } from "express"
import { prismaClient } from ".."
import { hashSync } from "bcryptjs"
import { Profile } from "@prisma/client"

//  Adjust query for user 
export const signup = async (req:Request, res:Response) => {
  try {
    const { firstName, lastName, username, email, password, roleId } = req.body

    if (roleId === 4){
      return res.status(401).json("Unauthorized")
    }

    let user = await prismaClient.user.findFirst({where: {username}})

    if(user){
      return res.json({error: "User already exist!"})
    }

    const newUser = await prismaClient.user.create({
      data:{
        username,
        password: hashSync(password, 10),
        roleId,
        
      }  
    })

    const profile = await prismaClient.profile.create({
      data:{
        userId: newUser.id,
        firstName,
        lastName,
        email,
        dob: null,
        speciality: null,
        yearsOfExperience: null,
        school: null
      }
    })
    return res.json({...newUser, profile,})
  } catch (error) {
    return res.status(500).json({error: "Internal server error!"})
  }
}