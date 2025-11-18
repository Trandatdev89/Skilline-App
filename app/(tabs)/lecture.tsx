// app/lecture.tsx hoặc app/(tabs)/lecture.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Lecture {
    id: number;
    title: string;
    expanded: boolean;
}

export default function LectureScreen() {
    const [lectures, setLectures] = useState<Lecture[]>([
        { id: 1, title: 'Bài 1 : Vì sao nên học lập trình Python | Công cụ, tài liệu học Python', expanded: false },
        { id: 2, title: 'Bài 2 : Câu lệnh print và các kiểu dữ liệu trong Python', expanded: false },
        { id: 3, title: 'Bài 3 : Chú thích trong Python', expanded: false },
        { id: 4, title: 'Bài 4 : Biến và Kiểu dữ liệu trong Python | Ép kiểu', expanded: false },
        { id: 5, title: 'Bài 5 : Toán tử trong Python', expanded: false },
        { id: 6, title: 'Bài 6 : Nhập dữ liệu từ bàn phím trong Python bằng hàm input và hàm map', expanded: false },
        { id: 7, title: 'Bài 7 : Các hàm phổ biến trong Python (sqrt, pow, floor, factorial, gcd, sum..)', expanded: false },
        { id: 8, title: 'Bài 8 : Cấu trúc rẽ nhánh (if else) trong Python', expanded: false },
        { id: 9, title: 'Bài 9 : Hướng dẫn sử dụng website chấm bài Hackerrank', expanded: false },
        { id: 10, title: 'Bài 10 : Hướng dẫn contest 0 (Làm quen Hackerrank) từ bài 1 tới bài 5', expanded: false },
    ]);

    const toggleLecture = (id: number) => {
        setLectures(lectures.map(lecture =>
            lecture.id === id ? { ...lecture, expanded: !lecture.expanded } : lecture
        ));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nội dung khóa học</Text>
            </View>

            {/* Section Header */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                    PHẦN 1 : KIỂU DỮ LIỆU, VÒNG LẶP, HÀM, TOÁN TỬ
                </Text>
                <TouchableOpacity style={styles.timelineButton}>
                    <Text style={styles.timelineText}>Timeline</Text>
                </TouchableOpacity>
            </View>

            {/* Lecture List */}
            <View style={styles.lectureList}>
                {lectures.map((lecture) => (
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
                                <Text style={styles.lectureTitle}>{lecture.title}</Text>
                            </View>
                            <TouchableOpacity style={styles.linkButton}>
                                <Text style={styles.linkText}>Vào học</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        {/* Separator */}
                        {lecture.id !== lectures.length && (
                            <View style={styles.separator} />
                        )}
                    </View>
                ))}
            </View>

            {/* Add more sections if needed */}
            <View style={styles.bottomPadding} />
        </ScrollView>
    );
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
    lectureTitle: {
        fontSize: 15,
        color: '#333',
        flex: 1,
        lineHeight: 22,
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
});