import { Request, Response } from "express";
import { FirebaseAuthDTO, SocialAuthDTO, RefreshTokenDTO } from "@/core/types/auth.types";
import { AuthService } from "@/infra/services/auth.service";

export class AuthController {
    constructor(private authService: AuthService) {}

    async authenticateWithPhone(req: Request<{}, {}, FirebaseAuthDTO>, res: Response) {
        try {
            const { idToken } = req.body;
            const result = await this.authService.authenticateWithPhone(idToken);
            res.json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async authenticateWithSocial(req: Request<{}, {}, SocialAuthDTO>, res: Response) {
        try {
            const { idToken, provider } = req.body;
            const result = await this.authService.authenticateWithSocial(idToken, provider);
            res.json(result);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }

    async refreshToken(req: Request<{}, {}, RefreshTokenDTO>, res: Response) {
        try {
            const { refreshToken } = req.body;
            const result = await this.authService.refreshToken(refreshToken);
            res.json(result);
        } catch (error) {
            res.status(401).json({ message: 'Invalid refresh token' });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const userId = req.user?.id; 
            
            if (!userId) {
                res.status(401).json({ message: 'User not authenticated' });
                return;
            }

            await this.authService.logout(userId);
            res.status(200).json({ message: 'Successfully logged out' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(400).json({ message: 'An unknown error occurred' });
            }
        }
    }
}