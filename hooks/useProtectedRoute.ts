import { useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import 'react-native-reanimated';


function useProtectedRoute(isAuthenticated: boolean) {
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {

        if (!router) return;

        // ✅ Check both grouped paths like '(auth)' AND plain paths like 'login', 'register', 'forgot-password'
        const authPages = ['(auth)', 'login', 'register', 'forgot-password'];
        const inAuthPage = segments.length > 0 && authPages.includes(segments[0]);

        const timeout = setTimeout(() => {

            if (isAuthenticated && inAuthPage) {
                router.replace('/');
            }
            else if (!isAuthenticated && !inAuthPage) {
                router.replace('/login');
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, [isAuthenticated, segments, router]);
}

export default useProtectedRoute;
