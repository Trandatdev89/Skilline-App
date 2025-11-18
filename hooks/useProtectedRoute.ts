import {useRouter, useSegments} from 'expo-router';
import {useEffect} from 'react';
import 'react-native-reanimated';

function useProtectedRoute(isAuthenticated: boolean) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // ✅ CHỜ ROUTER SẴN SÀNG
        if (!router) return;

        const inAuthGroup = segments[0] === '(auth)';

        // ✅ TIMEOUT ĐỂ ĐẢM BẢO NAVIGATION ĐÃ MOUNT
        const timeout = setTimeout(() => {
            if (!isAuthenticated && !inAuthGroup) {
                // Chưa đăng nhập và KHÔNG ở trang auth -> redirect về login
                router.replace('/(tabs)');
            } else if (isAuthenticated && inAuthGroup) {
                // Đã đăng nhập nhưng VẪN ở trang auth -> redirect về home
                router.replace('/(tabs)');
            }
        }, 100); // Delay 100ms

        return () => clearTimeout(timeout);
    }, [isAuthenticated, segments]);
}

export default useProtectedRoute;