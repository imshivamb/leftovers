import { Request, Response } from "express";
import { UpdateProfileUseCase } from "@/core/use-cases/profile/update-profile.use-case";
import { authValidators } from "../validators/auth.validators";

export class ProfileController {
    constructor (private updateProfileUseCase: UpdateProfileUseCase){}

    async updateProfile(req: Request, res: Response) {
        try {
            const userId = req.user?.id;
                if (!userId) {
                    return res.status(401).json({ message: "User not authenticated" });
                }
            const validatedData = authValidators.updateProfile.parse(req.body);
            const files = req.files as Express.Multer.File[];

            const updatedUser = await this.updateProfileUseCase.execute(
                userId,
                validatedData,
                files
            );

            res.json(updatedUser)
        } catch (error) {
            if(error instanceof Error) {
                res.status(400).json({ message: error.message });
               } else {
                res.status(400).json({ message: 'An unknown error occurred' });
               }
        }
    }

}