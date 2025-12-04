import { CourseApi, CourseResponse } from '@/api/CourseApi';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LectureApi, { LectureResponse } from '@/api/LectureApi';

export default function CourseScreen() {
    const [courses, setCourses] = useState<CourseResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const resp = await CourseApi.getCourses(1, 1000);

            console.log('[CourseScreen] API Response:', resp);

            if (resp.code === 200 && resp.data) {
                setCourses(resp.data.list || []);
            } else {
                setError(resp.message || 'Failed to fetch courses');
            }
        } catch (err) {
            console.error('[CourseScreen] Fetch error:', err);
            setError('Failed to fetch courses. Please try again.');
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
                <TouchableOpacity style={styles.retryButton} onPress={fetchCourses}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (courses.length === 0) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={styles.noCourseText}>No courses available</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </ScrollView>
    );
}

// ============ Course Card Component ============
interface CourseCardProps {
    course: CourseResponse;
}

interface LectureWithExpanded extends LectureResponse {
    expanded: boolean;
}

function CourseCard({ course }: CourseCardProps) {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [lectures, setLectures] = useState<LectureWithExpanded[]>([]);
    const [isLoadingLectures, setIsLoadingLectures] = useState(false);

    const fetchLectures = async () => {
        try {
            setIsLoadingLectures(true);
            const response = await LectureApi.getLecturesNotPagi(course.id);
            
            if (response.code === 200 && response.data) {
                const lecturesWithExpanded = response.data.map(lecture => ({
                    ...lecture,
                    expanded: false,
                }));
                setLectures(lecturesWithExpanded);
            }
        } catch (err) {
            console.error('[CourseCard] Fetch lectures error:', err);
        } finally {
            setIsLoadingLectures(false);
        }
    };

    const handleCoursePress = () => {
        if (!isExpanded) {
            fetchLectures();
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <View style={styles.courseContainer}>
            {/* Card Header with Thumbnail - Click to expand */}
            <TouchableOpacity onPress={handleCoursePress}>
                <View style={styles.cardHeader}>
                    {course.thumbnail_url ? (
                        <Image
                            source={{ uri: course.thumbnail_url }}
                            style={styles.thumbnail}
                        />
                    ) : (
                        <View style={styles.thumbnailPlaceholder}>
                            <Ionicons name="book" size={40} color="#fff" />
                        </View>
                    )}

                    {/* Category Badge */}
                    <View style={styles.categoryBadge}>
                        <Text style={styles.categoryBadgeText}>{course.categoryName}</Text>
                    </View>

                    {/* Level Badge */}
                    <View style={[styles.levelBadge, getLevelBadgeStyle(course.level)]}>
                        <Text style={styles.levelBadgeText}>{course.level}</Text>
                    </View>

                    {/* Expand Icon */}
                    <View style={styles.expandIcon}>
                        <Ionicons 
                            name={isExpanded ? "chevron-up" : "chevron-down"} 
                            size={24} 
                            color="#fff" 
                        />
                    </View>
                </View>
            </TouchableOpacity>

            {/* Card Content */}
            <View style={styles.cardContent}>
                <Text style={styles.courseTitle} numberOfLines={2}>
                    {course.title}
                </Text>

                <Text style={styles.price}>
                    {course.price === 0 || course.price === null ? 'Free' : `$${course.price}`}
                </Text>

                <View style={styles.metaContainer}>
                    <View style={styles.metaItem}>
                        <Ionicons name="calendar-outline" size={14} color="#666" />
                        <Text style={styles.metaText}>
                            {new Date(course.createAt).toLocaleDateString()}
                        </Text>
                    </View>
                    <View style={styles.statusBadge}>
                        <View
                            style={[
                                styles.statusDot,
                                course.status ? styles.statusActive : styles.statusInactive,
                            ]}
                        />
                        <Text style={styles.statusText}>
                            {course.status ? 'Active' : 'Inactive'}
                        </Text>
                    </View>
                </View>

                {/* Enroll Button */}
                <TouchableOpacity
                    style={styles.enrollButton}
                    onPress={() => {
                        router.push({
                            pathname: '/(tabs)/order',
                            params: {
                                courseId: String(course.id),
                                title: course.title,
                                price: String(course.price),
                            },
                        });
                    }}
                >
                    <Text style={styles.enrollButtonText}>Enroll Now</Text>
                </TouchableOpacity>
            </View>

            {/* Expanded Lectures Section */}
            {isExpanded && (
                <View style={styles.lecturesContainer}>
                    <View style={styles.lectureHeader}>
                        <Text style={styles.lectureHeaderText}>Danh sách bài giảng ({lectures.length})</Text>
                    </View>

                    {isLoadingLectures ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#00b4d8" />
                        </View>
                    ) : lectures.length > 0 ? (
                        <View>
                            {lectures.map((lecture, index) => (
                                <View key={lecture.id}>
                                    <View style={styles.lectureItem}>
                                        <View style={styles.lectureInfo}>
                                            <Text style={styles.lectureNumber}>Bài {index + 1}</Text>
                                            <Text style={styles.lectureName} numberOfLines={2}>
                                                {lecture.title}
                                            </Text>
                                            {lecture.duration && (
                                                <Text style={styles.lectureDuration}>{lecture.duration}</Text>
                                            )}
                                        </View>
                                    </View>
                                    {index !== lectures.length - 1 && <View style={styles.lectureSeparator} />}
                                </View>
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyLectures}>
                            <Text style={styles.emptyLecturesText}>Không có bài giảng</Text>
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

// ============ Helper Functions ============
function getLevelBadgeStyle(level: string) {
    switch (level) {
        case 'BEGINNER':
            return styles.levelBeginner;
        case 'INTERMEDIATE':
            return styles.levelIntermediate;
        case 'ADVANCED':
            return styles.levelAdvanced;
        default:
            return styles.levelBeginner;
    }
}

// ============ Styles ============
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    courseContainer: {
        margin: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        position: 'relative',
        height: 180,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    thumbnailPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#3b82f6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#3b82f6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    categoryBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    levelBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    levelBeginner: {
        backgroundColor: '#10b981',
    },
    levelIntermediate: {
        backgroundColor: '#f59e0b',
    },
    levelAdvanced: {
        backgroundColor: '#ef4444',
    },
    levelBadgeText: {
        color: '#fff',
        fontSize: 11,
        fontWeight: '600',
    },
    cardContent: {
        padding: 16,
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 12,
        lineHeight: 22,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3b82f6',
        marginBottom: 12,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaText: {
        fontSize: 12,
        color: '#666',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    statusActive: {
        backgroundColor: '#10b981',
    },
    statusInactive: {
        backgroundColor: '#ef4444',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
    },
    enrollButton: {
        backgroundColor: '#3b82f6',
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    enrollButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    errorText: {
        fontSize: 16,
        color: '#ef4444',
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: '#3b82f6',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    noCourseText: {
        fontSize: 16,
        color: '#666',
    },
    expandIcon: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 4,
    },
    lecturesContainer: {
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        backgroundColor: '#fafafa',
    },
    lectureHeader: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    lectureHeaderText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    loadingContainer: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lectureItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'flex-start',
    },
    lectureInfo: {
        flex: 1,
    },
    lectureNumber: {
        fontSize: 12,
        color: '#00b4d8',
        fontWeight: '600',
        marginBottom: 4,
    },
    lectureName: {
        fontSize: 13,
        color: '#333',
        marginBottom: 4,
        lineHeight: 18,
    },
    lectureDuration: {
        fontSize: 11,
        color: '#999',
    },
    lectureSeparator: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginHorizontal: 16,
    },
    emptyLectures: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyLecturesText: {
        fontSize: 13,
        color: '#999',
    },
});