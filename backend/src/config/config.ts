import dotenv from "dotenv";


dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongodb: {
        uri: process.env.MONGODB_URI || "mongodb://localhost:27017/leftovers"
    },
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET!,
        refreshSecret: process.env.JWT_REFRESH_SECRET!,
        accessExpiration: '1h',
        refreshExpiration: '7d'
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD
    },
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID!,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!
    }
};

// Validate required environment variables
const requiredEnvVars = [
    'JWT_ACCESS_SECRET',
    'JWT_REFRESH_SECRET',
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ];
  
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar}`);
    }
  });

  export default config