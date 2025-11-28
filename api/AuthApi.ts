import { AuthResponse } from '@/type/AuthType/AuthResponse';
import { LoginRequest } from '@/type/AuthType/LoginRequest';
import { RegisterRequest } from '@/type/AuthType/RegisterRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Read BASE_URL from environment or fallback to localhost
const BASE_URL = (process.env.BASE_URL as string) || 'http://localhost:8080';

// Axios instance for auth API calls
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach access token (if present) to all requests
api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token && config && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    } catch (err) {
        // ignore
    }
    return config;
}, (error) => Promise.reject(error));


export interface ApiResponse<T = any> {
    message: string;
    code: number;
    data?: T;
}

export interface UserEntity {
    email?: string;
    phone?: string;
    fullname?: string;
}

async function register(registerDTO: RegisterRequest): Promise<ApiResponse> {
    const res = await api.post('/auth/register', registerDTO);
    return res.data as ApiResponse;
}

async function login(loginDTO: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const res = await api.post('/auth/login', loginDTO);
    return res.data as ApiResponse<AuthResponse>;
}

async function introspectToken(introspectDto: any): Promise<ApiResponse<boolean>> {
    const res = await api.post('/auth/introspect-token', introspectDto);
    return res.data as ApiResponse<boolean>;
}

async function getUserInfo(): Promise<ApiResponse<UserEntity>> {
    const res = await api.get('/api/user/info');
    return res.data as ApiResponse<UserEntity>;
}

export const AuthApi = {
    register,
    login,
    introspectToken
    , getUserInfo
};

export default AuthApi;
