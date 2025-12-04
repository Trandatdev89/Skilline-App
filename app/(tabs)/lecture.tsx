// app/lecture.tsx hoặc app/(tabs)/lecture.tsx
import LectureApi, { LectureResponse } from '@/api/LectureApi';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';

interface LectureWithExpanded extends LectureResponse {
    expanded: boolean;
}

export default function LectureScreen() {
    const { courseId } = useLocalSearchParams();
    const [lectures, setLectures] = useState<LectureWithExpanded[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [selectedLectureTitle, setSelectedLectureTitle] = useState<string>('');
    const [selectedLectureId, setSelectedLectureId] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isLoadingVideo, setIsLoadingVideo] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
    const [checkingEnrollment, setCheckingEnrollment] = useState(true);

    useEffect(() => {
        checkEnrollment();
        fetchLectures();
    }, [courseId]);

    const checkEnrollment = async () => {
        try {
            setCheckingEnrollment(true);

            if (!courseId) {
                setIsEnrolled(false);
                return;
            }

            const response = await LectureApi.checkUserEnrollment(courseId as string);

            if (response.code === 200 && response.data !== undefined) {
                setIsEnrolled(response.data);
                console.log('[LectureScreen] Enrollment status:', response.data);
            } else {
                console.error('[LectureScreen] Failed to check enrollment:', response.message);
                setIsEnrolled(false);
            }
        } catch (err) {
            console.error('[LectureScreen] Enrollment check error:', err);
            setIsEnrolled(false);
        } finally {
            setCheckingEnrollment(false);
        }
    };

    const fetchLectures = async () => {
        try {
            setIsLoading(true);
            setError(null);

            if (!courseId) {
                setError('Course ID is required');
                return;
            }

            const response = await LectureApi.getLecturesNotPagi(courseId as string);

            if (response.code === 200 && response.data) {
                // Map API data to include expanded state
                const lecturesWithExpanded = response.data.map(lecture => ({
                    ...lecture,
                    expanded: false,
                }));
                setLectures(lecturesWithExpanded);
            } else {
                setError(response.message || 'Failed to fetch lectures');
            }
        } catch (err) {
            console.error('[LectureScreen] Fetch error:', err);
            setError('Failed to fetch lectures. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleLecture = (id: string) => {
        setLectures(lectures.map(lecture =>
            lecture.id === id ? { ...lecture, expanded: !lecture.expanded } : lecture
        ));
    };

    const openVideoModal = (lectureTitle: string) => {
        setSelectedLectureTitle(lectureTitle);
        setShowVideoModal(true);
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
        setSelectedLectureTitle('');
        setSelectedLectureId('');
        setVideoUrl(null);
    };

    const fetchVideoStream = async (lectureId: string) => {
        try {
            setIsLoadingVideo(true);
            const token = await AsyncStorage.getItem('accessToken');

            const response = await fetch(
                `http://localhost:8080/api/lecture/stream/${lectureId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                setVideoUrl(url);
                setSelectedLectureId(lectureId);
            } else {
                console.error('Failed to fetch video:', response.status);
                alert('Không thể tải video. Vui lòng thử lại.');
            }
        } catch (err) {
            console.error('[LectureScreen] Error fetching video stream:', err);
            alert('Lỗi: Không thể tải video');
        } finally {
            setIsLoadingVideo(false);
        }
    };

    if (isLoading || checkingEnrollment) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#00b4d8" />
                <Text style={{ marginTop: 10, color: '#666' }}>Đang tải nội dung khóa học...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
                <Text style={[styles.errorText, { marginTop: 16 }]}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchLectures}>
                    <Text style={styles.retryButtonText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (lectures.length === 0 && isEnrolled !== false) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="book-outline" size={48} color="#ccc" />
                <Text style={{ marginTop: 16, color: '#999', fontSize: 16 }}>Không có bài giảng nào</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nội dung khóa học</Text>
            </View>

            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle} numberOfLines={2}>
                    {lectures[0]?.courseName || 'Khóa học'}
                </Text>
                <TouchableOpacity style={styles.timelineButton}>
                    <Text style={styles.timelineText}>Timeline</Text>
                </TouchableOpacity>
            </View>

            {/* Lecture List */}
            <View style={styles.lectureList}>
                {lectures.map((lecture, index) => (
                    <View key={lecture.id}>
                        <TouchableOpacity
                            style={styles.lectureItem}
                            onPress={() => toggleLecture(lecture.id)}
                        >
                            <View style={styles.lectureLeft}>
                                <Ionicons
                                    name={lecture.expanded ? "play-circle" : "play-circle-outline"}
                                    size={24}
                                    color="#333"
                                />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.lecturePosition}>
                                        Bài {index + 1}
                                    </Text>
                                    <Text style={styles.lectureTitle} numberOfLines={2}>
                                        {lecture.title}
                                    </Text>
                                    {lecture.duration && (
                                        <Text style={styles.lectureDuration}>{lecture.duration}</Text>
                                    )}
                                </View>
                            </View>
                            {isEnrolled && (
                                <TouchableOpacity
                                    style={styles.linkButton}
                                    onPress={() => {
                                        openVideoModal(lecture.title || 'Video Lecture');
                                        fetchVideoStream(lecture.id);
                                    }}
                                >
                                    <Text style={styles.linkText}>Vào học</Text>
                                </TouchableOpacity>
                            )}
                            {!isEnrolled && (
                                <View style={styles.lockIcon}>
                                    <Ionicons name="lock-closed" size={20} color="#ff9500" />
                                </View>
                            )}
                        </TouchableOpacity>

                        {/* Separator */}
                        {index !== lectures.length - 1 && (
                            <View style={styles.separator} />
                        )}
                    </View>
                ))}
            </View>

            {/* Add more sections if needed */}
            <View style={styles.bottomPadding} />

            {/* Video Modal Dialog */}
            <Modal
                visible={showVideoModal}
                animationType="slide"
                transparent={false}
                onRequestClose={closeVideoModal}
            >
                <View style={styles.modalContainer}>
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeVideoModal}
                        >
                            <Ionicons name="chevron-back" size={28} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle} numberOfLines={1}>
                            {selectedLectureTitle}
                        </Text>
                        <View style={{ width: 28 }} />
                    </View>

                    {/* Video Player Container */}
                    <View style={styles.videoContainer}>
                        {isLoadingVideo ? (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color="#00b4d8" />
                                <Text style={styles.loadingText}>Đang tải video...</Text>
                            </View>
                        ) : videoUrl ? (
                            <Video
                                source={{
                                    uri: videoUrl
                                }}
                                style={styles.videoPlayer}
                                controls={true}
                                resizeMode="contain"
                                onError={(error: any) => {
                                    console.log('Video error:', error);
                                    alert('Lỗi phát video');
                                }}
                            />
                        ) : (
                            <View style={styles.loadingContainer}>
                                <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
                                <Text style={styles.errorMessage}>Không thể tải video</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

// Helper function to generate YouTube player HTML
function getYouTubePlayerHtml(youtubeUrl: string): string {
    // Extract video ID from YouTube URL
    let videoId = '';
    if (youtubeUrl.includes('youtube.com/watch?v=')) {
        videoId = youtubeUrl.split('v=')[1]?.split('&')[0] || '';
    } else if (youtubeUrl.includes('youtu.be/')) {
        videoId = youtubeUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    }

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background-color: #000;
                }
                .container {
                    position: relative;
                    width: 100%;
                    padding-bottom: 56.25%; /* 16:9 */
                    height: 0;
                }
                iframe {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
        </body>
        </html>
    `;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00264d',
    },
    sectionHeader: {
        backgroundColor: '#00b4d8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        marginTop: 2,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    timelineButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    timelineText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    lectureList: {
        backgroundColor: '#fff',
    },
    lectureItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    lectureLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    lecturePosition: {
        fontSize: 12,
        color: '#00b4d8',
        fontWeight: '600',
        marginBottom: 4,
    },
    lectureTitle: {
        fontSize: 15,
        color: '#333',
        flex: 1,
        lineHeight: 22,
    },
    lectureDuration: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    linkButton: {
        marginLeft: 12,
    },
    linkText: {
        color: '#00b4d8',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    lockIcon: {
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginHorizontal: 20,
    },
    bottomPadding: {
        height: 40,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 16,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#00b4d8',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    // Video Modal Styles
    modalContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#1a1a1a',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    closeButton: {
        padding: 8,
    },
    videoContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoPlayer: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 12,
    },
    errorMessage: {
        color: '#ef4444',
        fontSize: 16,
        marginTop: 12,
    },
    videoPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    videoText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 16,
        fontWeight: '600',
    },
    openButton: {
        backgroundColor: '#ff0000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
    },
    openButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    webview: {
        flex: 1,
    },
});