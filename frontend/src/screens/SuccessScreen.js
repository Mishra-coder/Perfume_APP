import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton, useTheme as usePaperTheme } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const SuccessScreen = ({ navigation, route }) => {
    const { clearCart } = useCart();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const orderId = route.params?.orderId || 'AL-DIRECT';

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.contentContainer}>
                <View style={[styles.successIconContainer, { backgroundColor: colors.primary }]}>
                    <IconButton icon="check-bold" size={60} iconColor={isDarkMode ? '#000000' : '#ffffff'} />
                </View>

                <Text style={[styles.title, { color: colors.text }]}>Order Placed!</Text>
                <Text style={[styles.message, { color: isDarkMode ? '#888888' : '#666666' }]}>
                    Your luxury scent is being prepared for shipment.
                </Text>

                <View style={[styles.detailsBox, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fcfcfc', borderColor: isDarkMode ? '#333333' : '#f0f0f0' }]}>
                    <DetailRow label="Order ID" value={orderId} />
                    <DetailRow label="Status" value="Processing" color={isDarkMode ? colors.primary : "#27ae60"} />
                    <DetailRow label="Delivery" value="3-5 Days" />
                </View>

                <Button
                    mode="contained"
                    style={styles.continueButton}
                    contentStyle={styles.continueButtonContent}
                    labelStyle={[styles.continueButtonLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                    onPress={() => navigation.navigate('Main')}
                >
                    Continue Shopping
                </Button>
            </View>
        </View>
    );
};

const DetailRow = ({ label, value, color }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={[styles.rowValue, color && { color }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    contentContainer: {
        alignItems: 'center',
        padding: 30
    },
    successIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        marginBottom: 15
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40
    },
    detailsBox: {
        width: '100%',
        borderRadius: 20,
        padding: 25,
        marginBottom: 45,
        borderWidth: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    rowLabel: {
        fontSize: 14,
        color: '#999999',
        fontWeight: 'bold'
    },
    rowValue: {
        fontSize: 14,
        fontWeight: '900'
    },
    continueButton: {
        width: '100%',
        borderRadius: 15
    },
    continueButtonContent: {
        height: 60
    },
    continueButtonLabel: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default SuccessScreen;
