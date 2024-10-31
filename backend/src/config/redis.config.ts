import { Redis } from 'ioredis';

const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    },
    maxRetriesPerRequest: 3,
    enableAutoPipelining: true,
    showFriendlyErrorStack: true,
    commandTimeout: 5000,
});

// Improved error handling and logging with proper typing
redisClient.on('error', (err: Error) => {
    console.error('Redis Client Error:', err.message);
    if (err.message.includes('NOAUTH')) {
        console.error('Redis authentication failed. Please check REDIS_PASSWORD in .env file');
    }
});

redisClient.on('connect', () => {
    console.log('Redis client connected to the server');
});

redisClient.on('ready', () => {
    console.log('Redis client is ready to accept commands');
});

// Test connection function with proper error typing
const testRedisConnection = async (): Promise<void> => {
    try {
        await redisClient.ping();
        console.log('✓ Redis connection test successful');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('✗ Redis connection test failed:', error.message);
        } else {
            console.error('✗ Redis connection test failed with unknown error');
        }
        throw error;
    }
};

// Export both the client and the test function
export { redisClient, testRedisConnection };