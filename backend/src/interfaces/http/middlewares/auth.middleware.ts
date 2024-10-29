import { Request, Response, NextFunction } from 'express';
import { TokenService } from '@/infra/services/token.service';
import { JWTPayload } from '@/core/types/auth.types';

export const authMiddleware = (tokenService: TokenService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = tokenService.verifyAccessToken(token) as JWTPayload;
      
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};