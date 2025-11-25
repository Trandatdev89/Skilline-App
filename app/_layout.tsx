import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { ActivityIndicator, View } from 'react-native';
import useProtectedRoute from '@/hooks/useProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

export default function RootLayout() {
    const { isAuthenticated, isLoading } = useAuth();

    // ✅ GỌI HOOK CHỈ 1 LẦN Ở ĐÂY - kiểm tra route và redirect nếu cần
    useProtectedRoute(isAuthenticated);

    // Hiển thị loading screen
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}