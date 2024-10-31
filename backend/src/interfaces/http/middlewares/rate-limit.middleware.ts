import { Request, Response, NextFunction } from "express";
import { RedisService } from "@/infra/services/redis.service";

const redisService = new RedisService();

export const createRateLimiter = (
    prefix: string,
    limit: number,
    windowSeconds: number
) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const key = `${prefix}:${req.ip}`;
            const count = await redisService.incrementCounter(key, windowSeconds);

            if(count > limit) {
                return res.status(429).json({
                    message: 'Too many requests, please try again later',
                    retryAfter: windowSeconds
                })
            }
            // Add rate limit info to response headers
            res.setHeader('X-RateLimit-Limit', limit);
            res.setHeader('X-RateLimit-Remaining', limit - count);

            next();
        } catch (error) {
            next(error)
        }
    }
}

// Pre-configured rate limiters
export const authLimiter = createRateLimiter('auth', 5, 900);
export const generalLimiter = createRateLimiter('general', 100, 60)