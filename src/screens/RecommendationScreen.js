import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, Text, IconButton, Surface } from 'react-native-paper';
import RecommendationCard from '../components/RecommendationCard';
import { products } from '../data/products';
import { getRecommendations } from '../utils/recommendationEngine';

const RecommendationScreen = ({ navigation }) => {
    const [matches, setMatches] = useState(null);
    const [activeTarget, setActiveTarget] = useState("");

    const options = [
        { label: 'Date', key: 'date', icon: 'heart-outline' },
        { label: 'College', key: 'college', icon: 'school-outline' },
        { label: 'Party', key: 'party', icon: 'glass-cocktail' },
        { label: 'Office', key: 'office', icon: 'briefcase-outline' },
        { label: 'Gym', key: 'gym', icon: 'dumbbell' },
        { label: 'Festival', key: 'festival', icon: 'party-popper' }
    ];

    const pickOccasion = (opt) => {
        setActiveTarget(opt.label);
        setMatches(getRecommendations(products, opt.key));
    };

    const clearSelection = () => {
        setMatches(null);
        setActiveTarget("");
    };

    return (
        <View style={styles.base}>
            <Appbar.Header style={styles.navBar}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Discovery" />
                {matches && <Appbar.Action icon="close" onPress={clearSelection} />}
            </Appbar.Header>

            {!matches ? (
                <View style={styles.center}>
                    <View style={styles.intro}>
                        <Text style={styles.hero}>Where next?</Text>
                        <Text style={styles.sub}>Choose an occasion for a tailored scent.</Text>
                    </View>

                    <View style={styles.grid}>
                        {options.map((opt) => (
                            <TouchableOpacity key={opt.key} style={styles.tileBox} onPress={() => pickOccasion(opt)}>
                                <Surface style={styles.tile} elevation={0}>
                                    <IconButton icon={opt.icon} size={30} iconColor="#1a1a1a" />
                                    <Text style={styles.tileText}>{opt.label}</Text>
                                </Surface>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.results} showsVerticalScrollIndicator={false}>
                    <View style={styles.intro}>
                        <Text style={styles.hero}>Matched for {activeTarget}</Text>
                        <Text style={styles.sub}>Top picks based on notes and vibes.</Text>
                    </View>

                    {matches.map((item, i) => (
                        <RecommendationCard
                            key={item.id}
                            perfume={item}
                            reasoning={item.reasoning}
                            score={item.matchPercentage}
                            isPremium={i === 0}
                            onPress={() => navigation.navigate('ProductDetail', { product: item })}
                        />
                    ))}
                    <View style={{ height: 40 }} />
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navBar: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    center: {
        flex: 1,
        padding: 25,
    },
    intro: {
        marginBottom: 40,
        paddingHorizontal: 5,
    },
    hero: {
        fontSize: 32,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    sub: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    tileBox: {
        width: '48%',
        marginBottom: 15,
    },
    tile: {
        height: 120,
        borderRadius: 20,
        backgroundColor: '#fcfcfc',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    tileText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#1a1a1a',
    },
    results: {
        padding: 25,
    },
});

export default RecommendationScreen;
