import { CourseApi, CourseProjection } from '@/api/CourseApi';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PurchasedScreen() {
    const [courses, setCourses] = useState<CourseProjection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        fetchPurchased();
    }, []);

    const fetchPurchased = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const resp = await CourseApi.getPurchasedCourses();
            console.log('[PurchasedScreen] resp', resp);
            if (resp.code === 200 && resp.data) {
                setCourses(resp.data || []);
            } else {
                setError(resp.message || 'Failed to fetch purchased courses');
            }
        } catch (err) {
            console.error('[PurchasedScreen] Fetch error:', err);
            setError('Failed to fetch purchased courses. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchPurchased}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (courses.length === 0) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.noCourseText}>You haven't purchased any courses yet.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {courses.map((course) => (
                <PurchasedCard key={course.id} course={course} />
            ))}
        </ScrollView>
    );
}

interface PurchasedCardProps {
    course: CourseProjection;
}

function PurchasedCard({ course }: PurchasedCardProps) {
    const router = useRouter();

    return (
        <View style={styles.courseContainer}>
            <View style={styles.cardHeader}>
                {course.thumbnailUrl ? (
                    <Image source={{ uri: course.thumbnailUrl }} style={styles.thumbnail} />
                ) : (
                    <View style={styles.thumbnailPlaceholder}>
                        <Ionicons name="book" size={40} color="#fff" />
                    </View>
                )}

                <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{course.categoryName || 'General'}</Text>
                </View>

                <View style={[styles.levelBadge, styles.levelBeginner]}>
                    <Text style={styles.levelBadgeText}>{course.level || 'LEVEL'}</Text>
                </View>
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                <Text style={styles.price}>{course.price ? `$${course.price}` : 'Free'}</Text>
                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Ionicons name="star" size={14} color="#666" />
                        <Text style={styles.metaText}>{course.rate ?? 0}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.enrollButton} onPress={() => router.push(`/lecture?courseId=${course.id}`)}>
                    <Text style={styles.enrollButtonText}>Open</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    courseContainer: { margin: 12, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
    cardHeader: { position: 'relative', height: 160 },
    thumbnail: { width: '100%', height: '100%', resizeMode: 'cover' },
    thumbnailPlaceholder: { width: '100%', height: '100%', backgroundColor: '#3b82f6', justifyContent: 'center', alignItems: 'center' },
    categoryBadge: { position: 'absolute', top: 12, left: 12, backgroundColor: '#3b82f6', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    categoryBadgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
    levelBadge: { position: 'absolute', top: 12, right: 12, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    levelBeginner: { backgroundColor: '#10b981' },
    levelBadgeText: { color: '#fff', fontSize: 11, fontWeight: '600' },
    cardContent: { padding: 16 },
    courseTitle: { fontSize: 16, fontWeight: '600', color: '#1a1a1a', marginBottom: 12, lineHeight: 22 },
    price: { fontSize: 18, fontWeight: 'bold', color: '#3b82f6', marginBottom: 12 },
    metaContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metaText: { fontSize: 12, color: '#666' },
    enrollButton: { backgroundColor: '#3b82f6', paddingVertical: 12, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    enrollButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
    errorText: { fontSize: 16, color: '#ef4444', marginBottom: 16 },
    retryButton: { backgroundColor: '#3b82f6', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
    retryButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
    noCourseText: { fontSize: 16, color: '#666' },
});
