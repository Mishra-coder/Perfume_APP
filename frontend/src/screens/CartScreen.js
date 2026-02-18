import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Text, IconButton, Button, Surface, useTheme as usePaperTheme } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const CartScreen = ({ navigation }) => {
    const { cartItems, removeFromCart, updateQuantity, subtotal, taxAmount, shipping, finalTotal } = useCart();
    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    if (cartItems.length === 0) return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header nav={navigation} colors={colors} />
            <View style={styles.empty}>
                <Surface style={styles.emptyIconCircle} elevation={1}>
                    <IconButton icon="cart-outline" size={50} iconColor={colors.primary} />
                </Surface>
                <Text style={[styles.emptyTitle, { color: colors.text }]}>Your Bag is Empty</Text>
                <Text style={styles.emptySubtitle}>It seems you haven't added any fragrances to your collection yet.</Text>
                <Button
                    mode="contained"
                    onPress={() => navigation.navigate('Main')}
                    style={styles.emptyBtn}
                    buttonColor={colors.primary}
                    textColor={isDarkMode ? '#000' : '#FFF'}
                    labelStyle={{ fontWeight: '900' }}
                >
                    START SHOPPING
                </Button>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header nav={navigation} colors={colors} />
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <CartItem
                        product={item}
                        isDark={isDarkMode}
                        colors={colors}
                        onDel={() => removeFromCart(item.id)}
                        onEdit={(v) => updateQuantity(item.id, v)}
                    />
                )}
                contentContainerStyle={{ padding: 25, paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            />
            <Summary sub={subtotal} tax={taxAmount} ship={shipping} total={finalTotal} onGo={() => navigation.navigate(user.isLoggedIn ? 'Checkout' : 'Auth')} isDark={isDarkMode} colors={colors} />
        </View>
    );
};

const Header = ({ nav, colors }) => (
    <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => nav.goBack()} />
        <Text style={[styles.title, { color: colors.text }]}>MY BAG</Text>
        <View style={{ width: 48 }} />
    </View>
);

const CartItem = ({ product, onEdit, onDel, isDark, colors }) => (
    <Surface
        style={[
            styles.itemCard,
            { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }
        ]}
        elevation={0}
    >
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}>
            <View style={[styles.imgWrapper, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
                <Image source={product.image} style={styles.img} />
            </View>
            <View style={styles.info}>
                <View style={styles.row}>
                    <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{product.name}</Text>
                    <IconButton icon="close" size={18} iconColor={colors.textSecondary} onPress={onDel} style={{ margin: 0 }} />
                </View>
                <Text style={styles.cat}>{product.category} • {product.type || 'EDP'}</Text>
                <View style={styles.row}>
                    <Text style={[styles.price, { color: colors.primary }]}>₹{(product.price * product.quantity).toLocaleString()}</Text>
                    <View style={[styles.qtyBox, { backgroundColor: isDark ? '#1A1A1A' : '#EEE' }]}>
                        <TouchableOpacity onPress={() => onEdit(-1)} style={styles.qtyBtn}>
                            <Text style={[styles.qtyBtnText, { color: colors.text }]}>−</Text>
                        </TouchableOpacity>
                        <Text style={[styles.qtyText, { color: colors.text }]}>{product.quantity}</Text>
                        <TouchableOpacity onPress={() => onEdit(1)} style={styles.qtyBtn}>
                            <Text style={[styles.qtyBtnText, { color: colors.text }]}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    </Surface>
);

const Summary = ({ sub, tax, ship, total, onGo, isDark, colors }) => (
    <Surface style={[styles.summary, { backgroundColor: isDark ? '#050505' : '#FFF', borderTopColor: isDark ? '#1F1F1F' : '#EEE' }]} elevation={4}>
        <Row label="Subtotal" val={sub} colors={colors} />
        <Row label="GST (18%)" val={tax} colors={colors} />
        <Row label="Eco-Friendly Delivery" val={ship} colors={colors} isGold={ship === 0} />
        <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
            <Text style={[styles.totalVal, { color: colors.primary }]}>₹{total.toLocaleString()}</Text>
        </View>
        <Button
            mode="contained"
            onPress={onGo}
            style={styles.btn}
            contentStyle={styles.btnContent}
            buttonColor={colors.primary}
            labelStyle={[styles.btnLabel, { color: isDark ? '#000' : '#FFF' }]}
        >
            CHECKOUT
        </Button>
    </Surface>
);

const Row = ({ label, val, colors, isGold }) => (
    <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={[styles.summaryVal, { color: isGold ? colors.primary : colors.text }]}>
            {val === 0 ? 'COMPLIMENTARY' : `₹${val.toLocaleString()}`}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 16,
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
    exploreBtn: { borderRadius: 16, height: 56, width: '100%', justifyContent: 'center' },
    itemCard: {
        marginBottom: 20,
        borderRadius: 24,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgWrapper: {
        width: 100,
        height: 100,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    img: { width: '100%', height: '100%', resizeMode: 'contain' },
    info: { flex: 1, marginLeft: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    name: { fontSize: 16, fontWeight: '700', flex: 1, letterSpacing: -0.3 },
    cat: { fontSize: 12, color: '#888', marginTop: 4, marginBottom: 8 },
    price: { fontSize: 18, fontWeight: '900', letterSpacing: -0.5 },
    qtyBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        paddingHorizontal: 4
    },
    qtyBtn: { padding: 8 },
    qtyBtnText: { fontSize: 18, fontWeight: '600' },
    qtyText: { fontSize: 14, fontWeight: '700', marginHorizontal: 8 },
    summary: {
        padding: 24,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    totalLabel: { fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
    totalVal: { fontSize: 26, fontWeight: '900', letterSpacing: -1 },
    btn: {
        borderRadius: 20,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10
    },
    btnLabel: { fontWeight: '900', fontSize: 16, letterSpacing: 1 }
});

export default CartScreen;
