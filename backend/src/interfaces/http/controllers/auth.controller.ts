import { UserRepository } from "@/core/repositories/user.repository";
import { FirebaseAuthDTO, PhoneAuthDTO, RefreshTokenDTO, SocialAuthDTO } from "@/core/types/auth.types";
import { FirebaseAuthService } from "@/infra/services/firebase-auth.service";
import { TokenService } from "@/infra/services/token.service";
import { Request, Response } from "express";

export class AuthController {
    constructor(
        private firebaseAuth: FirebaseAuthService,
        private userRepository: UserRepository,
        private tokenService: TokenService
    ){}

    async authenticateWithPhone (req: Request<{}, {}, FirebaseAuthDTO>, res: Response) {
        try {
            const { idToken } = req.body;

            // Firebase Authentication
            const decodedToken = await this.firebaseAuth.verifyToken(idToken);

            // Find or Create User
            let user = await this.userRepository.findByPhone(decodedToken.phone);

            if(!user) {
                user = await this.userRepository.create({
                    phone: decodedToken.phone,
                    firebaseUId: decodedToken.uid,
                    authProvider: 'phone',
                    profile: {
                        name: "",
                        photos: [],
                        prompts: [],
                        bio: ""
                    },
                    status: 'pending'
                })
            }

            // GEnerate Tokens
            const tokens =  this.tokenService.generateTokens(user.id);

            res.json({
                user,
                tokens,
                isNewUser: user.status === 'pending'
              });
        } catch (error) {
           if(error instanceof Error) {
            res.status(400).json({ message: error.message });
           } else {
            res.status(400).json({ message: 'An unknown error occurred' });
           }
          }
    }

    async authenticateWithSocial (req: Request<{}, {}, SocialAuthDTO>, res: Response) {
        try {
            const {idToken, provider}  = req.body;

            // Verify Firebase token
            const decodedToken = await this.firebaseAuth.verifyToken(idToken);

            // Find or Create User
            let user = await this.userRepository.findByEmail(decodedToken.email);
            if (!user) {
                user = await this.userRepository.create({
                  email: decodedToken.email,
                  firebaseUId: decodedToken.uid,
                  authProvider: provider,
                  profile: {
                    name: decodedToken.name || '',
                    photos: decodedToken.picture ? [{
                      url: decodedToken.picture,
                      isMain: true
                    }] : [],
                    prompts: [],
                    bio: ''
                  },
                  status: 'pending'
                });
              }
               // Generate tokens
            const tokens = this.tokenService.generateTokens(user.id);

            res.json({
                user,
                tokens,
                isNewUser: user.status === 'pending'
              });
        } catch (error) {
            if(error instanceof Error) {
                res.status(400).json({ message: error.message });
               } else {
                res.status(400).json({ message: 'An unknown error occurred' });
               }
        }
    }

    async refreshToken(
        req: Request<{}, {}, RefreshTokenDTO>,
        res: Response
    ): Promise<void> {
        try {
            const { refreshToken } = req.body;
            
            // Verify refresh token
            const decoded = this.tokenService.verifyRefreshToken(refreshToken);
            const user = await this.userRepository.findById(decoded.userId);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // Generate new tokens
            const tokens = this.tokenService.generateTokens(user.id);
            
            res.json({ tokens });
        } catch (error) {
            res.status(401).json({ message: 'Invalid refresh token' });
        }
    }
}