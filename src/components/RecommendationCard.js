import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const RecommendationCard = ({ perfume, reasoning, score, onPress }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    return (
        <Surface style={[styles.card, { backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff', borderColor: isDarkMode ? '#333333' : '#f0f0f0' }]} elevation={0}>
            <TouchableOpacity onPress={onPress}>
                <View style={[styles.imageContainer, { backgroundColor: isDarkMode ? '#0a0a0a' : '#f9f9f9' }]}>
                    <Image source={perfume.image} style={styles.image} />
                    <View style={[styles.matchBadge, { backgroundColor: isDarkMode ? colors.primary : '#1a1a1a' }]}>
                        <Text style={[styles.badgeText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>{score}% MATCH</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <Text style={[styles.name, { color: colors.text }]}>{perfume.name}</Text>

                    <View style={styles.meta}>
                        <Text style={[styles.price, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>₹{perfume.price}</Text>
                        <Text style={styles.type}>Eau De Parfum</Text>
                    </View>

                    <View style={[styles.divider, { backgroundColor: isDarkMode ? '#222222' : '#f5f5f5' }]} />

                    <View style={styles.notesSection}>
                        <Text style={styles.notesTitle}>Signature Notes</Text>
                        <View style={styles.notesList}>
                            {perfume.notes.top.slice(0, 3).map((note, i) => (
                                <View key={i} style={[styles.noteTag, { backgroundColor: isDarkMode ? '#333333' : '#f8f8f8' }]}>
                                    <Text style={[styles.noteText, { color: colors.text }]}>{note}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Surface style={[styles.expertBox, { backgroundColor: isDarkMode ? '#0a0a0a' : '#f9f9f9' }]} elevation={0}>
                        <Text style={[styles.expertTitle, { color: colors.text }]}>Expert Perspective</Text>
                        <Text style={[styles.expertBody, { color: isDarkMode ? '#aaaaaa' : '#333333' }]}>{reasoning}</Text>
                    </Surface>

                    <Button
                        mode="contained"
                        style={[styles.btn, { backgroundColor: colors.primary }]}
                        contentStyle={styles.btnContent}
                        labelStyle={[styles.btnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                        onPress={onPress}
                    >
                        Explore Scent
                    </Button>
                </View>
            </TouchableOpacity>
        </Surface>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 25,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1,
    },
    imageContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },
    matchBadge: {
        position: 'absolute',
        top: 15,
        right: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: '900',
    },
    body: {
        padding: 25,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: '900',
    },
    type: {
        fontSize: 12,
        color: '#666666',
    },
    divider: {
        height: 1,
        marginVertical: 20,
    },
    notesSection: {
        marginBottom: 20,
    },
    notesTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#999999',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    notesList: {
        flexDirection: 'row',
    },
    noteTag: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
    },
    noteText: {
        fontSize: 12,
    },
    expertBox: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 25,
    },
    expertTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    expertBody: {
        fontSize: 13,
        lineHeight: 18,
    },
    btn: {
        borderRadius: 12,
    },
    btnContent: {
        height: 50,
    },
    btnLabel: {
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default RecommendationCard;
