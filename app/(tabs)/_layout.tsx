import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

function CustomHeader() {
    return (
        <SafeAreaView edges={['top']} style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <View style={styles.logoIcon} />
                    <Text style={styles.logoText}>Skilline</Text>
                </View>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="search" size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="notifications" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                header: () => <CustomHeader />,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#999',
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e0e0e0',
                    height: 60 + insets.bottom, // ← Thêm padding bottom
                    paddingBottom: insets.bottom, // ← Safe area bottom
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="course"
                options={{
                    title: 'Course',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="lecture"
                options={{
                    title: 'Lecture',
                    href: null, // ← Thêm dòng này để ẩn khỏi bottom nav
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    title: 'Order',
                    href: null, // hide from bottom nav
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },

    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logoIcon: {
        width: 40,
        height: 40,
        backgroundColor: '#49BBBD',
        borderRadius: 8,
        marginRight: 10,
    },

    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1e293b',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});