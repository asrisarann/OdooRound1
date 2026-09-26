import "dotenv/config";
import express from "express" 
import cors from "cors"

const app = express() 
app.use(cors())
app.use(express.json()) 

app.get('/' , (req , res)=>{
    return res.send({message : "Server alive"}) ;
})

export default app ;