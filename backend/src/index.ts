import express, {Express, Request, Response} from "express"
import dotenv from "dotenv"

const app:Express = express()
dotenv.config()
const port = process.env.PORT

app.get("/", (req:Request, res:Response) => {
  res.send("working")
})

app.listen(port, () => {
  console.log(`app is working on port ${port}`)
})