import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = (process.env.BASE_URL as string) || 'http://localhost:8080';

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach access token (if present)
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

export interface CategoryResponse {
    id: number;
    name: string;
    urlThumbnail: string;
}

export interface ApiResponse<T = any> {
    message: string;
    code: number;
    data?: T;
}

async function getCategories(): Promise<ApiResponse<CategoryResponse[]>> {
    const res = await api.get('/api/category');
    return res.data as ApiResponse<CategoryResponse[]>;
}

export const CategoryApi = {
    getCategories,
};

export default CategoryApi;
