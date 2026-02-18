import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Appbar, Text, IconButton, Surface, Badge, useTheme as usePaperTheme } from 'react-native-paper';
import RecommendationCard from '../components/RecommendationCard';
import { products } from '../data/products';
import { getRecommendations } from '../utils/recommendationEngine';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const RecommendationScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { count } = useCart();
    const [matches, setMatches] = useState(null);
    const [occ, setOcc] = useState("");

    const OPTS = [
        { l: 'Date', k: 'date', i: 'heart-outline' },
        { l: 'College', k: 'college', i: 'school-outline' },
        { l: 'Party', k: 'party', i: 'glass-cocktail' },
        { l: 'Office', k: 'office', i: 'briefcase-outline' },
        { l: 'Gym', k: 'gym', i: 'dumbbell' },
        { l: 'Festival', k: 'festival', i: 'party-popper' }
    ];

    const pick = (item) => {
        setOcc(item.l);
        setMatches(getRecommendations(products, item.k));
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={{ backgroundColor: colors.background }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Discovery" titleStyle={{ fontWeight: 'bold' }} />
                {matches && <Appbar.Action icon="close" onPress={() => setMatches(null)} color={colors.text} />}
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
                    {count > 0 && <Badge style={{ position: 'absolute', top: 5, right: 5, backgroundColor: colors.primary }} size={16}>{count}</Badge>}
                </TouchableOpacity>
            </Appbar.Header>

            {!matches ? (
                <View style={styles.pad}>
                    <Text style={[styles.title, { color: colors.text }]}>Where next?</Text>
                    <Text style={styles.sub}>Choose an occasion for a tailored scent.</Text>
                    <View style={styles.grid}>
                        {OPTS.map(o => (
                            <TouchableOpacity key={o.k} style={styles.tile} onPress={() => pick(o)}>
                                <Surface style={[styles.surf, { backgroundColor: isDarkMode ? '#1A1A1A' : '#fcfcfc', borderColor: isDarkMode ? '#333' : '#eee' }]} elevation={1}>
                                    <View style={styles.surfInner}>
                                        <IconButton icon={o.i} size={30} iconColor={isDarkMode ? colors.primary : "#1a1a1a"} />
                                        <Text style={[styles.label, { color: colors.text }]}>{o.l}</Text>
                                    </View>
                                </Surface>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.pad}>
                    <Text style={[styles.title, { color: colors.text }]}>Top Picks</Text>
                    <Text style={styles.sub}>Matched for your {occ} vibe.</Text>
                    {matches.map(m => (
                        <RecommendationCard
                            key={m.id}
                            perfume={m}
                            reasoning={m.reasoning}
                            score={m.matchPercentage}
                            onPress={() => navigation.navigate('ProductDetail', { product: m })}
                        />
                    ))}
                    <View style={{ height: 40 }} />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    pad: { padding: 24 },
    title: { fontSize: 34, fontWeight: '900', letterSpacing: -0.6 },
    sub: { fontSize: 16, marginTop: 8, color: '#888', marginBottom: 32, letterSpacing: 0.2 },
    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    tile: { width: '48%', marginBottom: 16 },
    surf: {
        height: 130,
        borderRadius: 18,
        borderWidth: 1.5,
    },
    surfInner: {
        flex: 1,
        borderRadius: 18,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: { fontWeight: '700', fontSize: 15, marginTop: 8, letterSpacing: -0.2 }
});

export default RecommendationScreen;
