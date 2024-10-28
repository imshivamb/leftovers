import { UserEntity } from "../entities/user.entity";

// src/core/types/auth.types.ts
export interface BaseAuthResponse {
    user: UserEntity;
    tokens: {
      access: string;
      refresh: string;
    };
    isNewUser: boolean;
  }
  
  export type AuthProvider = 'phone' | 'google' | 'apple';
  
  export interface SocialAuthDTO {
    provider: 'google' | 'apple';
    idToken: string;
    profile?: {
      email?: string;
      name?: string;
      photo?: string;
    };
  }
  
  export interface PhoneAuthDTO {
    phoneNumber: string;
    verificationId: string;
    code: string;
  }