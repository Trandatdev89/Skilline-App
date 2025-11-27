import { AuthApi } from '@/api/AuthApi';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface FormErrors {
    username: string;
    password: string;
    fullname: string;
    phone: string;
    email: string;
    address: string;
}

interface FormData {
    username: string;
    password: string;
    fullname: string;
    phone: string;
    email: string;
    address: string;
}

export default function RegisterScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        username: '',
        password: '',
        fullname: '',
        phone: '',
        email: '',
        address: '',
    });
    const [errors, setErrors] = useState<FormErrors>({
        username: '',
        password: '',
        fullname: '',
        phone: '',
        email: '',
        address: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        // Clear error khi user nhập
        if (errors[field as keyof FormErrors]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    // Validation Functions
    const validateUsername = (username: string): string => {
        if (!username.trim()) {
            return 'Username không được để trống';
        }
        if (username.length < 6) {
            return 'Username phải có ít nhất 6 ký tự';
        }
        if (username.length > 12) {
            return 'Username không được vượt quá 12 ký tự';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return 'Username chỉ chứa chữ, số và dấu gạch dưới';
        }
        return '';
    };

    const validatePassword = (password: string): string => {
        if (!password.trim()) {
            return 'Password không được để trống';
        }
        if (password.length < 8) {
            return 'Password phải có ít nhất 8 ký tự';
        }
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (!hasUpperCase) {
            return 'Password phải chứa ít nhất 1 chữ hoa';
        }
        if (!hasLowerCase) {
            return 'Password phải chứa ít nhất 1 chữ thường';
        }
        if (!hasNumber) {
            return 'Password phải chứa ít nhất 1 số';
        }
        if (!hasSpecialChar) {
            return 'Password phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)';
        }
        return '';
    };

    const validateEmail = (email: string): string => {
        if (!email.trim()) {
            return 'Email không được để trống';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Email không hợp lệ';
        }
        return '';
    };

    const validatePhone = (phone: string): string => {
        if (!phone.trim()) {
            return 'Số điện thoại không được để trống';
        }
        // Regex cho số điện thoại Việt Nam: bắt đầu với 0 và có 10 chữ số
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
            return 'Số điện thoại không hợp lệ (phải là 10 chữ số bắt đầu từ 0)';
        }
        return '';
    };

    const validateFullname = (fullname: string): string => {
        if (!fullname.trim()) {
            return 'Họ và tên không được để trống';
        }
        if (fullname.trim().length < 2) {
            return 'Họ và tên phải có ít nhất 2 ký tự';
        }
        return '';
    };

    const validateAddress = (address: string): string => {
        if (!address.trim()) {
            return 'Địa chỉ không được để trống';
        }
        if (address.trim().length < 5) {
            return 'Địa chỉ phải có ít nhất 5 ký tự';
        }
        return '';
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {
            username: validateUsername(formData.username),
            password: validatePassword(formData.password),
            fullname: validateFullname(formData.fullname),
            phone: validatePhone(formData.phone),
            email: validateEmail(formData.email),
            address: validateAddress(formData.address),
        };

        setErrors(newErrors);

        // Check nếu có lỗi nào
        const hasErrors = Object.values(newErrors).some(error => error !== '');
        return !hasErrors;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            const apiResp = await AuthApi.register(formData as any);

            console.log('Register response:', apiResp);

            const showMessage = (title: string, message?: string, onOk?: () => void) => {
                if (Platform.OS === 'web' && typeof window !== 'undefined' && window.alert) {
                    try {
                        window.alert(`${title}\n\n${message ?? ''}`);
                        if (onOk) onOk();
                    } catch (e) {
                        // fallback to console if alert is blocked
                        console.log('Alert fallback:', title, message);
                        if (onOk) onOk();
                    }
                } else {
                    Alert.alert(title, message ?? '', [
                        { text: 'OK', onPress: onOk },
                    ]);
                }
            };

            // Normalize response: support string or object
            const code = typeof apiResp === 'object' && apiResp?.code ? apiResp.code : 200;
            const message = typeof apiResp === 'object' ? apiResp?.message ?? JSON.stringify(apiResp) : String(apiResp);

            showMessage(code === 200 ? 'Thành công' : 'Lỗi', message, () => {
                if (code === 200) router.push('/login');
            });

        } catch (error) {
            Alert.alert('Lỗi', 'Đăng ký thất bại. Vui lòng thử lại.');
            console.error('Register error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = () => {
        router.push('/login');
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
                    <View style={styles.header}>
                        <Text style={styles.title}>Đăng ký</Text>
                        <Text style={styles.subtitle}>Tạo tài khoản mới của bạn</Text>
                    </View>

                    {/* Form Card */}
                    <View style={styles.card}>
                        {/* Username Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Username
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.username ? styles.inputError : null,
                                ]}
                                value={formData.username}
                                onChangeText={(value) => handleChange('username', value)}
                                placeholder="6-12 ký tự, chỉ chứa chữ, số và _"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                            />
                            {errors.username ? (
                                <Text style={styles.errorText}>{errors.username}</Text>
                            ) : null}
                        </View>

                        {/* Password Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Password
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.password ? styles.inputError : null,
                                ]}
                                value={formData.password}
                                onChangeText={(value) => handleChange('password', value)}
                                placeholder="Min 8 ký tự, chữ hoa, thường, số, ký tự đặc biệt"
                                placeholderTextColor="#999"
                                secureTextEntry
                                autoCapitalize="none"
                            />
                            {errors.password ? (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            ) : null}
                        </View>

                        {/* Fullname Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Họ và tên
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.fullname ? styles.inputError : null,
                                ]}
                                value={formData.fullname}
                                onChangeText={(value) => handleChange('fullname', value)}
                                placeholder="Nhập họ và tên"
                                placeholderTextColor="#999"
                            />
                            {errors.fullname ? (
                                <Text style={styles.errorText}>{errors.fullname}</Text>
                            ) : null}
                        </View>

                        {/* Email Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Email
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.email ? styles.inputError : null,
                                ]}
                                value={formData.email}
                                onChangeText={(value) => handleChange('email', value)}
                                placeholder="example@email.com"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {errors.email ? (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            ) : null}
                        </View>

                        {/* Phone Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Số điện thoại
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.phone ? styles.inputError : null,
                                ]}
                                value={formData.phone}
                                onChangeText={(value) => handleChange('phone', value)}
                                placeholder="0xxxxxxxxx (10 chữ số)"
                                placeholderTextColor="#999"
                                keyboardType="phone-pad"
                            />
                            {errors.phone ? (
                                <Text style={styles.errorText}>{errors.phone}</Text>
                            ) : null}
                        </View>

                        {/* Address Field */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>
                                <Text style={styles.required}>* </Text>Địa chỉ
                            </Text>
                            <TextInput
                                style={[
                                    styles.input,
                                    errors.address ? styles.inputError : null,
                                ]}
                                value={formData.address}
                                onChangeText={(value) => handleChange('address', value)}
                                placeholder="Nhập địa chỉ"
                                placeholderTextColor="#999"
                            />
                            {errors.address ? (
                                <Text style={styles.errorText}>{errors.address}</Text>
                            ) : null}
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={[
                                styles.submitButton,
                                isLoading && styles.submitButtonDisabled,
                            ]}
                            onPress={handleSubmit}
                            disabled={isLoading}
                            activeOpacity={0.8}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.submitButtonText}>Đăng ký</Text>
                            )}
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Đã có tài khoản? </Text>
                            <TouchableOpacity onPress={handleLogin}>
                                <Text style={styles.loginLink}>Đăng nhập ngay</Text>
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
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    card: {
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
    inputGroup: {
        marginBottom: 16,
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
        fontSize: 14,
        color: '#333',
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#ef4444',
        backgroundColor: '#fff5f5',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
        fontWeight: '500',
    },
    submitButton: {
        height: 48,
        backgroundColor: '#3b82f6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: '#666',
        fontSize: 14,
    },
    loginLink: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '600',
    },
});