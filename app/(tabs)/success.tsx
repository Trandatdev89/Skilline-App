import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function SuccessPage() {
    const router = useRouter();

    React.useEffect(() => {
        // Auto-redirect to home after 3 seconds
        const timer = setTimeout(() => {
            router.replace('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Ionicons name="checkmark-circle" size={80} color="#22c55e" />
                <Text style={styles.successText}>Successfully</Text>
                <Text style={styles.subText}>Đơn hàng của bạn đã được tạo thành công</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        gap: 16,
    },
    successText: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1e3a8a',
        marginTop: 8,
    },
    subText: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginTop: 4,
    },
});
