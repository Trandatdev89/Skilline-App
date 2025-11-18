import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CourseScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Course Card */}
            <View style={styles.card}>
                {/* Course Image */}
                <View style={styles.imageContainer}>
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="logo-python" size={60} color="#fff" />
                    </View>
                    {/* Badge */}
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>28TECH</Text>
                    </View>
                </View>

                {/* Course Content */}
                <View style={styles.content}>
                    <Text style={styles.title}>KHÓA HỌC LẬP TRÌNH</Text>
                    <Text style={styles.pythonTitle}>PYTHON</Text>

                    {/* Dots Decoration */}
                    <View style={styles.dotsContainer}>
                        {[...Array(14)].map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    i % 2 === 0 ? styles.dotCyan : styles.dotBlue
                                ]}
                            />
                        ))}
                    </View>

                    {/* Features List */}
                    <View style={styles.featuresList}>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>120 BÀI HỌC</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>300 BÀI TẬP CODING</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>WEBSITE CHẤM BÀI TỰ ĐỘNG</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>NHÓM HỖ TRỢ GIẢI ĐÁP</Text>
                        </View>
                    </View>

                    {/* Register Button */}
                    <TouchableOpacity style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>REGISTER NOW</Text>
                    </TouchableOpacity>
                </View>

                {/* Character Image - Right Side */}
                <View style={styles.characterContainer}>
                    <View style={styles.characterPlaceholder}>
                        <Ionicons name="person" size={80} color="#FFB74D" />
                    </View>
                </View>

                {/* Decorative Icons */}
                <View style={styles.decorativeIcons}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="logo-python" size={24} color="#FFD54F" />
                    </View>
                    <View style={[styles.iconCircle, styles.iconCircle2]}>
                        <Ionicons name="hardware-chip" size={24} color="#4FC3F7" />
                    </View>
                </View>
            </View>

            {/* Course Info */}
            <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>
                    Lập Trình Python Từ Cơ Bản Tới Nâng Cao Qua 120 Video Và 300 Bài Tập Thực Hành (Update 2025)
                </Text>

                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Ionicons name="book-outline" size={18} color="#666" />
                        <Text style={styles.statText}>120 bài giảng</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="time-outline" size={18} color="#666" />
                        <Text style={styles.statText}>56 giờ</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="people-outline" size={18} color="#666" />
                        <Text style={styles.statText}>1654 học viên</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    card: {
        margin: 16,
        backgroundColor: '#1a1a3e',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
        minHeight: 400,
    },
    imageContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 2,
    },
    imagePlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#00BCD4',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badge: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#1565C0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
        paddingTop: 120,
        zIndex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    pythonTitle: {
        color: '#FFB74D',
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
        marginBottom: 6,
    },
    dotCyan: {
        backgroundColor: '#00BCD4',
    },
    dotBlue: {
        backgroundColor: '#2196F3',
    },
    featuresList: {
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginRight: 12,
    },
    featureText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    registerButton: {
        backgroundColor: '#00BCD4',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    characterContainer: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        zIndex: 1,
    },
    characterPlaceholder: {
        width: 150,
        height: 200,
        backgroundColor: 'rgba(255, 183, 77, 0.2)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    decorativeIcons: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconCircle2: {
        marginLeft: 30,
    },
    courseInfo: {
        backgroundColor: '#fff',
        margin: 16,
        marginTop: 0,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 16,
        lineHeight: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statText: {
        fontSize: 14,
        color: '#666',
    },
});