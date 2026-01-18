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

    const [matches, setMatches] = useState(null);
    const [occasion, setOccasion] = useState("");

    const options = [
        { label: 'Date', key: 'date', icon: 'heart-outline' },
        { label: 'College', key: 'college', icon: 'school-outline' },
        { label: 'Party', key: 'party', icon: 'glass-cocktail' },
        { label: 'Office', key: 'office', icon: 'briefcase-outline' },
        { label: 'Gym', key: 'gym', icon: 'dumbbell' },
        { label: 'Festival', key: 'festival', icon: 'party-popper' }
    ];

    const handleSelect = (item) => {
        setOccasion(item.label);
        setMatches(getRecommendations(products, item.key));
    };

    const reset = () => {
        setMatches(null);
        setOccasion("");
    };

    const renderIntro = () => (
        <View style={styles.intro}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Where next?</Text>
                <Text style={[styles.subtitle, { color: isDarkMode ? '#888888' : '#666666' }]}>
                    Choose an occasion for a tailored scent.
                </Text>
            </View>

            <View style={styles.grid}>
                {options.map(item => (
                    <OccasionTile
                        key={item.key}
                        item={item}
                        isDarkMode={isDarkMode}
                        themeColors={colors}
                        onPress={() => handleSelect(item)}
                    />
                ))}
            </View>
        </View>
    );

    const renderResults = () => (
        <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text }]}>Matched for {occasion}</Text>
                <Text style={[styles.subtitle, { color: isDarkMode ? '#888888' : '#666666' }]}>
                    Top picks based on notes and vibes.
                </Text>
            </View>

            {matches.map((item, i) => (
                <RecommendationCard
                    key={item.id}
                    perfume={item}
                    reasoning={item.reasoning}
                    score={item.matchPercentage}
                    isPremium={i === 0}
                    isDarkMode={isDarkMode}
                    colors={colors}
                    onPress={() => navigation.navigate('ProductDetail', { product: item })}
                />
            ))}
            <View style={styles.spacer} />
        </ScrollView>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background, borderBottomColor: isDarkMode ? '#222222' : '#f9f9f9' }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Scent Discovery" titleStyle={[styles.appbarTitle, { color: colors.text }]} />
                {matches && <Appbar.Action icon="close" onPress={reset} color={colors.text} />}
            </Appbar.Header>

            {!matches ? renderIntro() : renderResults()}
        </View>
    );
};

const OccasionTile = ({ item, isDarkMode, themeColors, onPress }) => (
    <TouchableOpacity style={styles.tileWrapper} onPress={onPress} activeOpacity={0.7}>
        <Surface style={[styles.tile, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fcfcfc', borderColor: isDarkMode ? '#333333' : '#f0f0f0' }]} elevation={0}>
            <IconButton icon={item.icon} size={30} iconColor={isDarkMode ? themeColors.primary : "#1a1a1a"} />
            <Text style={[styles.tileLabel, { color: themeColors.text }]}>{item.label}</Text>
        </Surface>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        borderBottomWidth: 1,
    },
    appbarTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    intro: {
        flex: 1,
        padding: 25,
    },
    header: {
        marginBottom: 40,
        paddingHorizontal: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
    },
    subtitle: {
        fontSize: 16,
        marginTop: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    tileWrapper: {
        width: '48%',
        marginBottom: 15,
    },
    tile: {
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    tileLabel: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    list: {
        padding: 25,
    },
    spacer: {
        height: 40,
    },
});

export default RecommendationScreen;
