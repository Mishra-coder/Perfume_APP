import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Text, IconButton, Surface, useTheme as usePaperTheme } from 'react-native-paper';
import RecommendationCard from '../components/RecommendationCard';
import { products } from '../data/products';
import { getRecommendations } from '../utils/recommendationEngine';
import { useTheme } from '../context/ThemeContext';

const RecommendationScreen = ({ navigation }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const [matchedProducts, setMatchedProducts] = useState(null);
    const [selectedOccasion, setSelectedOccasion] = useState("");

    const OCCASION_OPTIONS = [
        { label: 'Date', key: 'date', icon: 'heart-outline' },
        { label: 'College', key: 'college', icon: 'school-outline' },
        { label: 'Party', key: 'party', icon: 'glass-cocktail' },
        { label: 'Office', key: 'office', icon: 'briefcase-outline' },
        { label: 'Gym', key: 'gym', icon: 'dumbbell' },
        { label: 'Festival', key: 'festival', icon: 'party-popper' }
    ];

    const onSelectOccasion = (item) => {
        setSelectedOccasion(item.label);
        setMatchedProducts(getRecommendations(products, item.key));
    };

    const resetSelection = () => {
        setMatchedProducts(null);
        setSelectedOccasion("");
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Scent Discovery" titleStyle={[styles.appbarTitle, { color: colors.text }]} />
                {matchedProducts && <Appbar.Action icon="close" onPress={resetSelection} color={colors.text} />}
            </Appbar.Header>

            {!matchedProducts ? (
                <OccasionSelectionView
                    options={OCCASION_OPTIONS}
                    onSelect={onSelectOccasion}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />
            ) : (
                <RecommendationResults
                    matches={matchedProducts}
                    occasion={selectedOccasion}
                    navigation={navigation}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />
            )}
        </View>
    );
};

const OccasionSelectionView = ({ options, onSelect, isDarkMode, colors }) => (
    <View style={styles.contentContainer}>
        <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Where next?</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? '#888888' : '#666666' }]}>
                Choose an occasion for a tailored scent.
            </Text>
        </View>

        <View style={styles.gridContainer}>
            {options.map(item => (
                <OccasionTile
                    key={item.key}
                    item={item}
                    isDarkMode={isDarkMode}
                    colors={colors}
                    onPress={() => onSelect(item)}
                />
            ))}
        </View>
    </View>
);

const RecommendationResults = ({ matches, occasion, navigation, isDarkMode, colors }) => (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Matched for {occasion}</Text>
            <Text style={[styles.subtitle, { color: isDarkMode ? '#888888' : '#666666' }]}>
                Top picks based on notes and vibes.
            </Text>
        </View>

        {matches.map((item, index) => (
            <RecommendationCard
                key={item.id}
                perfume={item}
                reasoning={item.reasoning}
                score={item.matchPercentage}
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
            />
        ))}
        <View style={styles.bottomSpacer} />
    </ScrollView>
);

const OccasionTile = ({ item, isDarkMode, colors, onPress }) => (
    <TouchableOpacity style={styles.tileWrapper} onPress={onPress} activeOpacity={0.7}>
        <Surface style={[styles.tileSurface, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fcfcfc', borderColor: isDarkMode ? '#333333' : '#f0f0f0' }]} elevation={0}>
            <IconButton icon={item.icon} size={30} iconColor={isDarkMode ? colors.primary : "#1a1a1a"} />
            <Text style={[styles.tileLabel, { color: colors.text }]}>{item.label}</Text>
        </Surface>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        borderBottomWidth: 0,
        elevation: 0
    },
    appbarTitle: {
        fontWeight: 'bold',
        fontSize: 18
    },
    contentContainer: {
        flex: 1,
        padding: 25
    },
    header: {
        marginBottom: 40,
        paddingHorizontal: 5
    },
    title: {
        fontSize: 32,
        fontWeight: '900'
    },
    subtitle: {
        fontSize: 16,
        marginTop: 8
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    tileWrapper: {
        width: '48%',
        marginBottom: 15
    },
    tileSurface: {
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    tileLabel: {
        fontWeight: 'bold',
        fontSize: 14
    },
    scrollContent: {
        padding: 25
    },
    bottomSpacer: {
        height: 40
    }
});

export default RecommendationScreen;
