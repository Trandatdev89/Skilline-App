import { AuthApi, UserEntity } from '@/api/AuthApi';
import OrderApi from '@/api/OrderApi';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function OrderPage() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const courseId = params.courseId ?? '';
    const title = (params.title && decodeURIComponent(params.title as string)) || 'Course';
    const price = Number(params.price) || 0;

    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        let mounted = true;
        async function fetchUser() {
            try {
                const res = await AuthApi.getUserInfo();
                if (!mounted) return;
                if (res && res.code === 200 && res.data) {
                    const user: UserEntity = res.data;
                    if (user.fullname) setFullname(user.fullname);
                    if (user.phone) setPhone(user.phone);
                    if (user.email) setEmail(user.email);
                }
            } catch (err) {
                // swallow silently for now; could surface with an AlertService
                console.warn('[OrderPage] failed to load user info', err);
            }
        }

        fetchUser();

        return () => { mounted = false; };
    }, []);


    const handlePay = async () => {


        const orderReq = {
            totalPrice: price,
            status: 'PENDING',
            courseId: Array.of(courseId),
            quantity: 1
        }

        const responseOrder = await OrderApi.saveOrder(orderReq);

        console.log(responseOrder.data);

        if (responseOrder.code === 200) {
            const responsePaymentOnline = await OrderApi.vnPayment({
                'orderId': parseInt(responseOrder?.data.id),
                'amount': responseOrder?.data.totalPrice,
                'orderInfo': `Nguời dùng có id ${responseOrder?.data.userId} chuyển khoản`,
                'courses': Array.of(courseId),
                'userId': responseOrder?.data.userId
            })

            console.log(responsePaymentOnline);
            console.log(responsePaymentOnline.url);

            const paymentUrl = responsePaymentOnline.url;
            if (!paymentUrl) {
                alert('Không lấy được URL thanh toán');
                return;
            }

            if (Platform.OS === 'web') {
                (window as any).location.href = paymentUrl;
                setTimeout(() => {
                    router.replace('/success');
                }, 2000);
            } else {
                await WebBrowser.openBrowserAsync(paymentUrl);
                router.replace('/success');
            }
        }

    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={[styles.inner]}>
                {/* Vertical stack: cart first, then student info */}
                <View style={styles.right}>
                    <Text style={styles.cartHeader}>Danh sách khóa học</Text>
                    <View style={styles.courseCard}>
                        <View style={styles.thumbPlaceholder} />
                        <View style={styles.courseInfo}>
                            <Text style={styles.courseTitle} numberOfLines={2}>{title}</Text>
                            <Text style={styles.coursePrice}>{price.toLocaleString()} VND</Text>
                        </View>
                    </View>

                    <View style={styles.totalBox}>
                        <Text style={styles.totalLabel}>Tổng tiền</Text>
                        <Text style={styles.totalValue}>{price.toLocaleString()} VND</Text>
                    </View>
                </View>

                <View style={styles.left}>
                    <Text style={styles.header}>Thông tin học viên</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Họ và tên *"
                        value={fullname}
                        onChangeText={setFullname}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Số điện thoại *"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email *"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                    <TouchableOpacity style={styles.payButton} onPress={handlePay}>
                        <Text style={styles.payButtonText}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f7fb' },
    inner: { flexDirection: 'column', padding: 20, gap: 20 },
    left: { width: '100%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
    right: { width: '100%', marginBottom: 12 },
    header: { fontSize: 20, fontWeight: '700', marginBottom: 16, color: '#1e3a8a' },
    input: { height: 48, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
    payButton: { backgroundColor: '#1e40af', paddingVertical: 14, borderRadius: 8, marginTop: 12 },
    payButtonText: { color: '#fff', textAlign: 'center', fontWeight: '700' },
    cartHeader: { fontSize: 18, fontWeight: '700', color: '#1e3a8a', marginBottom: 12 },
    courseCard: { backgroundColor: '#fff', borderRadius: 10, padding: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    thumbPlaceholder: { width: 64, height: 48, backgroundColor: '#e2e8f0', borderRadius: 6, marginRight: 12 },
    courseInfo: { flex: 1 },
    courseTitle: { fontSize: 14, fontWeight: '700', marginBottom: 6 },
    coursePrice: { color: '#ef4444', fontWeight: '800' },
    totalBox: { backgroundColor: '#fff', borderRadius: 10, padding: 16, marginTop: 20 },
    totalLabel: { color: '#374151', fontSize: 14 },
    totalValue: { color: '#06b6d4', fontSize: 18, fontWeight: '800', marginTop: 6 },
});
