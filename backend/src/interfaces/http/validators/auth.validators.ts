import {z} from 'zod';

export const authValidators = {
    phoneAuth: z.object({
        idToken: z.string().min(1, "Firebase Id token is required")
    }),

    socialAuth: z.object({
        idToken: z.string().min(1, "Firebase Id token is required"),
        provider: z.enum(['google', 'apple'])
    }),

    refreshToken: z.object({
        refreshToken: z.string().min(1, "Refresh Token is required"),
    }),

    updateProfile: z.object({
        name: z.string().min(2, "Name must be atleast 2 characters"),
        birthDate: z.string().datetime(),
        gender: z.enum(['male', 'female', 'other']),
        bio: z.string().max(500, "Bio must not exceed 500 characters"),
        prompts: z.array(
            z.object({
                question: z.string(),
                answer: z.string().max(200)
            })
        ).max(3),
    })


}