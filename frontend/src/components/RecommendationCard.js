import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Text, Surface, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const RecommendationCard = ({ perfume, reasoning, score, onPress }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    return (
        <Surface
            style={[
                styles.card,
                {
                    backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
                    borderColor: isDarkMode ? '#2a2a2a' : '#e5e5e5',
                    ...Platform.select({
                        ios: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: isDarkMode ? 0.4 : 0.1,
                            shadowRadius: 12,
                        },
                        android: {
                            elevation: 4,
                        },
                        web: {
                            boxShadow: isDarkMode ? '0 4px 16px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.1)',
                        }
                    })
                }
            ]}
            elevation={0}
        >
            <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                <View style={[styles.imgBox, { backgroundColor: isDarkMode ? '#0f0f0f' : '#fafafa' }]}>
                    <Image source={perfume.image} style={styles.img} resizeMode="contain" />
                    <View style={[styles.badge, { backgroundColor: isDarkMode ? colors.primary : '#1a1a1a' }]}>
                        <Text style={[styles.badgeText, { color: isDarkMode ? '#000' : '#fff' }]}>{score}% MATCH</Text>
                    </View>
                </View>

                <View style={styles.pad}>
                    <Text style={[styles.name, { color: colors.text }]}>{perfume.name}</Text>
                    <View style={styles.row}>
                        <Text style={[styles.price, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>₹{perfume.price.toLocaleString()}</Text>
                        <Text style={[styles.type, { color: colors.textTertiary }]}>{perfume.type || 'Eau De Parfum'}</Text>
                    </View>

                    <View style={styles.notes}>
                        {perfume.notes.top.slice(0, 3).map((n, i) => (
                            <View key={i} style={[styles.note, { backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0', borderWidth: 1, borderColor: isDarkMode ? '#333' : '#e5e5e5' }]}>
                                <Text style={[styles.noteText, { color: colors.text }]}>{n}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.tip, { backgroundColor: isDarkMode ? '#0f0f0f' : '#f8f8f8', borderWidth: 1, borderColor: isDarkMode ? '#2a2a2a' : '#e5e5e5' }]}>
                        <Text style={[styles.tipTitle, { color: colors.text }]}>Why it works</Text>
                        <Text style={[styles.tipText, { color: colors.textSecondary }]} numberOfLines={2}>{reasoning}</Text>
                    </View>

                    <Button
                        mode="contained"
                        onPress={onPress}
                        style={styles.button}
                        buttonColor={colors.primary}
                        labelStyle={[styles.buttonLabel, { color: isDarkMode ? '#000' : '#fff' }]}
                    >
                        Discover
                    </Button>
                </View>
            </TouchableOpacity>
        </Surface>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 22,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
    },
    imgBox: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    img: { width: '100%', height: '100%' },
    badge: {
        position: 'absolute',
        top: 14,
        right: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    pad: { padding: 22 },
    name: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.4,
        marginBottom: 6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 16,
    },
    price: { fontSize: 18, fontWeight: '900', letterSpacing: -0.3 },
    type: { fontSize: 12, letterSpacing: 0.2 },
    notes: {
        flexDirection: 'row',
        marginBottom: 18,
        flexWrap: 'wrap',
    },
    note: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 8,
    },
    noteText: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    tip: {
        padding: 14,
        borderRadius: 12,
        marginBottom: 18,
    },
    tipTitle: {
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 6,
        letterSpacing: -0.1,
    },
    tipText: {
        fontSize: 13,
        lineHeight: 19,
        letterSpacing: 0.1,
    },
    button: {
        borderRadius: 12,
        elevation: 2,
    },
    buttonLabel: {
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 0.2,
    }
});

export default RecommendationCard;
