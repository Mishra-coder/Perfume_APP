import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Surface, Button, Chip } from 'react-native-paper';

const RecommendationCard = ({ perfume, reasoning, score, onPress }) => {
    return (
        <Surface style={styles.shell} elevation={0}>
            <TouchableOpacity onPress={onPress}>
                <View style={styles.topSection}>
                    <Image source={perfume.image} style={styles.mainImg} />
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{score}% MATCH</Text>
                    </View>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.name}>{perfume.name}</Text>

                    <View style={styles.row}>
                        <Text style={styles.price}>₹{perfume.price}</Text>
                        <Text style={styles.subText}>Eau De Parfum</Text>
                    </View>

                    <View style={styles.line} />

                    <View style={styles.notesBox}>
                        <Text style={styles.label}>Signature Notes</Text>
                        <View style={styles.tags}>
                            {perfume.notes.top.slice(0, 3).map((n, i) => (
                                <View key={i} style={styles.tag}>
                                    <Text style={styles.tagText}>{n}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Surface style={styles.logicBox} elevation={0}>
                        <Text style={styles.logicLabel}>Expert Perspective</Text>
                        <Text style={styles.logicText}>{reasoning}</Text>
                    </Surface>

                    <Button
                        mode="contained"
                        style={styles.actionBtn}
                        contentStyle={styles.btnInner}
                        labelStyle={styles.btnLabel}
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
    shell: {
        marginBottom: 25,
        borderRadius: 25,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    topSection: {
        height: 200,
        backgroundColor: '#f9f9f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainImg: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },
    badge: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: '#1a1a1a',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
    },
    infoSection: {
        padding: 25,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    price: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    subText: {
        fontSize: 12,
        color: '#666',
    },
    line: {
        height: 1,
        backgroundColor: '#f5f5f5',
        marginVertical: 20,
    },
    notesBox: {
        marginBottom: 20,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#999',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    tags: {
        flexDirection: 'row',
    },
    tag: {
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8,
    },
    tagText: {
        fontSize: 12,
        color: '#1a1a1a',
    },
    logicBox: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 15,
        marginBottom: 25,
    },
    logicLabel: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: 5,
    },
    logicText: {
        fontSize: 13,
        lineHeight: 18,
        color: '#333',
    },
    actionBtn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
    },
    btnInner: {
        height: 50,
    },
    btnLabel: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#fff',
    },
});

export default RecommendationCard;
