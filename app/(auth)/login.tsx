import React, {useState} from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({username: '', password: ''});
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthToken } = useAuth();

    const handleLogin = async () => {
        // Validate inputs
        const newErrors = {username: '', password: ''};
        let hasError = false;

        if (!username.trim()) {
            newErrors.username = 'Vui lòng nhập username';
            hasError = true;
        }

        if (!password.trim()) {
            newErrors.password = 'Vui lòng nhập password';
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

        try {
            setIsLoading(true);

            // TODO: Thay thế bằng API call thực tế
            // const response = await fetch('https://your-api.com/login', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ username, password }),
            // });
            // const data = await response.json();

            // Giả lập API response
            await new Promise(resolve => setTimeout(resolve, 1000));
            const mockToken = `token_${Date.now()}`;
            const expiresInSeconds = 24 * 60 * 60; // 24 giờ

            // Lưu token
            await setAuthToken(mockToken, expiresInSeconds);

            Alert.alert(
                'Đăng nhập thành công',
                `Chào mừng ${username}!`,
                [{
                    text: 'OK',
                    onPress: () => {
                        // Reset form
                        setUsername('');
                        setPassword('');
                        setErrors({username: '', password: ''});
                        // Navigation sẽ tự động trigger từ useProtectedRoute
                    }
                }]
            );
        } catch (error) {
            Alert.alert('Lỗi', 'Đăng nhập thất bại. Vui lòng thử lại.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5"/>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}>
                <View style={styles.content}>
                    {/* Logo/Title */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Login</Text>
                        <Text style={styles.subtitle}>Đăng nhập vào tài khoản của bạn</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* Username Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Username
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.username ? styles.inputError : null,
                                ]}
                                placeholder="Nhập username"
                                placeholderTextColor="#999"
                                value={username}
                                onChangeText={setUsername}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {errors.username ? (
                                <Text style={styles.errorText}>{errors.username}</Text>
                            ) : null}
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Password
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.password ? styles.inputError : null,
                                ]}
                                placeholder="Nhập password"
                                placeholderTextColor="#999"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {errors.password ? (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            ) : null}
                        </View>

                        {/* Forgot Password */}
                        <TouchableOpacity style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                        </TouchableOpacity>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                            disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.submitButtonText}>Đăng nhập</Text>
                            )}
                        </TouchableOpacity>

                        {/* Register Link */}
                        <View style={styles.registerContainer}>
                            <Text style={styles.registerText}>Chưa có tài khoản? </Text>
                            <TouchableOpacity>
                                <Text style={styles.registerLink}>Đăng ký ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    keyboardView: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
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
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#3b82f6',
        fontSize: 14,
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
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: '#666',
        fontSize: 14,
    },
    registerLink: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Login;