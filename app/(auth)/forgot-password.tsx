import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleReset = async () => {
        setError('');

        if (!email.trim()) {
            setError('Vui lòng nhập email');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Email không hợp lệ');
            return;
        }

        try {
            setIsLoading(true);

            // TODO: Thay bằng API call thực tế
            // const response = await fetch('https://your-api.com/forgot-password', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ email }),
            // });

            // Giả lập gửi email
            await new Promise(resolve => setTimeout(resolve, 1000));

            Alert.alert(
                'Thành công',
                'Link đặt lại mật khẩu đã được gửi đến email của bạn',
                [
                    {
                        text: 'Quay lại đăng nhập',
                        onPress: () => router.push('/login'),
                    },
                ]
            );
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể gửi link đặt lại mật khẩu. Vui lòng thử lại.');
            console.error('Reset password error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.title}>Quên mật khẩu</Text>
                        <Text style={styles.subtitle}>
                            Nhập email của bạn để nhận link đặt lại mật khẩu
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Email Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Email
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    error ? styles.inputError : null,
                                ]}
                                placeholder="Nhập email của bạn"
                                placeholderTextColor="#999"
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    setError('');
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {error ? (
                                <Text style={styles.errorText}>{error}</Text>
                            ) : null}
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                isLoading && styles.submitButtonDisabled,
                            ]}
                            onPress={handleReset}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.submitButtonText}>
                                    Gửi link đặt lại mật khẩu
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Back to Login */}
                        <View style={styles.backToLoginContainer}>
                            <Text style={styles.backToLoginText}>Nhớ mật khẩu? </Text>
                            <TouchableOpacity
                                onPress={() => router.push('/(auth)/login')}
                            >
                                <Text style={styles.backToLoginLink}>Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    keyboardView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    backButton: {
        marginBottom: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'flex-start',
        marginBottom: 40,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        maxWidth: 300,
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    required: {
        color: '#ef4444',
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
    },
    submitButton: {
        height: 48,
        backgroundColor: '#3b82f6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    submitButtonDisabled: {
        opacity: 0.6,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    backToLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backToLoginText: {
        color: '#666',
        fontSize: 14,
    },
    backToLoginLink: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '600',
    },
});
