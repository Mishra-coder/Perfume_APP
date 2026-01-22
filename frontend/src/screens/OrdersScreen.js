import React from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Appbar, Text, Surface, IconButton, Chip, useTheme as usePaperTheme, Button, Badge } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const OrdersScreen = ({ navigation }) => {
    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { count } = useCart();

    if (!user.isLoggedIn) return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header nav={navigation} colors={colors} count={count} />
            <View style={styles.empty}>
                <IconButton icon="lock" size={60} iconColor="#ccc" />
                <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>Sign in Required</Text>
                <Button mode="contained" onPress={() => navigation.navigate('Auth')} style={{ marginTop: 20 }} buttonColor={colors.primary}>Login</Button>
            </View>
        </View>
    );

    const orders = user.orders || [];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header nav={navigation} colors={colors} count={count} />
            {orders.length > 0 ? (
                <FlatList
                    data={orders}
                    keyExtractor={o => o.id.toString()}
                    renderItem={({ item }) => <OrderCard order={item} isDark={isDarkMode} colors={colors} />}
                    contentContainerStyle={{ padding: 20 }}
                />
            ) : (
                <View style={styles.empty}>
                    <IconButton icon="package-variant" size={60} iconColor="#eee" />
                    <Text style={{ color: '#aaa' }}>No orders found</Text>
                </View>
            )}
        </View>
    );
};

const Header = ({ nav, colors, count }) => (
    <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={() => nav.goBack()} color={colors.text} />
        <Appbar.Content title="My Orders" titleStyle={{ fontWeight: 'bold' }} />
        <TouchableOpacity onPress={() => nav.navigate('Cart')} style={{ marginRight: 10 }}>
            <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
            {count > 0 && <Badge style={{ position: 'absolute', top: 5, right: 5, backgroundColor: colors.primary }} size={16}>{count}</Badge>}
        </TouchableOpacity>
    </Appbar.Header>
);

const OrderCard = ({ order, isDark, colors }) => (
    <Surface style={[styles.card, { borderColor: isDark ? '#333' : '#eee' }]} elevation={0}>
        <View style={styles.cardTop}>
            <View>
                <Text style={[styles.oid, { color: colors.text }]}>Order #{order.id}</Text>
                <Text style={styles.date}>{new Date(order.date).toLocaleDateString()}</Text>
            </View>
            <Chip style={{ backgroundColor: isDark ? '#121' : '#efe' }} textStyle={{ color: isDark ? colors.primary : '#27ae60', fontSize: 10 }}>{order.status}</Chip>
        </View>

        <View style={styles.items}>
            {order.items.slice(0, 3).map((item, i) => (
                <Image key={i} source={item.image} style={styles.thumb} />
            ))}
            {order.items.length > 3 && <View style={styles.more}><Text style={{ fontSize: 10 }}>+{order.items.length - 3}</Text></View>}
        </View>

        <View style={[styles.cardBot, { borderTopColor: isDark ? '#222' : '#f9f9f9' }]}>
            <Text style={{ color: '#999' }}>Paid Amount</Text>
            <Text style={[styles.total, { color: isDark ? colors.primary : '#000' }]}>₹{order.total}</Text>
        </View>
    </Surface>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    card: { borderRadius: 16, padding: 15, marginBottom: 15, borderWidth: 1, backgroundColor: 'transparent' },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    oid: { fontWeight: 'bold' },
    date: { fontSize: 11, color: '#aaa' },
    items: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
    thumb: { width: 50, height: 50, borderRadius: 10, marginRight: 8 },
    more: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
    cardBot: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, borderTopWidth: 1, alignItems: 'center' },
    total: { fontSize: 18, fontWeight: '900' }
});

export default OrdersScreen;
