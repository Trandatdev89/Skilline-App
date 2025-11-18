import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { useEffect, useState } from 'react';
import  useProtectedRoute  from '@/hooks/useProtectedRoute';

export default function RootLayout() {
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [isLoading, setIsLoading] = useState(true);
    //
    // // Kiểm tra authentication khi app khởi động
    // useEffect( () => {
    //      checkAuth();
    // }, []);
    //
    // const checkAuth = async () => {
    //     try {
    //         // Kiểm tra AsyncStorage hoặc SecureStore
    //         // const token = await AsyncStorage.getItem('userToken');
    //         // const token = await SecureStore.getItemAsync('userToken');
    //
    //         // Giả lập check auth
    //         setTimeout(() => {
    //             setIsAuthenticated(false); // Đổi thành true để test đã login
    //             setIsLoading(false);
    //         }, 1000);
    //     } catch (error) {
    //         console.error('Auth check error:', error);
    //         setIsLoading(false);
    //     }
    // };
    //
    // // ✅ GỌI HOOK CHỈ 1 LẦN Ở ĐÂY
    // useProtectedRoute(isAuthenticated);
    //
    // // Hiển thị loading screen
    // if (isLoading) {
    //     return null; // Hoặc return <SplashScreen />
    // }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}