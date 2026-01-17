import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Text, IconButton, Avatar, Badge } from 'react-native-paper';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const { getTotalItems } = useCart();
    const { user } = useUser();

    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFloatingBtn, setShowFloatingBtn] = useState(false);

    const filteredProducts = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return products;

        return products.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const featuredProducts = filteredProducts.slice(0, 3);
    const mainCollection = filteredProducts.slice(3);

    const renderHeader = () => {
        if (isSearching) {
            return (
                <View style={styles.searchHeader}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        onPress={() => { setIsSearching(false); setSearchQuery(''); }}
                    />
                    <TextInput
                        placeholder="Search for luxury scents..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus
                        style={styles.searchBox}
                        placeholderTextColor="#aaa"
                    />
                    {searchQuery.length > 0 ? (
                        <IconButton icon="close-circle" size={20} onPress={() => setSearchQuery('')} />
                    ) : null}
                </View>
            );
        }

        return (
            <View style={styles.topNav}>
                <IconButton
                    icon="menu"
                    size={24}
                    iconColor="#1a1a1a"
                    onPress={() => navigation.navigate('Recommendation')}
                />

                <View style={styles.navActions}>
                    <IconButton icon="magnify" size={24} iconColor="#1a1a1a" onPress={() => setIsSearching(true)} />

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Cart')}
                        style={styles.badgeWrapper}
                    >
                        <IconButton icon="shopping-outline" size={24} iconColor="#1a1a1a" />
                        {getTotalItems() > 0 ? (
                            <Badge style={styles.countBadge} size={18}>{getTotalItems()}</Badge>
                        ) : null}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('Orders')}
                        style={styles.badgeWrapper}
                    >
                        <IconButton icon="package-variant-closed" size={24} iconColor="#1a1a1a" />
                        {user.orders.length > 0 ? (
                            <Badge style={styles.countBadge} size={18}>{user.orders.length}</Badge>
                        ) : null}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Avatar.Icon size={36} icon="account" backgroundColor="#f5f5f5" color="#1a1a1a" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderListHeader = () => (
        <View>
            <View style={styles.heroSection}>
                <Text style={styles.heroTitle}>Aroma Luxe</Text>
                <Text style={styles.heroSub}>Curated Premium Fragrances</Text>
            </View>

            {featuredProducts.length > 0 ? (
                <FlatList
                    data={featuredProducts}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={p => p.id}
                    renderItem={({ item }) => (
                        <FeaturedCard
                            item={item}
                            onPress={() => navigation.navigate('ProductDetail', { product: item })}
                        />
                    )}
                    style={styles.heroList}
                />
            ) : null}

            <Text style={styles.listHeading}>Our Collection</Text>
        </View>
    );

    return (
        <View style={styles.shell}>
            {renderHeader()}

            <FlatList
                data={mainCollection}
                keyExtractor={p => p.id}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => {
                    const offsetY = event.nativeEvent.contentOffset.y;
                    setShowFloatingBtn(offsetY > 100);
                }}
                scrollEventThrottle={16}
                ListHeaderComponent={renderListHeader()}
                renderItem={({ item }) => (
                    <ProductListItem
                        item={item}
                        onSelect={(p) => navigation.navigate('ProductDetail', { product: p })}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.noResults}>
                        <Text style={styles.noResultsText}>No scents found matching your search.</Text>
                    </View>
                }
                contentContainerStyle={styles.mainContent}
            />

            {showFloatingBtn && (
                <TouchableOpacity
                    style={styles.floatingBtn}
                    onPress={() => navigation.navigate('Recommendation')}
                    activeOpacity={0.9}
                >
                    <Text style={styles.floatingText}>TYPE</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const FeaturedCard = ({ item, onPress }) => (
    <TouchableOpacity style={styles.featuredCard} onPress={onPress} activeOpacity={0.9}>
        <Image source={item.image} style={styles.featuredImg} />
        <View style={styles.featuredOverlay}>
            <Text style={styles.featName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.featPrice}>₹{item.price}</Text>
        </View>
    </TouchableOpacity>
);

const ProductListItem = ({ item, onSelect }) => (
    <TouchableOpacity
        style={styles.listItem}
        onPress={() => onSelect(item)}
        activeOpacity={0.8}
    >
        <View style={styles.listThumbBox}>
            <Image source={item.image} style={styles.listThumb} />
        </View>
        <View style={styles.listInfo}>
            <Text style={styles.listTitle}>{item.name}</Text>
            <Text style={styles.listCat}>{item.category} • Eau De Parfum</Text>
            <Text style={styles.listPrice}>₹{item.price}</Text>
        </View>
        <IconButton icon="chevron-right" size={20} iconColor="#eee" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    shell: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
    },
    navActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 10,
    },
    searchBox: {
        flex: 1,
        fontSize: 16,
        color: '#1a1a1a',
        paddingVertical: 8,
    },
    badgeWrapper: {
        marginRight: 5,
    },
    countBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#000',
        color: '#fff',
    },
    mainContent: {
        paddingBottom: 100,
    },
    heroSection: {
        padding: 25,
    },
    heroTitle: {
        fontSize: 36,
        fontWeight: '900',
        color: '#1a1a1a',
        letterSpacing: -1,
    },
    heroSub: {
        fontSize: 15,
        color: '#888',
        marginTop: 5,
    },
    heroList: {
        paddingLeft: 25,
        marginBottom: 40,
    },
    featuredCard: {
        width: width * 0.7,
        height: 380,
        marginRight: 20,
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#fafafa',
    },
    featuredImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    featuredOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 25,
        backgroundColor: 'rgba(255,255,255,0.85)',
    },
    featName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    featPrice: {
        fontSize: 16,
        color: '#000',
        marginTop: 5,
        fontWeight: '900',
    },
    listHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 25,
        marginBottom: 20,
        color: '#1a1a1a',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginBottom: 20,
    },
    listThumbBox: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
    },
    listThumb: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    listInfo: {
        flex: 1,
        marginLeft: 15,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    listCat: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    listPrice: {
        fontSize: 15,
        fontWeight: '900',
        marginTop: 6,
        color: '#1a1a1a',
    },
    noResults: {
        padding: 50,
        alignItems: 'center',
    },
    noResultsText: {
        color: '#999',
        fontSize: 15,
        textAlign: 'center',
    },
    floatingBtn: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        backgroundColor: '#1a1a1a',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    floatingText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
});

export default HomeScreen;
