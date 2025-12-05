import CategoryApi, { CategoryResponse } from '@/api/CategoryApi';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CategoryScreen() {
    const router = useRouter();
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleCategoryPress = (categoryId: number, categoryName: string) => {
        router.push({
            pathname: '/(tabs)/course',
            params: { categoryId: categoryId.toString(), categoryName },
        });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await CategoryApi.getCategories();

            if (response.code === 200 && response.data) {
                setCategories(response.data);
            } else {
                setError(response.message || 'Failed to fetch categories');
            }
        } catch (err) {
            console.error('[CategoryScreen] Fetch error:', err);
            setError('Failed to fetch categories. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#00b4d8" />
                <Text style={{ marginTop: 10, color: '#666' }}>Đang tải danh mục...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
                <Text style={[styles.errorText, { marginTop: 16 }]}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchCategories}>
                    <Text style={styles.retryButtonText}>Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (categories.length === 0) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Ionicons name="folder-outline" size={48} color="#ccc" />
                <Text style={{ marginTop: 16, color: '#999', fontSize: 16 }}>Không có danh mục nào</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Danh mục khóa học</Text>
                <Text style={styles.headerSubtitle}>Khám phá các khóa học theo chuyên mục</Text>
            </View>

            {/* Categories Grid */}
            <View style={styles.grid}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={styles.categoryCard}
                        onPress={() => handleCategoryPress(category.id, category.name)}
                    >
                        {/* Thumbnail */}
                        {category.urlThumbnail ? (
                            <Image
                                source={{ uri: category.urlThumbnail }}
                                style={styles.thumbnail}
                            />
                        ) : (
                            <View style={styles.thumbnailPlaceholder}>
                                <Ionicons name="folder" size={40} color="#fff" />
                            </View>
                        )}

                        {/* Overlay */}
                        <View style={styles.overlay} />

                        {/* Category Info */}
                        <View style={styles.categoryInfo}>
                            <Text style={styles.categoryName} numberOfLines={2}>
                                {category.name}
                            </Text>
                            <View style={styles.arrowIcon}>
                                <Ionicons name="arrow-forward" size={20} color="#fff" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Bottom Padding */}
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
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00264d',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
    },
    categoryCard: {
        width: '50%',
        aspectRatio: 1,
        padding: 10,
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    thumbnailPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#00b4d8',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: 12,
    },
    categoryInfo: {
        position: 'absolute',
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        borderRadius: 12,
        justifyContent: 'flex-end',
        paddingHorizontal: 12,
        paddingBottom: 12,
    },
    categoryName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        lineHeight: 22,
    },
    arrowIcon: {
        marginTop: 8,
        alignSelf: 'flex-start',
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
    bottomPadding: {
        height: 40,
    },
});
