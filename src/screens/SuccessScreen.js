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
            <View style={styles.center}>
                <View style={[styles.iconBox, { backgroundColor: colors.primary }]}>
                    <IconButton icon="check-bold" size={60} iconColor={isDarkMode ? '#000000' : '#ffffff'} />
                </View>

                <Text style={[styles.title, { color: colors.text }]}>Order Confirmed!</Text>
                <Text style={[styles.subtitle, { color: isDarkMode ? '#888888' : '#666666' }]}>
                    Your luxury selection is being prepared. We'll notify you once it's on the way.
                </Text>

                <View style={[styles.summary, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fcfcfc', borderColor: isDarkMode ? '#333333' : '#f0f0f0' }]}>
                    <InfoRow label="Order ID" value={orderId} themeColors={colors} />
                    <InfoRow label="Status" value="Processing" color={isDarkMode ? colors.primary : "#27ae60"} themeColors={colors} />
                    <InfoRow label="Est. Delivery" value="3-5 Business Days" themeColors={colors} />
                </View>

                <Button
                    mode="contained"
                    style={[styles.btn, { backgroundColor: colors.primary }]}
                    contentStyle={styles.btnContent}
                    labelStyle={[styles.btnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                    onPress={() => navigation.navigate('Main')}
                >
                    Return to Boutique
                </Button>
            </View>
        </View>
    );
};

const InfoRow = ({ label, value, color, themeColors }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={[styles.infoValue, { color: color || themeColors.text }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        padding: 30,
    },
    iconBox: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        elevation: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        marginBottom: 15,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    summary: {
        width: '100%',
        borderRadius: 20,
        padding: 25,
        marginBottom: 40,
        borderWidth: 1,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    infoLabel: {
        fontSize: 14,
        color: '#999999',
        fontWeight: 'bold',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '900',
    },
    btn: {
        width: '100%',
        borderRadius: 15,
    },
    btnContent: {
        height: 60,
    },
    btnLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default SuccessScreen;
