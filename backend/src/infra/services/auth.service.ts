import { UserRepository } from "@/core/repositories/user.repository";
import { AuthProvider, FirebaseAuthDTO, PhoneAuthDTO, RefreshTokenDTO, SocialAuthDTO } from "@/core/types/auth.types";
import { FirebaseAuthService } from "@/infra/services/firebase-auth.service";
import { RedisService } from "@/infra/services/redis.service";
import { TokenService } from "@/infra/services/token.service";

export class AuthService {
    constructor(
        private firebaseAuth: FirebaseAuthService,
        private userRepository: UserRepository,
        private tokenService: TokenService,
        private redisService: RedisService
    ) {}

    async authenticateWithPhone(idToken: string) {
        // Firebase Authentication
        const decodedToken = await this.firebaseAuth.verifyToken(idToken);
        if(!decodedToken.phone) {
            throw new Error('Phone Number is required for phone authentication');
        }

        // Find or Create User
        let user = await this.userRepository.findByPhone(decodedToken.phone);

        if (!user) {
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
            });
        }

        // Generate Tokens
        const tokens = this.tokenService.generateTokens(user.id);
        
        // Store session
        await this.redisService.storeUserSession(user.id, tokens.refreshToken);

        return {
            user,
            tokens,
            isNewUser: user.status === 'pending'
        };
    }

    async authenticateWithSocial(idToken: string, provider: AuthProvider) {
        // Verify Firebase token
        const decodedToken = await this.firebaseAuth.verifyToken(idToken);
        if(!decodedToken.email) {
            throw new Error('Email is required for phone authentication');
        }

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

        // Store session
        await this.redisService.storeUserSession(user.id, tokens.refreshToken);

        return {
            user,
            tokens,
            isNewUser: user.status === 'pending'
        };
    }

    async refreshToken(refreshToken: string) {
        // Verify refresh token
        const decoded = this.tokenService.verifyRefreshToken(refreshToken);
        
        // Verify if the session is valid in Redis
        const isValidSession = await this.redisService.checkUserSession(
            decoded.userId,
            refreshToken
        );

        if (!isValidSession) {
            throw new Error('Invalid session');
        }

        const user = await this.userRepository.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Generate new tokens
        const tokens = this.tokenService.generateTokens(user.id);
        
        // Update session with new refresh token
        await this.redisService.storeUserSession(user.id, tokens.refreshToken);

        return { tokens };
    }
}