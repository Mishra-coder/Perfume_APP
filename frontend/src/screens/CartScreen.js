import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
                <IconButton icon="cart-outline" size={60} iconColor="#ccc" />
                <Text style={{ color: '#888', marginBottom: 20 }}>Your bag is empty</Text>
                <Button mode="outlined" onPress={() => navigation.navigate('Main')} textColor={colors.text}>Shop Now</Button>
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
                    <Item
                        product={item}
                        isDark={isDarkMode}
                        colors={colors}
                        onDel={() => removeFromCart(item.id)}
                        onEdit={(v) => updateQuantity(item.id, v)}
                    />
                )}
                contentContainerStyle={{ padding: 25 }}
            />
            <Summary sub={subtotal} tax={taxAmount} ship={shipping} total={finalTotal} onGo={() => navigation.navigate(user.isLoggedIn ? 'Checkout' : 'Auth')} isDark={isDarkMode} colors={colors} />
        </View>
    );
};

const Header = ({ nav, colors }) => (
    <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => nav.goBack()} />
        <Text style={[styles.title, { color: colors.text }]}>My Bag</Text>
        <View style={{ width: 48 }} />
    </View>
);

const Item = ({ product, isDark, colors, onDel, onEdit }) => (
    <View style={styles.item}>
        <Image source={product.image} style={[styles.img, { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }]} />
        <View style={styles.info}>
            <View style={styles.row}>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{product.name}</Text>
                <IconButton icon="close" size={18} iconColor="#aaa" onPress={onDel} />
            </View>
            <Text style={styles.cat}>{product.category}</Text>
            <View style={styles.row}>
                <Text style={[styles.price, { color: isDark ? colors.primary : '#000' }]}>₹{product.price * product.quantity}</Text>
                <View style={[styles.qtyBox, { backgroundColor: isDark ? '#111' : '#f5f5f5' }]}>
                    <TouchableOpacity onPress={() => onEdit(-1)}><Text style={{ color: colors.text, padding: 5 }}>−</Text></TouchableOpacity>
                    <Text style={{ color: colors.text, marginHorizontal: 10 }}>{product.quantity}</Text>
                    <TouchableOpacity onPress={() => onEdit(1)}><Text style={{ color: colors.text, padding: 5 }}>+</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
);

const Summary = ({ sub, tax, ship, total, onGo, isDark, colors }) => (
    <Surface style={[styles.summary, { borderTopColor: isDark ? '#222' : '#eee' }]} elevation={0}>
        <Row label="Subtotal" val={sub} colors={colors} />
        <Row label="GST (12%)" val={tax} colors={colors} />
        <Row label="Shipping" val={ship} colors={colors} />
        <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Total</Text>
            <Text style={[styles.totalVal, { color: colors.primary }]}>₹{total}</Text>
        </View>
        <Button mode="contained" onPress={onGo} style={styles.btn} contentStyle={{ height: 56 }} labelStyle={{ color: isDark ? '#000' : '#fff' }} buttonColor={colors.primary}>Checkout</Button>
    </Surface>
);

const Row = ({ label, val, colors }) => (
    <View style={styles.summaryRow}>
        <Text style={{ color: '#888' }}>{label}</Text>
        <Text style={{ color: colors.text, fontWeight: 'bold' }}>₹{val}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 15 },
    title: { fontSize: 18, fontWeight: 'bold' },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    item: { flexDirection: 'row', marginBottom: 20 },
    img: { width: 80, height: 80, borderRadius: 12 },
    info: { flex: 1, marginLeft: 15 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    name: { fontSize: 16, fontWeight: 'bold', flex: 1 },
    cat: { fontSize: 12, color: '#888' },
    price: { fontSize: 16, fontWeight: '900' },
    qtyBox: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingHorizontal: 8 },
    summary: { padding: 25, borderTopWidth: 1, backgroundColor: 'transparent' },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 20 },
    totalLabel: { fontSize: 18, fontWeight: 'bold' },
    totalVal: { fontSize: 22, fontWeight: '900' },
    btn: { borderRadius: 12 }
});

export default CartScreen;
