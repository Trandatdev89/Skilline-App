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
        // ✅ CHỜ ROUTER SẴN SÀNG và SEGMENTS đã LOAD
        if (!router || segments.length === 0) return;

        const inAuthGroup = segments[0] === '(auth)';

        console.log('Route segments:', segments, 'isAuth:', isAuthenticated, 'inAuthGroup:', inAuthGroup);

        // ✅ TIMEOUT ĐỂ ĐẢM BẢO NAVIGATION ĐÃ MOUNT
        const timeout = setTimeout(() => {
            if (!isAuthenticated && !inAuthGroup) {
                // Chưa đăng nhập và KHÔNG ở trang auth -> redirect về login
                console.log('Redirecting to login - not authenticated');
                // Use plain path (no grouping parentheses) so web routes match: /login
                router.replace('/login');
            }
            // NOTE: Do NOT auto-redirect authenticated users away from auth pages.
            // This keeps `/login` and `/register` accessible by default when opening the app.
        }, 100); // Delay 100ms

        return () => clearTimeout(timeout);
    }, [isAuthenticated, segments, router]);
}

export default useProtectedRoute;
