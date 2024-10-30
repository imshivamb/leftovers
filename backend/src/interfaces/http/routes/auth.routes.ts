// src/interfaces/http/routes/auth.routes.ts
import { Router, Request, Response } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { TokenService } from "@/infra/services/token.service";

export const createAuthRouter = (authController: AuthController, tokenService: TokenService) => {
   const router = Router();

   // Public Routes
   router.post('/phone', authController.authenticateWithPhone.bind(authController));
   router.post('/social', authController.authenticateWithSocial.bind(authController));
   router.post('/refresh', authController.refreshToken.bind(authController));

   // Protected routes example
   router.get(
       '/me', 
       authMiddleware(tokenService),
       async (req: Request, res: Response): Promise<void> => {
           res.json({ user: req.user });
       }
   );

   return router;
};