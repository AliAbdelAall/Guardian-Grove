import express, {Express} from "express"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import rootRouter from "./Routes/index.routes"
import cors from"cors"

const app:Express = express()

dotenv.config()
const port = process.env.PORT

app.use(cors())
app.use(express.json())

app.use("/api", rootRouter)

export const prismaClient = new PrismaClient({
  log:['query']
})

app.listen(port, () => {
  console.log(`app is working on port ${port}`)
})