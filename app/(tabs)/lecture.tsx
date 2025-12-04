// app/lecture.tsx hoặc app/(tabs)/lecture.tsx
import LectureApi, { LectureResponse, getVideoStreamUrl } from '@/api/LectureApi';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface LectureWithExpanded extends LectureResponse {
    expanded: boolean;
}

export default function LectureScreen() {
    const { courseId } = useLocalSearchParams();
    const [lectures, setLectures] = useState<LectureWithExpanded[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null);
    const [selectedLectureTitle, setSelectedLectureTitle] = useState<string>('');
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [videoStreamUrl, setVideoStreamUrl] = useState<string | null>(null);
    const [isLoadingVideo, setIsLoadingVideo] = useState(false);

    useEffect(() => {
        fetchLectures();
    }, [courseId]);

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

    const handlePlayVideo = async (lectureId: string) => {
        try {
            setIsLoadingVideo(true);
            setShowVideoModal(true);
            const streamUrl = await getVideoStreamUrl(lectureId);
            setVideoStreamUrl(streamUrl);
        } catch (err) {
            console.error('[LectureScreen] Error loading video stream:', err);
            alert('Failed to load video. Please try again.');
            setShowVideoModal(false);
        } finally {
            setIsLoadingVideo(false);
        }
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
        setVideoStreamUrl(null);
        setSelectedLectureId(null);
    };

    if (isLoading) {
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

    if (lectures.length === 0) {
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
                                        Bài {lecture.position || index + 1}
                                    </Text>
                                    <Text style={styles.lectureTitle} numberOfLines={2}>
                                        {lecture.title}
                                    </Text>
                                    {lecture.duration && (
                                        <Text style={styles.lectureDuration}>{lecture.duration}</Text>
                                    )}
                                </View>
                            </View>
                            <TouchableOpacity
                                style={styles.linkButton}
                                onPress={() => {
                                    setSelectedLectureId(lecture.id);
                                    setSelectedLectureTitle(lecture.title || 'Video Lecture');
                                    handlePlayVideo(lecture.id);
                                }}
                            >
                                <Text style={styles.linkText}>Vào học</Text>
                            </TouchableOpacity>
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
                transparent={true}
                onRequestClose={closeVideoModal}
            >
                <View style={styles.modalContainer}>
                    {/* Modal Header */}
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle} numberOfLines={1}>
                            {selectedLectureTitle}
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={closeVideoModal}
                        >
                            <Ionicons name="close" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    {/* Video Player Container */}
                    {isLoadingVideo ? (
                        <View style={styles.videoLoadingContainer}>
                            <ActivityIndicator size="large" color="#00b4d8" />
                            <Text style={styles.videoLoadingText}>Đang tải video...</Text>
                        </View>
                    ) : videoStreamUrl ? (
                        <View style={styles.videoContainer}>
                            <WebView
                                source={{ html: getVideoPlayerHtml(videoStreamUrl) }}
                                style={styles.webview}
                                scalesPageToFit={true}
                                javaScriptEnabled={true}
                                allowsFullscreenVideo={true}
                            />
                        </View>
                    ) : (
                        <View style={styles.videoErrorContainer}>
                            <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
                            <Text style={styles.videoErrorText}>Không thể tải video</Text>
                            <TouchableOpacity
                                style={styles.retryVideoButton}
                                onPress={() => {
                                    if (selectedLectureId) {
                                        handlePlayVideo(selectedLectureId);
                                    }
                                }}
                            >
                                <Text style={styles.retryVideoButtonText}>Thử lại</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </Modal>
        </ScrollView>
    );
}

// Helper function to generate HTML for video player
function getVideoPlayerHtml(videoUrl: string): string {
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
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                video {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            </style>
        </head>
        <body>
            <video controls>
                <source src="${videoUrl}" type="application/x-mpegURL">
                Your browser does not support the video tag.
            </video>
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
        marginRight: 12,
    },
    closeButton: {
        padding: 8,
    },
    videoContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    webview: {
        flex: 1,
    },
    videoLoadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    videoLoadingText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 12,
    },
    videoErrorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    videoErrorText: {
        color: '#ef4444',
        fontSize: 16,
        marginTop: 12,
    },
    retryVideoButton: {
        backgroundColor: '#00b4d8',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    retryVideoButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});