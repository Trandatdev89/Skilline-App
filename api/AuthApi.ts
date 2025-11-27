import { AuthResponse } from '@/type/AuthType/AuthResponse';
import { LoginRequest } from '@/type/AuthType/LoginRequest';
import { RegisterRequest } from '@/type/AuthType/RegisterRequest';
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


export interface ApiResponse<T = any> {
    message: string;
    code: number;
    data?: T;
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

export const AuthApi = {
    register,
    login,
    introspectToken
};

export default AuthApi;
