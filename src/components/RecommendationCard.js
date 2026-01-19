import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const RecommendationCard = ({ perfume, reasoning, score, onPress }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const bg = isDarkMode ? '#1a1a1a' : '#ffffff';
    const border = isDarkMode ? '#333333' : '#f0f0f0';

    return (
        <Surface style={[styles.card, { backgroundColor: bg, borderColor: border }]} elevation={0}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
                <View style={[styles.imgBox, { backgroundColor: isDarkMode ? '#0a0a0a' : '#f9f9f9' }]}>
                    <Image source={perfume.image} style={styles.img} />
                    <View style={[styles.match, { backgroundColor: isDarkMode ? colors.primary : '#1a1a1a' }]}>
                        <Text style={[styles.matchText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>{score}% MATCH</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <Text style={[styles.name, { color: colors.text }]}>{perfume.name}</Text>

                    <View style={styles.meta}>
                        <Text style={[styles.price, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>₹{perfume.price}</Text>
                        <Text style={styles.tag}>Eau De Parfum</Text>
                    </View>

                    <View style={[styles.line, { backgroundColor: isDarkMode ? '#222222' : '#f5f5f5' }]} />

                    <View style={styles.notes}>
                        <Text style={styles.label}>Signature Notes</Text>
                        <View style={styles.list}>
                            {perfume.notes.top.slice(0, 3).map((n, i) => (
                                <View key={i} style={[styles.note, { backgroundColor: isDarkMode ? '#333333' : '#f8f8f8' }]}>
                                    <Text style={{ color: colors.text, fontSize: 12 }}>{n}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Surface style={[styles.tip, { backgroundColor: isDarkMode ? '#0a0a0a' : '#f9f9f9' }]} elevation={0}>
                        <Text style={[styles.tipTitle, { color: colors.text }]}>Why it works</Text>
                        <Text style={[styles.tipBody, { color: isDarkMode ? '#aaaaaa' : '#333333' }]}>{reasoning}</Text>
                    </Surface>

                    <Button mode="contained" style={styles.btn} contentStyle={styles.btnContent} labelStyle={[styles.btnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]} onPress={onPress}>
                        Discover Scents
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
        borderWidth: 1
    },
    imgBox: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 150,
        height: 150
    },
    match: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 6,
        borderRadius: 10
    },
    matchText: {
        fontSize: 10,
        fontWeight: '900'
    },
    body: {
        padding: 25
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    price: {
        fontSize: 18,
        fontWeight: '900'
    },
    tag: {
        fontSize: 12,
        color: '#666666'
    },
    line: {
        height: 1,
        marginVertical: 20
    },
    notes: {
        marginBottom: 20
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#999999',
        marginBottom: 10,
        textTransform: 'uppercase'
    },
    list: {
        flexDirection: 'row'
    },
    note: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8
    },
    tip: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 25
    },
    tipTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 5
    },
    tipBody: {
        fontSize: 13,
        lineHeight: 18
    },
    btn: {
        borderRadius: 12
    },
    btnContent: {
        height: 50
    },
    btnLabel: {
        fontWeight: 'bold',
        fontSize: 14
    }
});


export default RecommendationCard;

