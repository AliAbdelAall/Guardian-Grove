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

    await prismaClient.user.create({
      data:{
        username,
        password: hashSync(password, 10),
        roleId,
        profile:{
          create:{
            firstName,
            lastName,
            email,
            dob: null,
            speciality: null,
            yearsOfExperience: null,
            school: null,
            
          }
        }
      }  
    })
    
    user = await prismaClient.user.findFirst({where: {username}, include:{profile:true }})

    return res.json({user})
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({error: "Internal server error!"})
  }
}


