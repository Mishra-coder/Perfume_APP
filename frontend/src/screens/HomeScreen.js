import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, useWindowDimensions, ScrollView, Platform } from 'react-native';
import { Text, IconButton, Chip, Surface, useTheme as usePaperTheme } from 'react-native-paper';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import FilterModal from '../components/FilterModal';
import Header from '../components/Header';

const HomeScreen = ({ navigation }) => {
    const { count } = useCart();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { width: windowWidth } = useWindowDimensions();

    // STRICT: Simulator content width logic
    const contentWidth = windowWidth > 600 ? 390 : windowWidth;

    const [isSearch, setIsSearch] = useState(false);
    const [query, setQuery] = useState('');
    const [showFab, setShowFab] = useState(false);
    const [filterVis, setFilterVis] = useState(false);
    const [filters, setFilters] = useState({ priceRange: null, categories: [], occasions: [], strengths: [], profiles: [], sortBy: 'default' });

    const filtered = useMemo(() => {
        let list = [...products];
        const q = query.toLowerCase().trim();
        if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
        if (filters.priceRange) list = list.filter(p => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max);
        if (filters.categories.length > 0) list = list.filter(p => filters.categories.includes(p.category));
        return list;
    }, [query, filters]);

    const featured = filtered.slice(0, 3);
    const others = filtered.slice(3);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header
                isSearch={isSearch}
                query={query}
                onQuery={setQuery}
                onClose={() => setIsSearch(false)}
                onClear={() => setQuery('')}
                onSearch={() => setIsSearch(true)}
                nav={navigation}
                isDark={isDarkMode}
                colors={colors}
                cartCount={count}
            />

            <FlatList
                data={others}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                onScroll={e => setShowFab(e.nativeEvent.contentOffset.y > 100)}
                ListHeaderComponent={
                    <View>
                        <View style={styles.hero}>
                            <Text style={[styles.heroTitle, { color: colors.text }]}>Aroma Luxe</Text>
                            <Text style={styles.heroSubtitle}>Premium Curation</Text>
                        </View>
                        {featured.length > 0 && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featured}>
                                {featured.map(item => (
                                    <FeaturedItem
                                        key={item.id}
                                        item={item}
                                        isDark={isDarkMode}
                                        colors={colors}
                                        screenWidth={contentWidth}
                                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                                    />
                                ))}
                            </ScrollView>
                        )}
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest Arrivals</Text>
                            <IconButton icon="filter-variant" mode="contained" containerColor={isDarkMode ? '#222' : '#f5f5f5'} iconColor={colors.text} size={20} onPress={() => setFilterVis(true)} />
                        </View>
                    </View>
                }
                renderItem={({ item }) => (
                    <ProductItem
                        item={item}
                        isDark={isDarkMode}
                        colors={colors}
                        screenWidth={contentWidth}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    />
                )}
                columnWrapperStyle={{ paddingHorizontal: 20, justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {showFab && (
                <TouchableOpacity
                    style={[styles.fab, { backgroundColor: colors.primary }]}
                    onPress={() => navigation.navigate('Recommendation')}
                >
                    <Text style={{ color: isDarkMode ? '#000' : '#fff', fontWeight: 'bold' }}>FIND</Text>
                </TouchableOpacity>
            )}

            <FilterModal visible={filterVis} onDismiss={() => setFilterVis(false)} filters={filters} onApply={setFilters} isDark={isDarkMode} colors={colors} />
        </View>
    );
};

const FeaturedItem = ({ item, onPress, isDark, colors, screenWidth }) => (
    <Surface
        style={[
            styles.featuredCard,
            {
                width: screenWidth * 0.8,
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            }
        ]}
        elevation={4}
    >
        <TouchableOpacity
            style={{ flex: 1, overflow: 'hidden', borderRadius: 32 }}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.featuredImgWrapper}>
                <Image source={item.image} style={styles.imgFull} resizeMode="contain" />
            </View>
            <View style={[styles.featuredInfo, { backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)' }]}>
                <Text style={[styles.featuredName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.featuredPrice, { color: colors.primary }]}>₹{item.price.toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    </Surface>
);

const ProductItem = ({ item, onPress, isDark, colors, screenWidth }) => (
    <Surface
        style={[
            styles.card,
            {
                width: (screenWidth - 60) / 2,
                backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'
            }
        ]}
        elevation={1}
    >
        <TouchableOpacity
            style={{ flex: 1, overflow: 'hidden', borderRadius: 24 }}
            onPress={onPress}
            activeOpacity={0.85}
        >
            <View style={[styles.imgWrapper, { backgroundColor: isDark ? '#121212' : '#F5F5F5' }]}>
                <Image source={item.image} style={styles.imgFull} resizeMode="contain" />
                <View style={[styles.badge, { backgroundColor: isDark ? 'rgba(212,175,55,0.9)' : 'rgba(0,0,0,0.7)' }]}>
                    <Text style={[styles.badgeText, { color: isDark ? '#000' : '#fff' }]}>{item.type || 'PARFUM'}</Text>
                </View>
            </View>
            <View style={styles.info}>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.cat, { color: colors.textSecondary }]} numberOfLines={1}>{item.category} • {item.type}</Text>
                <View style={[styles.footer, { marginTop: 8 }]}>
                    <Text style={[styles.price, { color: colors.primary }]}>₹{item.price.toLocaleString()}</Text>
                    <IconButton icon="arrow-right" size={16} iconColor={colors.primary} style={{ margin: 0 }} />
                </View>
            </View>
        </TouchableOpacity>
    </Surface>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    hero: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 24 },
    heroTitle: { fontSize: 44, fontWeight: '900', letterSpacing: -1, lineHeight: 48 },
    heroSubtitle: { fontSize: 16, color: '#888', marginTop: 8, letterSpacing: 0.5, fontWeight: '500' },
    featured: { paddingLeft: 20, marginBottom: 40 },
    featuredCard: {
        height: 400,
        marginRight: 20,
        borderRadius: 32,
        overflow: 'hidden',
    },
    featuredImgWrapper: {
        flex: 1,
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    featuredInfo: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    featuredName: { fontSize: 22, fontWeight: '700', letterSpacing: -0.5 },
    featuredPrice: { fontSize: 18, fontWeight: '900', marginTop: 8, color: '#D4AF37' },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    sectionTitle: { fontSize: 24, fontWeight: '800', letterSpacing: -0.5 },
    card: { marginBottom: 24 },
    imgWrapper: {
        height: 220,
        borderRadius: 24,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    imgFull: { width: '100%', height: '100%' },
    badge: {
        position: 'absolute',
        top: 12,
        left: 12,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
    },
    badgeText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    info: { marginTop: 14, paddingHorizontal: 6 },
    name: { fontSize: 16, fontWeight: '700', letterSpacing: -0.3 },
    cat: { fontSize: 12, marginTop: 6, letterSpacing: 0.3, opacity: 0.6 },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    price: { fontSize: 17, fontWeight: '900', letterSpacing: -0.4 },
    fab: {
        position: 'absolute',
        bottom: 32,
        right: 22,
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#D4AF37',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
            },
            android: {
                elevation: 10,
            },
            web: {
                boxShadow: '0 8px 16px rgba(212, 175, 55, 0.4)',
            }
        })
    }
});

export default HomeScreen;
