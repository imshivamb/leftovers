import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from '@/infra/services/redis.service';

export const authLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args: string[]) => redis.sendCommand(args)
    }),
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 5,
    message: 'Too many authentication attempts, please try again later',

})

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
})