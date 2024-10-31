import { UpdateProfileUseCase } from "./core/use-cases/profile/update-profile.use-case";
import { MongoUserRepository } from "./infra/repositories/user.repository.impl";
import { AuthService } from "./infra/services/auth.service";
import { FirebaseAuthService } from "./infra/services/firebase-auth.service"
import { RedisService } from "./infra/services/redis.service";
import { StorageService } from "./infra/services/storage.service";
import { TokenService } from "./infra/services/token.service";
import { AuthController } from "./interfaces/http/controllers/auth.controller";
import { ProfileController } from "./interfaces/http/controllers/profile.controller";

export const createContainer = () => {
    // Services
    const firebaseAuth = new FirebaseAuthService();
    const tokenService = new TokenService();
    const storageService = new StorageService();
    const redisService = new RedisService();
    

    // Repositories
    const userRepository = new MongoUserRepository();

    // Use cases
    const updateProfileUseCase = new UpdateProfileUseCase(userRepository, storageService);

    const authService = new AuthService(firebaseAuth, userRepository, tokenService, redisService);

    //controllers
    const authController = new AuthController(
        authService
      );
    
      const profileController = new ProfileController(
        updateProfileUseCase
      );

      return {
        authController,
        tokenService,
        profileController
      }
}