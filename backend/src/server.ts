import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import helmet from "helmet";
import { connectDb } from "./config/database";
import { redisClient } from "./config/redis.config";
import mongoose from "mongoose";
import { Server } from "http";

dotenv.config();

const app: Application = express();
let server: Server;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Health check endpoint
app.get("/health", (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
        redisStatus: redisClient.status === 'ready' ? 'connected' : 'disconnected'
    };
    res.status(200).json(healthcheck);
});

// Basic Route
app.get("/", (req, res) => {
    res.send("Leftovers Dating App!");
});

// Graceful shutdown handler
const gracefulShutdown = (signal: string) => {
    return async () => {
        console.log(`${signal} received. Starting graceful shutdown...`);
        
        // Close server first
        server.close(() => {
            console.log('HTTP server closed');
            
            // Then close database connections
            Promise.all([
                mongoose.connection.close(),
                redisClient.quit()
            ]).then(() => {
                console.log('Database connections closed');
                process.exit(0);
            }).catch((err) => {
                console.error('Error during shutdown:', err);
                process.exit(1);
            });
        });
    };
};

// Start server
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDb();
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        // Handle graceful shutdown
        process.on('SIGTERM', gracefulShutdown('SIGTERM'));
        process.on('SIGINT', gracefulShutdown('SIGINT'));

        return server;
    }
    catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

startServer();