import React, { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { AuthApi } from '@/api/AuthApi';
import { useAuth } from '@/hooks/useAuth';
import AlertService from '@/services/AlertService';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { setAuthToken } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        // Validate inputs
        const newErrors = { username: '', password: '' };
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

            const resp = await AuthApi.login({ username, password });


            if (resp.code === 200 && resp.data) {
                const accessToken = resp.data.accessToken;
                const refreshToken = resp.data.refreshToken!;

                await setAuthToken(accessToken, refreshToken);


                AlertService.howMessage('Đăng nhập thành công', resp.message, () => {
                    setUsername('');
                    setPassword('');
                    setErrors({ username: '', password: '' });
                    router.push('/');
                })

            } else {
                AlertService.howMessage('Đăng nhập thất bại', resp.message)
            }
        } catch (error) {
            AlertService.howMessage('Đăng nhập thất bại.Vui long thu lai')
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
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
                        <TouchableOpacity
                            style={styles.forgotPassword}
                            onPress={() => router.push('/forgot-password')}
                        >
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
                            <TouchableOpacity onPress={() => router.push('/register')}>
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