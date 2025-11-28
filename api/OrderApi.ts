import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Read BASE_URL from environment or fallback to localhost
const BASE_URL = (process.env.BASE_URL as string) || 'http://localhost:8080';

const api = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// Attach access token to requests
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

export interface VNPayResponse {
    status: number,
    message: string,
    url: string
}


async function saveOrder(orderData: any): Promise<ApiResponse> {
    const res = await api.post('/api/order', orderData);
    return res.data as ApiResponse;
}

async function vnPayment(params: any): Promise<VNPayResponse> {
    const config = {
        params: params ? params : {}
    };
    const res = await api.get('/api/payment', config);
    return res.data as VNPayResponse;
}

export const OrderApi = {
    saveOrder,
    vnPayment,
};

export default OrderApi;

