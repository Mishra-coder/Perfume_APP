import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import { useCart } from '../context/CartContext';

const SuccessScreen = ({ navigation, route }) => {
    const { clearCart } = useCart();
    const orderId = route.params?.orderId || 'AL-DIRECT';

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <View style={styles.base}>
            <View style={styles.center}>
                <View style={styles.successIconBox}>
                    <IconButton icon="check-bold" size={60} iconColor="#fff" />
                </View>

                <Text style={styles.heroText}>Order Confirmed!</Text>
                <Text style={styles.infoText}>
                    Your luxury selection is being prepared. We'll notify you once it's on the way.
                </Text>

                <View style={styles.detailsCard}>
                    <DetailRow label="Order ID" value={orderId} />
                    <DetailRow label="Status" value="Processing" color="#27ae60" />
                    <DetailRow label="Est. Delivery" value="3-5 Business Days" />
                </View>

                <Button
                    mode="contained"
                    style={styles.actionBtn}
                    contentStyle={styles.btnInner}
                    labelStyle={styles.btnText}
                    onPress={() => navigation.navigate('Main')}
                >
                    Return to Boutique
                </Button>
            </View>
        </View>
    );
};

const DetailRow = ({ label, value, color = '#1a1a1a' }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, { color }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        padding: 30,
    },
    successIconBox: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    heroText: {
        fontSize: 30,
        fontWeight: '900',
        color: '#1a1a1a',
        marginBottom: 15,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    detailsCard: {
        width: '100%',
        backgroundColor: '#fcfcfc',
        borderRadius: 20,
        padding: 25,
        marginBottom: 40,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    rowLabel: {
        fontSize: 14,
        color: '#999',
        fontWeight: 'bold',
    },
    rowValue: {
        fontSize: 14,
        fontWeight: '900',
    },
    actionBtn: {
        width: '100%',
        backgroundColor: '#000',
        borderRadius: 15,
    },
    btnInner: {
        height: 60,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SuccessScreen;
