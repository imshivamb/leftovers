export interface UserEntity {
    id: string,
    email?: string,
    phone?: string,
    firebaseUId: string,
    authProvider: "google" | "apple" | "phone",
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
    },
    settings: {
        discovery: boolean;
        distance: number;
        ageRange: [number, number];
        showMe: string[];
        notifications: boolean;
    },
    location: {
        type: "Point";
        coordinates: [number, number];
    }
}

export interface Tokens {
    access: string;
    refresh: string;
}


export interface AuthResponse {
    user: UserEntity;
    tokens: Tokens;
    isNewUser: boolean;
}

export interface RefreshResponse {
    tokens: Tokens;
}

export type SocialProvider = 'google' | 'apple';

export interface SocialAuthPayload {
  provider: SocialProvider;
  idToken: string;
  profile?: {
    email?: string;
    name?: string;
    photo?: string;
  };
}