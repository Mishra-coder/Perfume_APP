import React from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, IconButton, useTheme as usePaperTheme, Button, Badge } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const WishlistScreen = ({ navigation }) => {
    const { user, toggleWishlist } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { count } = useCart();

    if (!user.isLoggedIn) return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header nav={navigation} colors={colors} count={count} />
            <View style={styles.empty}><IconButton icon="lock" size={60} /><Text style={{ fontWeight: 'bold' }}>Login Required</Text><Button mode="contained" onPress={() => navigation.navigate('Auth')} style={{ marginTop: 20 }} buttonColor={colors.primary}>Sign In</Button></View>
        </View>
    );

    const items = user.wishlist || [];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header nav={navigation} colors={colors} count={count} />
            {items.length === 0 ? (
                <View style={styles.empty}><IconButton icon="heart-outline" size={60} /><Text>Your wishlist is empty</Text><Button mode="outlined" onPress={() => navigation.navigate('Main')} style={{ marginTop: 20 }} textColor={colors.text}>Explore</Button></View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Item item={item} nav={navigation} onToggle={toggleWishlist} isDark={isDarkMode} colors={colors} />}
                    contentContainerStyle={{ padding: 25 }}
                />
            )}
        </View>
    );
};

const Header = ({ nav, colors, count }) => (
    <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => nav.goBack()} />
        <Text style={[styles.title, { color: colors.text }]}>My Wishlist</Text>
        <TouchableOpacity onPress={() => nav.navigate('Cart')}>
            <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
            {count > 0 && <Badge style={{ position: 'absolute', top: 5, right: 5, backgroundColor: colors.primary }} size={16}>{count}</Badge>}
        </TouchableOpacity>
    </View>
);

const Item = ({ item, nav, onToggle, isDark, colors }) => (
    <TouchableOpacity style={styles.item} onPress={() => nav.navigate('ProductDetail', { product: item })}>
        <Image source={item.image} style={[styles.img, { backgroundColor: isDark ? '#1a1a1a' : '#f9f9f9' }]} />
        <View style={styles.info}>
            <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
            <Text style={styles.cat}>{item.category}</Text>
            <Text style={[styles.price, { color: colors.primary }]}>₹{item.price}</Text>
        </View>
        <IconButton icon="heart" iconColor={colors.primary} onPress={() => onToggle(item)} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 15 },
    title: { fontSize: 18, fontWeight: 'bold' },
    empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    item: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    img: { width: 70, height: 70, borderRadius: 12 },
    info: { flex: 1, marginLeft: 15 },
    name: { fontSize: 16, fontWeight: 'bold' },
    cat: { fontSize: 12, color: '#888' },
    price: { fontSize: 14, fontWeight: '900', marginTop: 4 }
});

export default WishlistScreen;
