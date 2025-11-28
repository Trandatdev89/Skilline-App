import { AuthProvider, useAuthContext } from '@/contexts/AuthContext';
import useProtectedRoute from '@/hooks/useProtectedRoute';
import { Stack } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';

function RootLayoutContent() {
    const { isAuthenticated, isLoading } = useAuthContext();

    console.log('[RootLayout] isAuthenticated:', isAuthenticated, 'isLoading:', isLoading);

    useProtectedRoute(isAuthenticated);

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

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutContent />
        </AuthProvider>
    );
}