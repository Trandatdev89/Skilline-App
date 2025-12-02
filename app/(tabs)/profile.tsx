import { useAuth } from '@/hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        Alert.alert(
            'Đăng xuất',
            'Bạn có chắc chắn muốn đăng xuất?',
            [
                { text: 'Hủy', style: 'cancel' },
                {
                    text: 'Đăng xuất',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await logout();
                            // Navigation sẽ tự động trigger từ useProtectedRoute
                        } catch {
                            Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Ionicons name="person" size={50} color="#fff" />
                    </View>
                </View>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.email}>john.doe@example.com</Text>
            </View>

            {/* Profile Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>42</Text>
                    <Text style={styles.statLabel}>Posts</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>1.2K</Text>
                    <Text style={styles.statLabel}>Followers</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>328</Text>
                    <Text style={styles.statLabel}>Following</Text>
                </View>
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {[
                    { icon: 'cart-outline', label: 'Khoá học đã mua', action: 'purchased' },
                    { icon: 'person-outline', label: 'Edit Profile' },
                    { icon: 'heart-outline', label: 'Favorites' },
                    { icon: 'bookmark-outline', label: 'Saved' },
                ].map((item: any, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} onPress={() => {
                        if (item.action === 'purchased') {
                            router.push('/purchased');
                            return;
                        }
                    }}>
                        <Ionicons name={item.icon} size={24} color="#333" />
                        <Text style={styles.menuText}>{item.label}</Text>
                        <Ionicons name="chevron-forward" size={20} color="#999" />
                    </TouchableOpacity>
                ))}

                {/* Logout Button */}
                <TouchableOpacity
                    style={[styles.menuItem, styles.logoutItem]}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                    <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    profileHeader: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
        paddingVertical: 32,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    email: {
        fontSize: 14,
        color: '#666',
    },
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        justifyContent: 'space-around',
        marginTop: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    menuContainer: {
        backgroundColor: '#ffffff',
        marginTop: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 16,
    },
    logoutItem: {
        marginTop: 10,
        borderBottomWidth: 0,
    },
    logoutText: {
        color: '#ef4444',
    },
});