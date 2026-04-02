import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './utils/db.js';
import authRoutes from './routes/auth.routes.js';


dotenv.config();

const app = express();
connectDB();

app.use(express.json());

app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"OK",
        message:"Server is UP"
    });
});

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({
        message:"Internal server error",
    });
});

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server listening at ${PORT}`);
});

app.use("/auth",authRoutes);