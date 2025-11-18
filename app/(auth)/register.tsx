// app/register.tsx
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
} from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullname: '',
        phone: '',
        email: '',
        address: '',
    });

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = () => {
        console.log('Form Data:', formData);
        // Xử lý đăng ký ở đây
    };

    const handleLogin = () => {
        router.push('/login');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
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
                            <Text style={styles.required}>* </Text>
                            Username
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={formData.username}
                            onChangeText={(value) => handleChange('username', value)}
                            placeholder=""
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <Text style={styles.required}>* </Text>
                            Password
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={formData.password}
                            onChangeText={(value) => handleChange('password', value)}
                            placeholder=""
                            secureTextEntry
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Fullname Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <Text style={styles.required}>* </Text>
                            Fullname
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={formData.fullname}
                            onChangeText={(value) => handleChange('fullname', value)}
                            placeholder=""
                        />
                    </View>

                    {/* Phone Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <Text style={styles.required}>* </Text>
                            Phone
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={formData.phone}
                            onChangeText={(value) => handleChange('phone', value)}
                            placeholder=""
                            keyboardType="phone-pad"
                        />
                    </View>

                    {/* Email Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <Text style={styles.required}>* </Text>
                            Email
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={formData.email}
                            onChangeText={(value) => handleChange('email', value)}
                            placeholder=""
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Address Field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            <Text style={styles.required}>* </Text>
                            Address
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={formData.address}
                            onChangeText={(value) => handleChange('address', value)}
                            placeholder=""
                        />
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
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
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    required: {
        color: '#ff3b30',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#f8f9fa',
        color: '#1a1a1a',
    },
    submitButton: {
        backgroundColor: '#2196F3',
        height: 52,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#2196F3',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 15,
        color: '#666',
    },
    loginLink: {
        fontSize: 15,
        color: '#2196F3',
        fontWeight: '600',
    },
});