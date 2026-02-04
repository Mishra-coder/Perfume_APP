import React, { useState, useMemo } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { Text, IconButton, Chip, useTheme as usePaperTheme } from 'react-native-paper';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import FilterModal from '../components/FilterModal';
import Header from '../components/Header';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const { count } = useCart();
    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

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
        if (filters.occasions.length > 0) list = list.filter(p => p.occasions.some(o => filters.occasions.includes(o)));
        if (filters.sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
        if (filters.sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
        if (filters.sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
        return list;
    }, [query, filters]);

    const featured = filtered.slice(0, 3);
    const others = filtered.slice(3);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header isSearch={isSearch} query={query} onQuery={setQuery} onClose={() => setIsSearch(false)} onClear={() => setQuery('')} onSearch={() => setIsSearch(true)} nav={navigation} isDark={isDarkMode} colors={colors} cartCount={count} />

            <FlatList
                data={others}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                onScroll={e => setShowFab(e.nativeEvent.contentOffset.y > 100)}
                ListHeaderComponent={
                    <View>
                        <View style={styles.hero}><Text style={[styles.heroTitle, { color: colors.text }]}>Aroma Luxe</Text><Text style={styles.heroSubtitle}>Premium Curation</Text></View>
                        {featured.length > 0 && (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featured}>
                                {featured.map(item => <FeaturedItem key={item.id} item={item} isDark={isDarkMode} colors={colors} onPress={() => navigation.navigate('ProductDetail', { product: item })} />)}
                            </ScrollView>
                        )}
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Latest Arrivals</Text>
                            <IconButton icon="filter-variant" mode="contained" containerColor={isDarkMode ? '#222' : '#f5f5f5'} iconColor={colors.text} size={20} onPress={() => setFilterVis(true)} />
                        </View>
                    </View>
                }
                renderItem={({ item }) => <ProductItem item={item} isDark={isDarkMode} colors={colors} onPress={() => navigation.navigate('ProductDetail', { product: item })} />}
                columnWrapperStyle={{ paddingHorizontal: 20, justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            {showFab && <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]} onPress={() => navigation.navigate('Recommendation')}><Text style={{ color: isDarkMode ? '#000' : '#fff', fontWeight: 'bold' }}>FIND</Text></TouchableOpacity>}

            <FilterModal visible={filterVis} onDismiss={() => setFilterVis(false)} filters={filters} onApply={setFilters} isDark={isDarkMode} colors={colors} />
        </View>
    );
};

const HomeHeader = ({ featured, filters, setFilters, reset, navigation, isDarkMode, colors, openFilters }) => (
    <View>
        <View style={styles.hero}>
            <Text style={[styles.heroTitle, { color: colors.text }]}>Aroma Luxe</Text>
            <Text style={styles.heroSubtitle}>Curated Premium Fragrances</Text>
        </View>

        {featured.length > 0 && (
            <FlatList
                data={featured}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <FeaturedItem
                        item={item}
                        isDarkMode={isDarkMode}
                        colors={colors}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    />
                )}
                style={styles.featured}
            />
        )}

        {(filters.priceRange || filters.categories.length > 0 || filters.occasions.length > 0) && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
                {filters.priceRange && (
                    <Chip style={styles.chip} onClose={() => setFilters(p => ({ ...p, priceRange: null }))}>{filters.priceRange.label}</Chip>
                )}
                {filters.categories.map(c => (
                    <Chip key={c} style={styles.chip} onClose={() => setFilters(p => ({ ...p, categories: p.categories.filter(x => x !== c) }))}>{c}</Chip>
                ))}
                <Chip style={styles.chip} icon="close-circle" onPress={reset}>Clear All</Chip>
            </ScrollView>
        )}

        <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Our Collection</Text>
            <IconButton icon="filter-variant" mode="contained" containerColor={isDarkMode ? '#333' : '#f0f0f0'} iconColor={colors.text} size={20} onPress={openFilters} />
        </View>
    </View>
);

const FeaturedItem = ({ item, onPress, isDarkMode, colors }) => (
    <TouchableOpacity style={[styles.featuredCard, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fafafa' }]} onPress={onPress}>
        <Image source={item.image} style={styles.featuredImg} resizeMode="contain" />
        <View style={[styles.featuredInfo, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)' }]}>
            <Text style={[styles.featuredName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
            <Text style={[styles.featuredPrice, { color: isDarkMode ? colors.primary : '#000' }]}>₹{item.price}</Text>
        </View>
    </TouchableOpacity>
);

const ProductItem = ({ item, onPress, isDarkMode, colors }) => (
    <TouchableOpacity style={[styles.card, { width: (SCREEN_WIDTH - 60) / 2 }]} onPress={onPress}>
        <View style={[styles.imgWrapper, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
            <Image source={item.image} style={styles.img} resizeMode="contain" />
            <View style={styles.badge}><Text style={styles.badgeText}>PARFUM</Text></View>
        </View>
        <View style={styles.info}>
            <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.cat} numberOfLines={1}>{item.category} • EDP</Text>
            <View style={styles.footer}>
                <Text style={[styles.price, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>₹{item.price}</Text>
                <IconButton icon="arrow-right" size={16} iconColor={isDarkMode ? '#555' : '#ccc'} />
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    list: { paddingBottom: 100 },
    hero: { paddingHorizontal: 20, paddingTop: 25, paddingBottom: 15 },
    heroTitle: { fontSize: 36, fontWeight: '900' },
    heroSubtitle: { fontSize: 15, color: '#888', marginTop: 5 },
    featured: { paddingLeft: 20, marginBottom: 30 },
    featuredCard: { width: SCREEN_WIDTH * 0.7, height: 380, marginRight: 20, borderRadius: 25, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', paddingTop: 40 },
    featuredImg: { width: '85%', height: '85%' },
    featuredInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20 },
    featuredName: { fontSize: 18, fontWeight: 'bold' },
    featuredPrice: { fontSize: 16, fontWeight: '900', marginTop: 4 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 15 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold' },
    row: { justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 },
    card: { marginBottom: 15 },
    imgWrapper: { height: 210, borderRadius: 20, overflow: 'hidden', paddingTop: 25, paddingHorizontal: 10, paddingBottom: 10 },
    img: { width: '100%', height: '100%' },
    badge: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.5)', padding: 4, borderRadius: 4 },
    badgeText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },
    info: { marginTop: 10, paddingHorizontal: 4 },
    name: { fontSize: 14, fontWeight: 'bold' },
    cat: { fontSize: 11, color: '#888', marginTop: 2 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    price: { fontSize: 15, fontWeight: '900' },
    fab: { position: 'absolute', bottom: 30, right: 20, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 },
    fabText: { fontSize: 12, fontWeight: 'bold' },
    chips: { paddingHorizontal: 20, marginBottom: 20, gap: 8 },
    chip: { marginRight: 8 }
});

export default HomeScreen;
