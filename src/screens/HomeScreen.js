import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, ScrollView } from 'react-native';
import { Text, IconButton, Avatar, Badge, Chip, useTheme as usePaperTheme } from 'react-native-paper';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import FilterModal from '../components/FilterModal';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const { getTotalItems } = useCart();
    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDiscoveryButton, setShowDiscoveryButton] = useState(false);

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: null,
        categories: [],
        occasions: [],
        strengths: [],
        profiles: [],
        sortBy: 'default'
    });

    const filteredProducts = useMemo(() => {
        let result = [...products];
        const query = searchQuery.toLowerCase().trim();

        if (query) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        }

        if (filters.priceRange) {
            result = result.filter(product =>
                product.price >= filters.priceRange.min &&
                product.price <= filters.priceRange.max
            );
        }

        if (filters.categories.length > 0) {
            result = result.filter(product =>
                filters.categories.includes(product.category)
            );
        }

        if (filters.occasions.length > 0) {
            result = result.filter(product =>
                product.occasions.some(occasion => filters.occasions.includes(occasion))
            );
        }

        if (filters.strengths.length > 0) {
            result = result.filter(product => {
                if (filters.strengths.includes('light') && product.strength <= 2) return true;
                if (filters.strengths.includes('medium') && product.strength === 3) return true;
                if (filters.strengths.includes('strong') && product.strength >= 4) return true;
                return false;
            });
        }

        if (filters.profiles.length > 0) {
            result = result.filter(product =>
                filters.profiles.includes(product.profile.toLowerCase())
            );
        }

        switch (filters.sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                break;
        }

        return result;
    }, [searchQuery, filters]);

    const featuredItems = filteredProducts.slice(0, 3);
    const remainingItems = filteredProducts.slice(3);

    const getActiveFilterCount = () => {
        let count = 0;
        if (filters.priceRange) count++;
        count += filters.categories.length;
        count += filters.occasions.length;
        count += filters.strengths.length;
        count += filters.profiles.length;
        if (filters.sortBy !== 'default') count++;
        return count;
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
    };

    const clearAllFilters = () => {
        setFilters({
            priceRange: null,
            categories: [],
            occasions: [],
            strengths: [],
            profiles: [],
            sortBy: 'default'
        });
    };

    const handleScroll = (event) => {
        const scrollOffset = event.nativeEvent.contentOffset.y;
        setShowDiscoveryButton(scrollOffset > 100);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {isSearchActive ? (
                <SearchHeader
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onClose={() => setIsSearchActive(false)}
                    onClear={() => setSearchQuery('')}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />
            ) : (
                <StandardHeader
                    navigation={navigation}
                    onSearchPress={() => setIsSearchActive(true)}
                    onFilterPress={() => setIsFilterModalVisible(true)}
                    filterCount={getActiveFilterCount()}
                    cartCount={getTotalItems()}
                    wishlistCount={(user.wishlist || []).length}
                    ordersCount={(user.orders || []).length}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />
            )}

            <FlatList
                data={remainingItems}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                ListHeaderComponent={
                    <ListHeader
                        featuredItems={featuredItems}
                        filters={filters}
                        setFilters={setFilters}
                        clearAllFilters={clearAllFilters}
                        navigation={navigation}
                        isDarkMode={isDarkMode}
                        colors={colors}
                    />
                }
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

            <FilterModal
                visible={isFilterModalVisible}
                onDismiss={() => setIsFilterModalVisible(false)}
                filters={filters}
                onApplyFilters={handleApplyFilters}
                isDarkMode={isDarkMode}
                themeColors={colors}
            />
        </View>
    );
};

const StandardHeader = ({ navigation, onSearchPress, onFilterPress, filterCount, cartCount, wishlistCount, ordersCount, isDarkMode, colors }) => (
    <View style={styles.standardHeader}>
        <IconButton icon="menu" size={24} iconColor={colors.text} onPress={() => navigation.navigate('Recommendation')} />
        <View style={styles.headerActions}>
            <IconButton icon="magnify" size={24} iconColor={colors.text} onPress={onSearchPress} />

            <BadgeIcon
                icon="filter-variant"
                count={filterCount}
                onPress={onFilterPress}
                themeColors={colors}
                isDarkMode={isDarkMode}
            />

            <BadgeIcon
                icon="heart-outline"
                count={wishlistCount}
                onPress={() => navigation.navigate('Wishlist')}
                themeColors={colors}
                isDarkMode={isDarkMode}
            />

            <BadgeIcon
                icon="shopping-outline"
                count={cartCount}
                onPress={() => navigation.navigate('Cart')}
                themeColors={colors}
                isDarkMode={isDarkMode}
            />

            <BadgeIcon
                icon="package-variant-closed"
                count={ordersCount}
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

const SearchHeader = ({ searchQuery, onSearchChange, onClose, onClear, isDarkMode, colors }) => (
    <View style={[styles.searchHeader, { borderBottomColor: isDarkMode ? '#333333' : '#f0f0f0' }]}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={onClose} />
        <TextInput
            placeholder="Search luxury scents..."
            value={searchQuery}
            onChangeText={onSearchChange}
            autoFocus
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={isDarkMode ? "#666666" : "#aaaaaa"}
        />
        {searchQuery.length > 0 && (
            <IconButton icon="close-circle" size={20} iconColor={colors.primary} onPress={onClear} />
        )}
    </View>
);

const ListHeader = ({ featuredItems, filters, setFilters, clearAllFilters, navigation, isDarkMode, colors }) => (
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

        {hasActiveFilters(filters) && (
            <View style={styles.activeFiltersContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.activeFiltersContent}>
                    {filters.priceRange && (
                        <ActiveFilterChip
                            label={filters.priceRange.label}
                            onClose={() => setFilters(prev => ({ ...prev, priceRange: null }))}
                            colors={colors}
                        />
                    )}
                    {filters.categories.map(cat => (
                        <ActiveFilterChip
                            key={cat}
                            label={cat}
                            onClose={() => setFilters(prev => ({ ...prev, categories: prev.categories.filter(c => c !== cat) }))}
                            colors={colors}
                        />
                    ))}
                    {filters.occasions.map(occ => (
                        <ActiveFilterChip
                            key={occ}
                            label={occ}
                            onClose={() => setFilters(prev => ({ ...prev, occasions: prev.occasions.filter(o => o !== occ) }))}
                            colors={colors}
                        />
                    ))}
                    <Chip
                        icon="close-circle-outline"
                        onPress={clearAllFilters}
                        style={[styles.activeFilterChip, { backgroundColor: isDarkMode ? '#333' : '#e0e0e0' }]}
                        textStyle={{ color: colors.text }}
                    >
                        Clear All
                    </Chip>
                </ScrollView>
            </View>
        )}

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Collection</Text>
    </View>
);

const hasActiveFilters = (filters) => {
    return filters.priceRange ||
        filters.categories.length > 0 ||
        filters.occasions.length > 0 ||
        filters.strengths.length > 0 ||
        filters.profiles.length > 0;
};

const ActiveFilterChip = ({ label, onClose, colors }) => (
    <Chip
        onClose={onClose}
        style={styles.activeFilterChip}
        textStyle={{ color: colors.text }}
    >
        {label}
    </Chip>
);

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
    },
    activeFiltersContainer: {
        marginBottom: 20
    },
    activeFiltersContent: {
        paddingHorizontal: 25,
        gap: 8
    },
    activeFilterChip: {
        marginRight: 8
    }
});

export default HomeScreen;
