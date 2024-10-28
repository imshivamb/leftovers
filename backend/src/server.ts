import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import helmet from "helmet";
import { connectDb } from "./config/database";

dotenv.config();

const app: Application = express();

// Middleware

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



// Basic ROute
app.get("/", (req, res) => {
    res.send("Maaya Dating App!");
})

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer()