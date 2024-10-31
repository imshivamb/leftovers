import {Redis} from 'ioredis';

const redisClient  = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD,
    retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
})
redisClient.on('connect', () => {
    console.log('Redis client connected to the server');
})

export { redisClient}