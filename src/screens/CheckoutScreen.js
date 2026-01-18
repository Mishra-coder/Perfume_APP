import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, Text, RadioButton, Surface, useTheme as usePaperTheme } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const CheckoutScreen = ({ navigation }) => {
    const { getGrandTotal, cartItems } = useCart();
    const { user, saveOrder } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [address, setAddress] = useState({
        name: user.name || '',
        phone: '',
        street: '',
        city: '',
        zipcode: ''
    });

    const isComplete =
        address.name &&
        address.phone.length === 10 &&
        address.street &&
        address.city &&
        address.zipcode.length === 6;

    const handlePlaceOrder = () => {
        const orderId = `AL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

        const order = {
            id: orderId,
            items: cartItems,
            totalAmount: getGrandTotal(),
            date: new Date().toISOString(),
            status: 'Processing',
            shipping: address,
            paymentMethod
        };

        saveOrder(order);
        navigation.navigate('Success', { orderId });
    };

    const updateField = (field, value) => {
        if (field === 'zipcode') {
            const clean = value.replace(/[^0-9]/g, '');
            if (clean.length > 6) return;
            setAddress(prev => ({ ...prev, zipcode: clean }));
            return;
        }

        if (field === 'phone') {
            const clean = value.replace(/[^0-9]/g, '');
            if (clean.length > 10) return;
            setAddress(prev => ({ ...prev, phone: clean }));
            return;
        }

        setAddress(prev => ({ ...prev, [field]: value }));
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background, borderBottomColor: isDarkMode ? '#222222' : '#f0f0f0' }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Order Details" titleStyle={[styles.appbarTitle, { color: colors.text }]} />
            </Appbar.Header>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Shipping Info</Text>

                    <TextInput
                        label="Recipient Name"
                        value={address.name}
                        onChangeText={(t) => updateField('name', t)}
                        mode="outlined"
                        style={[styles.input, { backgroundColor: colors.background }]}
                        activeOutlineColor={colors.primary}
                        textColor={colors.text}
                    />

                    <TextInput
                        label="Phone Number"
                        value={address.phone}
                        onChangeText={(t) => updateField('phone', t)}
                        mode="outlined"
                        keyboardType="phone-pad"
                        placeholder="10 digit mobile number"
                        style={[styles.input, { backgroundColor: colors.background }]}
                        activeOutlineColor={colors.primary}
                        textColor={colors.text}
                        maxLength={10}
                    />

                    <TextInput
                        label="Complete Address"
                        value={address.street}
                        onChangeText={(t) => updateField('street', t)}
                        mode="outlined"
                        style={[styles.input, { backgroundColor: colors.background }]}
                        activeOutlineColor={colors.primary}
                        textColor={colors.text}
                    />

                    <View style={styles.row}>
                        <TextInput
                            label="City"
                            value={address.city}
                            onChangeText={(t) => updateField('city', t)}
                            mode="outlined"
                            style={[styles.input, { flex: 1.5, marginRight: 10, backgroundColor: colors.background }]}
                            activeOutlineColor={colors.primary}
                            textColor={colors.text}
                        />
                        <TextInput
                            label="Zipcode"
                            value={address.zipcode}
                            onChangeText={(t) => updateField('zipcode', t)}
                            mode="outlined"
                            keyboardType="number-pad"
                            placeholder="6 digits"
                            style={[styles.input, { flex: 1, backgroundColor: colors.background }]}
                            activeOutlineColor={colors.primary}
                            textColor={colors.text}
                            maxLength={6}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>How will you pay?</Text>
                    <Surface style={[styles.card, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]} elevation={0}>
                        <PaymentRow label="UPI Transfer" selected={paymentMethod === 'upi'} onSelect={() => setPaymentMethod('upi')} themeColors={colors} />
                        <PaymentRow label="Cash on Delivery" selected={paymentMethod === 'cod'} onSelect={() => setPaymentMethod('cod')} themeColors={colors} />
                        <PaymentRow label="Card Payment" selected={paymentMethod === 'card'} onSelect={() => setPaymentMethod('card')} themeColors={colors} />
                    </Surface>
                </View>

                <View style={styles.footer}>
                    <View style={styles.summary}>
                        <Text style={styles.summaryLabel}>Grand Total</Text>
                        <Text style={[styles.summaryPrice, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>₹{getGrandTotal()}</Text>
                    </View>

                    <Button
                        mode="contained"
                        style={[styles.confirmBtn, { backgroundColor: colors.primary }]}
                        contentStyle={styles.confirmBtnContent}
                        labelStyle={[styles.confirmBtnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                        disabled={!isComplete}
                        onPress={handlePlaceOrder}
                    >
                        Confirm Purchase
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

const PaymentRow = ({ label, selected, onSelect, themeColors }) => (
    <TouchableOpacity style={styles.paymentRow} onPress={onSelect}>
        <RadioButton value="selected" status={selected ? 'checked' : 'unchecked'} color={themeColors.primary} onPress={onSelect} />
        <Text style={[styles.paymentLabel, { color: themeColors.text }]}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        borderBottomWidth: 1,
    },
    appbarTitle: {
        fontWeight: 'bold',
    },
    scroll: {
        flex: 1,
        padding: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        marginBottom: 15,
    },
    row: {
        flexDirection: 'row',
    },
    card: {
        borderRadius: 15,
        padding: 5,
    },
    paymentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    paymentLabel: {
        fontSize: 15,
        marginLeft: 5,
    },
    footer: {
        marginTop: 10,
        paddingBottom: 50,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666666',
    },
    summaryPrice: {
        fontSize: 24,
        fontWeight: '900',
    },
    confirmBtn: {
        borderRadius: 15,
    },
    confirmBtnContent: {
        height: 60,
    },
    confirmBtnLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CheckoutScreen;
