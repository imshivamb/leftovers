import { redisClient } from "@/config/redis.config";

export class RedisService {
    private redis = redisClient;

    async set(key: string, value: any, expirySeconds?:  number): Promise<void> {
        try {
            const stringValue = JSON.stringify(value);
            if(expirySeconds) {
                await this.redis.setex(key, expirySeconds, stringValue);
            } else {
                await this.redis.set(key, stringValue)
            }
        } catch (error) {
            console.error('Redis Set Error:', error);
            throw error;
        }
    }

    async get<T>(key: string): Promise<T | null> {
        try {
          const value = await this.redis.get(key);
          if (!value) return null;
          return JSON.parse(value) as T;
        } catch (error) {
          console.error('Redis Get Error:', error);
          throw error;
        }
    }

    async del(key: string): Promise<void> {
        try {
            await this.redis.del(key);
        } catch (error) {
            console.error('Redis Delete Error:', error);
          throw error;
        }
    }

    // Rate Limiting Methods
    async incrementCounter(key: string, expirySeconds: number): Promise<number> {
        const multi = this.redis.multi();
        multi.incr(key);
        multi.expire(key, expirySeconds);
        const results = await multi.exec();
        return results?.[0]?.[1] as number
    }

    async getRemainingAttempts(key: string, limit: number): Promise<number> {
        const count = await this.redis.get(key);
        return limit - (count ? parseInt(count) : 0);
    }

    // Store OTP
    async storeOTP(phoneNumber: string, otp: string): Promise<void> {
         // OTP expires in 10 minutes
         await this.redis.setex(`otp:${phoneNumber}`, 600, otp);
    }

    //Verify OTP
    async verifyOTP(phoneNumber: string, otp: string): Promise<boolean> {
        const storedOTP = await this.redis.get(`otp:${phoneNumber}`);
        return storedOTP === otp
    }

    //Store User Session
    async storeUserSession(userId: string, token: string): Promise<void> {
        // Session expires in 7 days
        await this.redis.setex(`session:${userId}`, 604800, token);
    }

    // Check if session is valid
    async checkUserSession(userId: string, token: string): Promise<boolean> {
        const storedToken = await this.redis.get(`session:${userId}`);
        return storedToken === token
    }

    //INvalidate session on Logout
    async invalidateUserSession(userId: string): Promise<void> {
        await this.redis.del(`session:${userId}`);
    }
}