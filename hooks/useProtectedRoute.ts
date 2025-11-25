import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';

/**
 * Hook để bảo vệ route - redirect dựa vào authentication state
 * @param isAuthenticated - Người dùng đã đăng nhập hay chưa
 */
function useProtectedRoute(isAuthenticated: boolean) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        // ✅ CHỜ ROUTER SẴN SÀNG
        if (!router) return;

        const inAuthGroup = segments[0] === '(auth)';

        console.log('Route segments:', segments, 'isAuth:', isAuthenticated, 'inAuthGroup:', inAuthGroup);

        // ✅ TIMEOUT ĐỂ ĐẢM BẢO NAVIGATION ĐÃ MOUNT
        const timeout = setTimeout(() => {
            if (!isAuthenticated && !inAuthGroup) {
                // Chưa đăng nhập và KHÔNG ở trang auth -> redirect về login
                console.log('Redirecting to login - not authenticated');
                router.replace('/(auth)/login');
            } else if (isAuthenticated && inAuthGroup) {
                // Đã đăng nhập nhưng VẪN ở trang auth -> redirect về home
                console.log('Redirecting to home - authenticated');
                router.replace('/(tabs)/index');
            }
        }, 100); // Delay 100ms

        return () => clearTimeout(timeout);
    }, [isAuthenticated, segments, router]);
}

export default useProtectedRoute;
