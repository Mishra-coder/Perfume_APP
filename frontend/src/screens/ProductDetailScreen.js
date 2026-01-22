import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, IconButton, Snackbar, Badge, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route }) => {
    const { product } = route.params;
    const { addToCart, count } = useCart();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { toggleWishlist, isInWishlist } = useUser();

    const [qty, setQty] = useState(1);
    const [snack, setSnack] = useState(false);
    const [activeImg, setActiveImg] = useState(product.image);

    const onAdd = () => {
        addToCart(product, qty);
        setSnack(true);
    };

    const isFav = isInWishlist(product.id);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => navigation.goBack()} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon={isFav ? "heart" : "heart-outline"} size={24} iconColor={isFav ? colors.primary : colors.text} onPress={() => toggleWishlist(product)} />
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
                        {count > 0 && <Badge style={[styles.badge, { backgroundColor: colors.primary }]} size={16}>{count}</Badge>}
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false}>
                <View style={[styles.gallery, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]}>
                    <Image source={activeImg} style={styles.mainImg} />
                </View>

                <View style={styles.content}>
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>
                            <Text style={styles.cat}>{product.category} • EDP</Text>
                        </View>
                        <Text style={[styles.price, { color: colors.primary }]}>₹{product.price}</Text>
                    </View>

                    <Text style={[styles.section, { color: colors.text }]}>The Scent</Text>
                    <Text style={[styles.desc, { color: isDarkMode ? '#aaa' : '#666' }]}>{product.description}</Text>

                    <View style={styles.counterRow}>
                        <Text style={{ fontWeight: 'bold', color: colors.text }}>Quantity</Text>
                        <View style={[styles.counter, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
                            <TouchableOpacity onPress={() => setQty(q => Math.max(1, q - 1))} style={styles.countBtn}><Text style={{ color: colors.text }}>−</Text></TouchableOpacity>
                            <Text style={[styles.countVal, { color: colors.text }]}>{qty}</Text>
                            <TouchableOpacity onPress={() => setQty(q => q + 1)} style={styles.countBtn}><Text style={{ color: colors.text }}>+</Text></TouchableOpacity>
                        </View>
                    </View>

                    <Button mode="contained" onPress={onAdd} style={styles.buyBtn} contentStyle={{ height: 56 }} buttonColor={colors.primary} labelStyle={{ color: isDarkMode ? '#000' : '#fff' }}>Add to Bag</Button>
                </View>
            </ScrollView>

            <Snackbar visible={snack} onDismiss={() => setSnack(false)} duration={1500}>Added to bag!</Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 50, position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
    badge: { position: 'absolute', top: 5, right: 5 },
    gallery: { width: '100%', height: SCREEN_WIDTH * 1, justifyContent: 'center', alignItems: 'center' },
    mainImg: { width: '80%', height: '80%', resizeMode: 'contain' },
    content: { padding: 25, borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, backgroundColor: 'transparent' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
    name: { fontSize: 26, fontWeight: '900' },
    cat: { fontSize: 13, color: '#888', marginTop: 4 },
    price: { fontSize: 22, fontWeight: '900' },
    section: { fontSize: 18, fontWeight: 'bold', marginTop: 30, marginBottom: 10 },
    desc: { fontSize: 15, lineHeight: 22 },
    counterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 35 },
    counter: { flexDirection: 'row', alignItems: 'center', borderRadius: 12, padding: 4 },
    countBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
    countVal: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 15 },
    buyBtn: { borderRadius: 15 }
});

export default ProductDetailScreen;
