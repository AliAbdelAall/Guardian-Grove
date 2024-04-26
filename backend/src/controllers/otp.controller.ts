import { Request, Response } from "express"
import { prismaClient } from ".."
import { hashSync, compareSync } from "bcryptjs"
import nodemailer from "nodemailer"


export const SaveAndSendOTP =  async (req:Request, res:Response) => {

  try {
    const { id } = req.user!
    const profile = await prismaClient.profile.findFirst({where:{userId: id}})
    const email = profile?.email

    const otp:string = Math.floor(1000 + Math.random() * 9000).toString()

    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD
      }
    });

    const sendOTP = async (email:string, otp:string) => {
      const mailOptions = {
        from: process.env.OTP_EMAIL,
        to: "camavo5002@picdv.com",
        subject: 'Password Reset OTP',
        html:`<p>Enter <b>${otp}</b> to verify your email and reset your password.<p/>\n<p><b>Expires in 1 Hour</b>.<p/>`
      }

      await transporter.sendMail(mailOptions)
    }

    const hashedOTP = hashSync(otp, 10)

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 60)

    const newOTP = await prismaClient.passwordReset.create({
      data:{
        userId: 1,
        otp: hashedOTP,
        createdAt: new Date(),
        expiresAt,
      }
    })
    if(email){
      sendOTP("camavo5002@picdv.com", otp)
    }

    return res.status(201).json({
      status: "PENDING",
      message: "Verification OTP email sent",
      receiver: email
    })

  } catch (error) {
    return res.status(500).json({error: "Internal server error!"})
  }
}




