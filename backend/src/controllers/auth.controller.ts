import { Request, Response } from "express"
import { prismaClient } from ".."
import { hashSync, compareSync } from "bcryptjs"
import jwt from "jsonwebtoken"


export const signup = async (req:Request, res:Response) => {
  try {
    const { firstName, lastName, username, email, password, roleId } = req.body

     if (![1, 2, 3].includes(roleId)) {
      return res.status(401).json({ error: "Unauthourized" });
    }

    let user = await prismaClient.user.findFirst({where: {username}})
    let profile = await prismaClient.profile.findFirst({where: {email}})

    if(user){
      return res. status(400).json({error: "Username already exist!"})
    }

    if(profile){
      return res. status(400).json({error: "Email already exist!"})
    }

    const newUser = await prismaClient.user.create({
      data:{
        username,
        password: hashSync(password, 10),
        roleId,
        profile:{
          create:{
            firstName,
            lastName,
            email,
            profilePic: "default-profile.png",
            dob: null,
            ...(roleId === 1 && {
              parent:{
                create:{
                  children: {},
                  psychologists: {}
                }
              }
            }),
            ...(roleId === 2 && {
              Teacher:{
                create:{
                  school: null,
                  students: {}
                }
              }
            }),
            ...(roleId === 3 && {
              Psychologist:{
                create:{
                  speciality: null,
                  yearsOfExperience: null,
                  clients:{},
                }
              }
            })
            
          }
        }
      },
      include:{
        profile:{ 
          include:{
            ...(roleId === 1 && {parent: true}),
            ...(roleId === 2 && {Teacher: true}),
            ...(roleId === 3 && {Psychologist: true})
          }
        }
      }
    })
    
    
    user = await prismaClient.user.findFirst({where: {username}, include:{profile:true }})

    const token = jwt.sign({id: user!.id}, process.env.JWT_SECRET!)

    return res.status(201).json({
      message: "user created successfully", 
      token,
    })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({error: "Internal server error!"})
  }
}


export const login = async (req:Request, res:Response) => {
  try {
    const { username, password } = req.body

    const user = await prismaClient.user.findFirst({where: {username}})

    if(!user){
      return res.status(400).json({error: "Incorrect username/password!"})
    }

    if (!compareSync(password, user.password)){
      return res.status(400).json({error: "Incorrect username/password!"})
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET!)

    return res.status(200).json({message:"Login successful", token,})

  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({error: "Internal server error!"})
  }
}
