import axios from 'axios';

// Read BASE_URL from environment or fallback to localhost
const BASE_URL = (process.env.BASE_URL as string) || 'http://localhost:8080';

// Axios instance for course API calls
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============ Types ============
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

// ============ API Functions ============
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

export const CourseApi = {
    getCourses,
};

export default CourseApi;
