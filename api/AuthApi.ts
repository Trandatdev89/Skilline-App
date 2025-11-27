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

export interface RegisterRequest {
  username: string;
  password: string;
  fullname: string;
  phone: string;
  email: string;
  address: string;
}

export interface ApiResponse<T = any> {
  message: string;
  code: number;
  data?: T;
}

async function register(registerDTO: RegisterRequest): Promise<ApiResponse> {
  const res = await api.post('/auth/register', registerDTO);
  return res.data as ApiResponse;
}

export const AuthApi = {
  register,
};

export default AuthApi;
