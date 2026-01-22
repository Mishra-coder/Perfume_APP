import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const RecommendationCard = ({ perfume, reasoning, score, onPress }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    return (
        <Surface style={[styles.card, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]} elevation={0}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                <View style={[styles.imgBox, { backgroundColor: isDarkMode ? '#0a0a0a' : '#f9f9f9' }]}>
                    <Image source={perfume.image} style={styles.img} />
                    <View style={[styles.badge, { backgroundColor: isDarkMode ? colors.primary : '#1a1a1a' }]}>
                        <Text style={{ fontSize: 10, fontWeight: '900', color: isDarkMode ? '#000' : '#fff' }}>{score}% MATCH</Text>
                    </View>
                </View>

                <View style={styles.pad}>
                    <Text style={[styles.name, { color: colors.text }]}>{perfume.name}</Text>
                    <View style={styles.row}>
                        <Text style={[styles.price, { color: isDarkMode ? colors.primary : '#000' }]}>₹{perfume.price}</Text>
                        <Text style={styles.type}>Eau De Parfum</Text>
                    </View>

                    <View style={styles.notes}>
                        {perfume.notes.top.slice(0, 3).map((n, i) => (
                            <View key={i} style={[styles.note, { backgroundColor: isDarkMode ? '#333' : '#f5f5f5' }]}>
                                <Text style={{ fontSize: 11, color: colors.text }}>{n}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={[styles.tip, { backgroundColor: isDarkMode ? '#0a0a0a' : '#f5f5f5' }]}>
                        <Text style={[styles.tipTitle, { color: colors.text }]}>Why it works</Text>
                        <Text style={styles.tipText} numberOfLines={2}>{reasoning}</Text>
                    </View>

                    <Button mode="contained" onPress={onPress} style={{ borderRadius: 12 }} buttonColor={colors.primary} labelStyle={{ color: isDarkMode ? '#000' : '#fff' }}>Discover</Button>
                </View>
            </TouchableOpacity>
        </Surface>
    );
};

const styles = StyleSheet.create({
    card: { marginBottom: 25, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: '#eee' },
    imgBox: { height: 180, justifyContent: 'center', alignItems: 'center' },
    img: { width: 140, height: 140 },
    badge: { position: 'absolute', top: 12, right: 12, padding: 6, borderRadius: 8 },
    pad: { padding: 20 },
    name: { fontSize: 20, fontWeight: 'bold' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
    price: { fontSize: 16, fontWeight: '900' },
    type: { fontSize: 12, color: '#888' },
    notes: { flexDirection: 'row', marginVertical: 15 },
    note: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6, marginRight: 8 },
    tip: { padding: 12, borderRadius: 12, marginBottom: 20 },
    tipTitle: { fontSize: 12, fontWeight: 'bold', marginBottom: 4 },
    tipText: { fontSize: 12, color: '#888', lineHeight: 16 }
});

export default RecommendationCard;
