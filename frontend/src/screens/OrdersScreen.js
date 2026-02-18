import React from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Appbar, Text, Surface, IconButton, Chip, useTheme as usePaperTheme, Button, Badge } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const OrdersScreen = ({ navigation }) => {
    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { count } = useCart();

    if (!user.isLoggedIn) return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header nav={navigation} colors={colors} count={count} />
            <View style={styles.empty}>
                <Surface style={styles.emptyIconCircle} elevation={1}>
                    <IconButton icon="lock-outline" size={50} iconColor={colors.primary} />
                </Surface>
                <Text style={[styles.emptyTitle, { color: colors.text }]}>Private Records</Text>
                <Text style={styles.emptySubtitle}>Please sign in to view your order history</Text>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Auth')}
                    style={styles.emptyBtn}
                    buttonColor={colors.primary}
                    textColor={isDarkMode ? '#000' : '#FFF'}
                    labelStyle={{ fontWeight: '900' }}
                >
                    SIGN IN
                </Button>
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
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { order: item })} activeOpacity={0.8}>
                            <OrderCard order={item} isDark={isDarkMode} colors={colors} />
                        </TouchableOpacity>
                    )}
                    contentContainerStyle={{ padding: 25, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.empty}>
                    <Surface style={styles.emptyIconCircle} elevation={1}>
                        <IconButton icon="package-variant" size={50} iconColor={colors.primary} />
                    </Surface>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>No Orders Yet</Text>
                    <Text style={styles.emptySubtitle}>Your future treasures will appear here once acquired.</Text>
                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate('Main')}
                        style={styles.exploreBtn}
                        textColor={colors.primary}
                        borderColor={colors.primary}
                    >
                        EXPLORE BOUTIQUE
                    </Button>
                </View>
            )}
        </View>
    );
};

const Header = ({ nav, colors, count }) => (
    <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => nav.goBack()} />
        <Text style={[styles.title, { color: colors.text }]}>MY ORDERS</Text>
        <TouchableOpacity onPress={() => nav.navigate('Cart')}>
            <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
            {count > 0 && <Badge style={{ position: 'absolute', top: 5, right: 5, backgroundColor: colors.primary }} size={16}>{count}</Badge>}
        </TouchableOpacity>
    </View>
);

const OrderCard = ({ order, isDark, colors }) => (
    <Surface
        style={[
            styles.card,
            { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }
        ]}
        elevation={0}
    >
        <View style={{ flex: 1, overflow: 'hidden' }}>
            <View style={styles.cardTop}>
                <View>
                    <Text style={[styles.oid, { color: colors.text }]}>ORDER #{order.id}</Text>
                    <Text style={styles.date}>{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
                </View>
                <Chip
                    style={{ backgroundColor: isDark ? 'rgba(212, 175, 55, 0.1)' : 'rgba(212, 175, 55, 0.1)' }}
                    textStyle={{ color: colors.primary, fontSize: 10, fontWeight: '900' }}
                >
                    {order.status.toUpperCase()}
                </Chip>
            </View>

            <View style={styles.items}>
                {order.items.slice(0, 3).map((item, i) => {
                    const originalProduct = products.find(p => p.id === item.id);
                    const displayImage = originalProduct ? originalProduct.image : item.image;

                    return (
                        <View key={i} style={[styles.thumbWrapper, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
                            <Image source={displayImage} style={styles.thumb} resizeMode="contain" />
                        </View>
                    );
                })}
                {order.items.length > 3 && (
                    <View style={[styles.more, { backgroundColor: isDark ? '#1A1A1A' : '#EEE' }]}>
                        <Text style={[styles.moreText, { color: colors.text }]}>+{order.items.length - 3}</Text>
                    </View>
                )}
            </View>

            <View style={[styles.cardBot, { borderTopColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }]}>
                <Text style={styles.paidLabel}>Investment</Text>
                <Text style={[styles.total, { color: colors.primary }]}>₹{order.total.toLocaleString()}</Text>
            </View>
        </View>
    </Surface>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    title: { fontSize: 16, fontWeight: '900', letterSpacing: 2 },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    emptyIconCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(212, 175, 55, 0.05)',
        marginBottom: 24
    },
    emptyTitle: { fontSize: 22, fontWeight: '800', marginBottom: 10, textAlign: 'center' },
    emptySubtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 30, lineHeight: 20 },
    emptyBtn: { borderRadius: 16, height: 56, width: '100%', justifyContent: 'center' },
    exploreBtn: { borderRadius: 16, height: 56, width: '100%', justifyContent: 'center', borderWidth: 1.5 },
    card: { borderRadius: 24, padding: 20, marginBottom: 20, overflow: 'hidden' },
    cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    oid: { fontWeight: '900', fontSize: 14, letterSpacing: 1 },
    date: { fontSize: 11, color: '#888', marginTop: 4, letterSpacing: 0.5 },
    items: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    thumbWrapper: { width: 50, height: 50, borderRadius: 12, marginRight: 10, justifyContent: 'center', alignItems: 'center', padding: 5 },
    thumb: { width: '100%', height: '100%' },
    more: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    moreText: { fontSize: 12, fontWeight: '900' },
    cardBot: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15, borderTopWidth: 1, alignItems: 'center' },
    paidLabel: { color: '#888', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
    total: { fontSize: 20, fontWeight: '900', letterSpacing: -0.5 }
});

export default OrdersScreen;
