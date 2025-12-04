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

export interface LectureResponse {
    id: string;
    position?: number;
    title?: string;
    urlThumbnail?: string;
    courseName?: string;
    CategoryName?: string;
    duration?: string;
    createAt?: string;
    updateAt?: string;
}

export interface ApiResponse<T = any> {
    message: string;
    code: number;
    data?: T;
}

async function getLecturesNotPagi(courseId: number | string): Promise<ApiResponse<LectureResponse[]>> {
    const res = await api.get(`/api/lecture/not-pagi?courseId=${courseId}`);
    return res.data as ApiResponse<LectureResponse[]>;
}

export const LectureApi = {
    getLecturesNotPagi,
};

// Helper to get HLS stream URL with authorization header
export async function getVideoStreamUrl(lectureId: string): Promise<string> {
    try {
        const token = await AsyncStorage.getItem('accessToken');
        const streamUrl = `${BASE_URL}/api/lecture/stream/${lectureId}/master.m3u8`;

        if (!token) {
            console.warn('[LectureApi] No token available, returning URL without auth');
            return streamUrl;
        }

        // Fetch M3U8 file with Authorization header
        const response = await axios.get(streamUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            responseType: 'blob',
        });

        // Create blob URL for HLS player
        const blobUrl = URL.createObjectURL(response.data);
        console.log('[LectureApi] Created blob URL for HLS stream:', blobUrl);
        return blobUrl;
    } catch (err) {
        console.error('[LectureApi] Failed to fetch stream with auth:', err);
        // Fallback to plain URL
        return `${BASE_URL}/api/lecture/stream/${lectureId}/master.m3u8`;
    }
}

export default LectureApi;
