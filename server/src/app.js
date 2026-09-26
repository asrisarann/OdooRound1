import "dotenv/config";
import express from "express" 
import cors from "cors"
import authRouter from "./auth.js";



const app = express() 
app.use(cors())
app.use(express.json()) 
app.use("/api/auth", authRouter);

app.get('/' , (req , res)=>{
    return res.send({message : "Server alive"}) ;
})

export default app ;