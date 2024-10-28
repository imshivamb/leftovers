export interface UserEntity {
    id: string;
    email?: string;
    phone?: string;
    firebaseUId: string;
    authProvider: "google" | "apple" | "phone";
    password?: string;
    profile: {
        name: string;
        birthdate?: Date;
        gender?: string;
        photos: {
            url: string;
            isMain: boolean;
            order?: number;
        }[];
        bio: string;
        prompts: {
            question: string;
            answer: string;
        }[];
    };
    location?: {
        type: "Point";
        coordinates: [number, number]; // [longitude, latitude]
    };
    settings: {
        discovery: boolean;
        distance: number;
        ageRange: [number, number];
        showMe: string[];
        notifications: boolean;
    };
    questPreferences: {
        interests: string[];
        difficulty: string[];
        types: string[];
    };
    status: "active" | "pending" | "banned";
    lastActive: Date;
    createdAt: Date;
    updatedAt: Date;

}