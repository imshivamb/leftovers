import { UserRepository } from "@/core/repositories/user.repository";
import { StorageService } from '@/infra/services/storage.service';
import { Express } from "express";

export class UpdateProfileUseCase {
    constructor(
        private userRepository: UserRepository,
        private storageService: StorageService
    ) {}

    async execute(userId: string, data: any, files?: Express.Multer.File[]) {
         // Handle photo uploads if present
         let photos = [];
         if (files?.length) {
            photos = await Promise.all(
                files.map(file => this.storageService.uploadPhoto(file))
            );
         }

         const updatedUser = await this.userRepository.update(userId, {
            profile: {
                ...data,
                photos: photos.length ? photos.map(url => ({ url, isMain: false})) : undefined
            },
            status: 'active' // Activate user after profile completion
         });

         return updatedUser
    }
}