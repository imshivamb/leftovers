// src/core/types/auth.types.ts
import { UserEntity } from "../entities/user.entity";

// Response Types
export interface BaseAuthResponse {
  user: UserEntity;
  tokens: {
    access: string;
    refresh: string;
  };
  isNewUser: boolean;
}

// Auth Providers
export type AuthProvider = 'phone' | 'google' | 'apple';

// Request DTOs
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

// Token Types
export interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

export interface TokenPair {
  access: string;
  refresh: string;
}

// Firebase Response Types
export interface FirebaseAuthResult {
  uid: string;
  phone?: string;
  email?: string;
  name?: string;
  picture?: string;
  provider: AuthProvider;
}

// Request Validation Types
export interface RefreshTokenDTO {
  refreshToken: string;
}

export interface LogoutDTO {
  refreshToken?: string;
  allDevices?: boolean;
}

export interface FirebaseAuthDTO {
  idToken: string;
}