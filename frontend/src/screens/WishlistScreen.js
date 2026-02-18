import React from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, IconButton, useTheme as usePaperTheme, Button, Badge, Surface } from 'react-native-paper';
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
            <View style={styles.empty}>
                <Surface style={styles.emptyIconCircle} elevation={1}>
                    <IconButton icon="lock-outline" size={50} iconColor={colors.primary} />
                </Surface>
                <Text style={[styles.emptyTitle, { color: colors.text }]}>Private Collection</Text>
                <Text style={styles.emptySubtitle}>Please sign in to view your curated wishlist</Text>
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

    const items = user.wishlist || [];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header nav={navigation} colors={colors} count={count} />
            {items.length === 0 ? (
                <View style={styles.empty}>
                    <Surface style={styles.emptyIconCircle} elevation={1}>
                        <IconButton icon="heart-outline" size={50} iconColor={colors.primary} />
                    </Surface>
                    <Text style={[styles.emptyTitle, { color: colors.text }]}>Your Wishlist is Empty</Text>
                    <Text style={styles.emptySubtitle}>Start building your bespoke fragrance collection</Text>
                    <Button
                        mode="outlined"
                        onPress={() => navigation.navigate('Main')}
                        style={styles.exploreBtn}
                        textColor={colors.primary}
                        borderColor={colors.primary}
                    >
                        EXPLORE COLLECTION
                    </Button>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Item item={item} nav={navigation} onToggle={toggleWishlist} isDark={isDarkMode} colors={colors} />}
                    contentContainerStyle={{ padding: 25, paddingBottom: 100 }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const Header = ({ nav, colors, count }) => (
    <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => nav.goBack()} />
        <Text style={[styles.title, { color: colors.text }]}>MY WISHLIST</Text>
        <TouchableOpacity onPress={() => nav.navigate('Cart')}>
            <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
            {count > 0 && <Badge style={{ position: 'absolute', top: 5, right: 5, backgroundColor: colors.primary }} size={16}>{count}</Badge>}
        </TouchableOpacity>
    </View>
);

const Item = ({ item, nav, onToggle, isDark, colors }) => (
    <TouchableOpacity
        style={[styles.item, { backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }]}
        onPress={() => nav.navigate('ProductDetail', { product: item })}
        activeOpacity={0.7}
    >
        <View style={[styles.imgWrapper, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
            <Image source={item.image} style={styles.img} />
        </View>
        <View style={styles.info}>
            <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.cat}>{item.category} • {item.type || 'EDP'}</Text>
            <Text style={[styles.price, { color: colors.primary }]}>₹{item.price.toLocaleString()}</Text>
        </View>
        <IconButton icon="heart" iconColor={colors.primary} onPress={() => onToggle(item)} size={22} />
    </TouchableOpacity>
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
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 12,
        borderRadius: 20,
    },
    imgWrapper: {
        width: 80,
        height: 80,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
    img: { width: '100%', height: '100%', resizeMode: 'contain' },
    info: { flex: 1, marginLeft: 16 },
    name: { fontSize: 16, fontWeight: '700', letterSpacing: -0.3 },
    cat: { fontSize: 12, color: '#888', marginTop: 4, letterSpacing: 0.3 },
    price: { fontSize: 16, fontWeight: '900', marginTop: 8, letterSpacing: -0.5 }
});

export default WishlistScreen;
