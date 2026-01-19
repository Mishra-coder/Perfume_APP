import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Text, IconButton, Avatar, Badge, useTheme as usePaperTheme } from 'react-native-paper';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const { getTotalItems } = useCart();
    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDiscoveryButton, setShowDiscoveryButton] = useState(false);

    const filteredProducts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return products;

        return products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const featuredItems = filteredProducts.slice(0, 3);
    const remainingItems = filteredProducts.slice(3);

    const renderHeader = () => {
        if (isSearchActive) {
            return (
                <View style={[styles.searchHeader, { borderBottomColor: isDarkMode ? '#333333' : '#f0f0f0' }]}>
                    <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => setIsSearchActive(false)} />
                    <TextInput
                        placeholder="Search luxury scents..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                        style={[styles.searchInput, { color: colors.text }]}
                        placeholderTextColor={isDarkMode ? "#666666" : "#aaaaaa"}
                    />
                    {searchQuery.length > 0 && (
                        <IconButton icon="close-circle" size={20} iconColor={colors.primary} onPress={() => setSearchQuery('')} />
                    )}
                </View>
            );
        }

        return (
            <View style={styles.standardHeader}>
                <IconButton icon="menu" size={24} iconColor={colors.text} onPress={() => navigation.navigate('Recommendation')} />
                <View style={styles.headerActions}>
                    <IconButton icon="magnify" size={24} iconColor={colors.text} onPress={() => setIsSearchActive(true)} />

                    <BadgeIcon
                        icon="heart-outline"
                        count={(user.wishlist || []).length}
                        onPress={() => navigation.navigate('Wishlist')}
                        themeColors={colors}
                        isDarkMode={isDarkMode}
                    />

                    <BadgeIcon
                        icon="shopping-outline"
                        count={getTotalItems()}
                        onPress={() => navigation.navigate('Cart')}
                        themeColors={colors}
                        isDarkMode={isDarkMode}
                    />

                    <BadgeIcon
                        icon="package-variant-closed"
                        count={(user.orders || []).length}
                        onPress={() => navigation.navigate('Orders')}
                        themeColors={colors}
                        isDarkMode={isDarkMode}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Avatar.Icon size={36} icon="account" backgroundColor={isDarkMode ? '#1a1a1a' : '#f5f5f5'} color={colors.text} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderListHeader = () => (
        <View>
            <View style={styles.heroSection}>
                <Text style={[styles.heroTitle, { color: colors.text }]}>Aroma Luxe</Text>
                <Text style={styles.heroSubtitle}>Curated Premium Fragrances</Text>
            </View>

            {featuredItems.length > 0 && (
                <FlatList
                    data={featuredItems}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <FeaturedCard
                            product={item}
                            isDarkMode={isDarkMode}
                            themeColors={colors}
                            onPress={() => navigation.navigate('ProductDetail', { product: item })}
                        />
                    )}
                    style={styles.featuredList}
                />
            )}

            <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Collection</Text>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {renderHeader()}

            <FlatList
                data={remainingItems}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onScroll={(e) => setShowDiscoveryButton(e.nativeEvent.contentOffset.y > 100)}
                scrollEventThrottle={16}
                ListHeaderComponent={renderListHeader()}
                renderItem={({ item }) => (
                    <ProductRow
                        product={item}
                        isDarkMode={isDarkMode}
                        themeColors={colors}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No scents found matching your search.</Text>
                    </View>
                }
                contentContainerStyle={styles.listContent}
            />

            {showDiscoveryButton && (
                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: colors.primary }]}
                    onPress={() => navigation.navigate('Recommendation')}
                    activeOpacity={0.9}
                >
                    <Text style={[styles.fabText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>FIND</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const BadgeIcon = ({ icon, count, onPress, themeColors, isDarkMode }) => (
    <TouchableOpacity onPress={onPress} style={styles.badgeWrapper}>
        <IconButton icon={icon} size={24} iconColor={themeColors.text} />
        {count > 0 && (
            <Badge style={[styles.badge, { backgroundColor: themeColors.primary, color: isDarkMode ? '#000000' : '#ffffff' }]} size={18}>
                {count}
            </Badge>
        )}
    </TouchableOpacity>
);

const FeaturedCard = ({ product, onPress, isDarkMode, themeColors }) => (
    <TouchableOpacity style={[styles.featuredCard, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fafafa' }]} onPress={onPress} activeOpacity={0.9}>
        <Image source={product.image} style={styles.featuredImage} />
        <View style={[styles.featuredOverlay, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)' }]}>
            <Text style={[styles.featuredName, { color: themeColors.text }]} numberOfLines={1}>{product.name}</Text>
            <Text style={[styles.featuredPrice, { color: isDarkMode ? themeColors.primary : '#000000' }]}>₹{product.price}</Text>
        </View>
    </TouchableOpacity>
);

const ProductRow = ({ product, onPress, isDarkMode, themeColors }) => (
    <TouchableOpacity style={styles.productRow} onPress={onPress} activeOpacity={0.8}>
        <View style={[styles.thumbnailWrapper, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]}>
            <Image source={product.image} style={styles.thumbnail} />
        </View>
        <View style={styles.productInfo}>
            <Text style={[styles.productName, { color: themeColors.text }]}>{product.name}</Text>
            <Text style={styles.productCategory}>{product.category} • Eau De Parfum</Text>
            <Text style={[styles.productPrice, { color: isDarkMode ? themeColors.primary : '#1a1a1a' }]}>₹{product.price}</Text>
        </View>
        <IconButton icon="chevron-right" size={20} iconColor={isDarkMode ? '#333333' : '#eeeeee'} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    standardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8
    },
    badgeWrapper: {
        marginRight: 5
    },
    badge: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    listContent: {
        paddingBottom: 100
    },
    heroSection: {
        padding: 25
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: '900',
        letterSpacing: -1
    },
    heroSubtitle: {
        fontSize: 15,
        color: '#888888',
        marginTop: 5
    },
    featuredList: {
        paddingLeft: 25,
        marginBottom: 40
    },
    featuredCard: {
        width: SCREEN_WIDTH * 0.7,
        height: 380,
        marginRight: 20,
        borderRadius: 25,
        overflow: 'hidden'
    },
    featuredImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    featuredOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 25
    },
    featuredName: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    featuredPrice: {
        fontSize: 16,
        marginTop: 5,
        fontWeight: '900'
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 25,
        marginBottom: 20
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginBottom: 20
    },
    thumbnailWrapper: {
        width: 80,
        height: 80,
        borderRadius: 20,
        overflow: 'hidden'
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    productInfo: {
        flex: 1,
        marginLeft: 15
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    productCategory: {
        fontSize: 12,
        color: '#666666',
        marginTop: 4
    },
    productPrice: {
        fontSize: 15,
        fontWeight: '900',
        marginTop: 6
    },
    emptyContainer: {
        padding: 50,
        alignItems: 'center'
    },
    emptyText: {
        color: '#999999',
        fontSize: 15,
        textAlign: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 5
    },
    fabText: {
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1
    }
});


export default HomeScreen;

