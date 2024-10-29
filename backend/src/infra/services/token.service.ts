import jwt from 'jsonwebtoken';
import config from '@/config/config'
import { JWTPayload } from '@/core/types/auth.types';

export class TokenService {
    generateTokens(userId: string) {
        const accessToken = jwt.sign(
            { userId } as JWTPayload, 
            config.jwt.accessSecret, 
            { expiresIn: '1h' });

        const refreshToken = jwt.sign(
            { userId } as JWTPayload,
            config.jwt.refreshSecret,
            { expiresIn: '7d' }
          );

          return { accessToken, refreshToken };
    }

    verifyAccessToken(token: string): JWTPayload {
        return jwt.verify(token, config.jwt.accessSecret) as JWTPayload;
    }

    verifyRefreshToken(token: string): JWTPayload {
        return jwt.verify(token, config.jwt.refreshSecret) as JWTPayload;
    }
}