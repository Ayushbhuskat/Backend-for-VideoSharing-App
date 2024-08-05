import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config()
connectDB()
.then(()=>{
    app.listen(process.env.port || 8000, () =>{
        console.log(`server is running at port : ${process.env.port}`);
        
    })
})
.catch((err)=>{
    console.log("mongodb connection error ",err);
    
})