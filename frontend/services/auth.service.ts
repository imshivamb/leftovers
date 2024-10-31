import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserEntity, AuthResponse, RefreshResponse, SocialAuthPayload } from '@/types/auth';

const API_URL = 'http://localhost:3000';

//Creating default axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Adding interceptor to handle token refresh

api.interceptors.response.use(response => response,
    async (error) => {
        const originalRequest = error.config;

        if(error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if(!refreshToken) throw new Error('Refresh token not found');

                const response = await AuthService.refreshTokens(refreshToken);
                await AuthService.setTokens(response.tokens);
                
                originalRequest.headers['Authorization'] = `Bearer ${response.tokens.access}`;
                return api(originalRequest);
            } catch (refreshError) {
                await AuthService.logout();
                throw refreshError;
            }
        }
        return Promise.reject(error);
    }
)