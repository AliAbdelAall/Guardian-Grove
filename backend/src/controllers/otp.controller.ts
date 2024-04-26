import { Request, Response } from "express"
import { prismaClient } from ".."
import { hashSync, compareSync } from "bcryptjs"
import nodemailer from "nodemailer"
import { error } from "console"


export const SaveAndSendOTP =  async (req:Request, res:Response) => {

  try {
    const { email } = req.body
    const profile = await prismaClient.profile.findFirst({where:{email}})
    
    if(!profile){
      return res.status(400).json({error: "Email does not exist"})
    }

    const otp:string = Math.floor(1000 + Math.random() * 9000).toString()

    // const transporter = nodemailer.createTransport({
    //   service: process.env.MAIL_SERVICE,
    //   auth: {
    //     user: process.env.MY_EMAIL,
    //     pass: process.env.MY_PASSWORD
    //   }
    // });

    // const sendOTP = async (email:string, otp:string) => {
    //   const mailOptions = {
    //     from: process.env.OTP_EMAIL,
    //     to: "camavo5002@picdv.com",
    //     subject: 'Password Reset OTP',
    //     html:`<p>Enter <b>${otp}</b> to verify your email and reset your password.<p/>\n<p><b>Expires in 1 Hour</b>.<p/>`
    //   }

    //   await transporter.sendMail(mailOptions)
    // }

    const hashedOTP = hashSync(otp, 10)

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 60)

    const newOTP = await prismaClient.passwordReset.create({
      data:{
        userId: profile.userId,
        otp: hashedOTP,
        createdAt: new Date(),
        expiresAt,
      }
    })
    // if(email){
    //   sendOTP("camavo5002@picdv.com", otp)
    // }

    return res.status(201).json({
      status: "PENDING",
      message: "Verification OTP email sent",
      otp,
    })

  } catch (error) {
    return res.status(500).json({error: "Internal server error!"})
  }
}

export const verifyOTP = async (req:Request, res:Response) => {
  try {
    const { id, userOTP } = req.body
    const otp = await prismaClient.passwordReset.findFirst({where:{userId: id}, orderBy: {createdAt: 'desc'}})
    if(!otp){
      return res.status(400).json({error: "OTP does not exist"})
    }

    const currentTime = new Date().getTime();
    const expirationTime = otp.expiresAt.getTime();

    if(expirationTime < currentTime){
      return res.status(400).json({error: "OTP Expired"})
    }
    if(!compareSync(userOTP, otp.otp)){
      return res.status(400).json({error: "OTP Invalid"})
    }

    return res.status(200).json({message: "OTP verification successful"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "internal server error!"})
  }
}

export const resetPassword = async (req:Request, res:Response) => {

  try {
    const { id, newPassword, confirmNewPassword } = req.body
    
    if(newPassword !== confirmNewPassword){
      return res.status(200).json({message: "Passwords don't match"})
    }
    
    const newHashedPassword = hashSync(newPassword, 10)

    const user = await prismaClient.user.findFirst({where:{id}})
    
    if(!user){
      return res.status(400).json({message: "Invalid user"})
    }

    await prismaClient.user.update({
      where: {
        id
      },
      data: {
        password: newHashedPassword
      }
    })

    return res.status(200).json({message: "Password reset successful"})

  } catch (error) {
    console.log(error)
    return res.status(500).json({error: "internal server error!"})
  }
}




