import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_URL = (process.env.BASE_URL as string) || 'http://localhost:8080';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach access token (if present) to all CourseApi requests
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

export enum LevelEnum {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED',
}

export interface CourseResponse {
    id: number;
    title: string;
    categoryName: string;
    level: LevelEnum;
    thumbnail_url: string;
    status: boolean;
    price: number;
    createAt: string;
    updateAt: string;
}

export interface PageResponse<T> {
    page: number;
    size: number;
    list: T[];
    totalPages: number;
    totalElements: number;
}

export interface ApiResponse<T = any> {
    message: string;
    code: number;
    data?: T;
}

export interface CourseProjection {
    id: number;
    title: string;
    categoryName?: string;
    description?: string;
    thumbnailUrl?: string;
    level?: string;
    price?: number;
    rate?: number;
}

async function getCourses(
    page: number = 0,
    size: number = 10,
    sort?: string,
    keyword?: string
): Promise<ApiResponse<PageResponse<CourseResponse>>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('size', size.toString());
    if (sort) params.append('sort', sort);
    if (keyword) params.append('keyword', keyword);

    const res = await api.get(`/api/course/all?${params.toString()}`);
    console.log(res.data);
    return res.data as ApiResponse<PageResponse<CourseResponse>>;
}

async function getCourseByCategory(
    categoryId: number
): Promise<ApiResponse<PageResponse<CourseResponse>>> {
    const res = await api.get(`/api/course?categoryId=${categoryId}`);
    console.log('[CourseApi] getCourseByCategory Response:', res.data);
    return res.data as ApiResponse<PageResponse<CourseResponse>>;
}

export const CourseApi = {
    getCourses,
    getCourseByCategory,
    // get purchased courses for current user
    async getPurchasedCourses(): Promise<ApiResponse<CourseProjection[]>> {
        const res = await api.get('/api/enrollment/buy');
        return res.data as ApiResponse<CourseProjection[]>;
    },
};

export default CourseApi;
