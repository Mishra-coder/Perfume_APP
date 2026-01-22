import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const RecommendationCard = ({ perfume, reasoning, score, onPress }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const backgroundColor = isDarkMode ? '#1a1a1a' : '#ffffff';
    const borderColor = isDarkMode ? '#333333' : '#f0f0f0';
    const imageContainerBg = isDarkMode ? '#0a0a0a' : '#f9f9f9';
    const matchBadgeBg = isDarkMode ? colors.primary : '#1a1a1a';
    const matchTextColor = isDarkMode ? '#000000' : '#ffffff';
    const separatorColor = isDarkMode ? '#222222' : '#f5f5f5';
    const noteBadgeBg = isDarkMode ? '#333333' : '#f8f8f8';
    const tipBoxBg = isDarkMode ? '#0a0a0a' : '#f9f9f9';
    const tipTextColor = isDarkMode ? '#aaaaaa' : '#333333';

    return (
        <Surface style={[styles.cardContainer, { backgroundColor, borderColor }]} elevation={0}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.9}>

                <View style={[styles.imageContainer, { backgroundColor: imageContainerBg }]}>
                    <Image source={perfume.image} style={styles.productImage} />

                    <View style={[styles.matchBadge, { backgroundColor: matchBadgeBg }]}>
                        <Text style={[styles.matchText, { color: matchTextColor }]}>
                            {score}% MATCH
                        </Text>
                    </View>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={[styles.productName, { color: colors.text }]}>
                        {perfume.name}
                    </Text>

                    <View style={styles.metaInfoRow}>
                        <Text style={[styles.productPrice, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>
                            ₹{perfume.price}
                        </Text>
                        <Text style={styles.productType}>Eau De Parfum</Text>
                    </View>

                    <View style={[styles.separator, { backgroundColor: separatorColor }]} />

                    <View style={styles.notesSection}>
                        <Text style={styles.sectionLabel}>Signature Notes</Text>
                        <View style={styles.notesList}>
                            {perfume.notes.top.slice(0, 3).map((note, index) => (
                                <View key={index} style={[styles.noteBadge, { backgroundColor: noteBadgeBg }]}>
                                    <Text style={{ color: colors.text, fontSize: 12 }}>{note}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Surface style={[styles.tipContainer, { backgroundColor: tipBoxBg }]} elevation={0}>
                        <Text style={[styles.tipHeader, { color: colors.text }]}>Why it works</Text>
                        <Text style={[styles.tipContent, { color: tipTextColor }]}>
                            {reasoning}
                        </Text>
                    </Surface>

                    <Button
                        mode="contained"
                        style={styles.actionButton}
                        contentStyle={styles.actionButtonContent}
                        labelStyle={[styles.actionButtonLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                        onPress={onPress}
                    >
                        Discover Scents
                    </Button>
                </View>
            </TouchableOpacity>
        </Surface>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        marginBottom: 25,
        borderRadius: 25,
        overflow: 'hidden',
        borderWidth: 1
    },
    imageContainer: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    productImage: {
        width: 150,
        height: 150
    },
    matchBadge: {
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
    contentContainer: {
        padding: 25
    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    metaInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '900'
    },
    productType: {
        fontSize: 12,
        color: '#666666'
    },
    separator: {
        height: 1,
        marginVertical: 20
    },
    notesSection: {
        marginBottom: 20
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#999999',
        marginBottom: 10,
        textTransform: 'uppercase'
    },
    notesList: {
        flexDirection: 'row'
    },
    noteBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8
    },
    tipContainer: {
        padding: 15,
        borderRadius: 15,
        marginBottom: 25
    },
    tipHeader: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 5
    },
    tipContent: {
        fontSize: 13,
        lineHeight: 18
    },
    actionButton: {
        borderRadius: 12
    },
    actionButtonContent: {
        height: 50
    },
    actionButtonLabel: {
        fontWeight: 'bold',
        fontSize: 14
    }
});

export default RecommendationCard;
