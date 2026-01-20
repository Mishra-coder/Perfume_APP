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

    const [method, setMethod] = useState('cod');
    const [form, setForm] = useState({
        name: user.name || '',
        phone: '',
        street: '',
        city: '',
        zip: ''
    });

    const isValid = form.name && form.phone.length === 10 && form.street && form.city && form.zip.length === 6;

    const handleConfirm = () => {
        const id = `AL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        saveOrder({
            id,
            items: cartItems,
            total: getGrandTotal(),
            date: new Date().toISOString(),
            status: 'Processing',
            address: form,
            method
        });
        navigation.navigate('Success', { orderId: id });
    };

    const update = (key, val) => {
        if (['zip', 'phone'].includes(key)) {
            const clean = val.replace(/[^0-9]/g, '');
            if (key === 'zip' && clean.length > 6) return;
            if (key === 'phone' && clean.length > 10) return;
            setForm(prev => ({ ...prev, [key]: clean }));
            return;
        }
        setForm(prev => ({ ...prev, [key]: val }));
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background, borderBottomColor: isDarkMode ? '#222222' : '#f0f0f0' }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Checkout" titleStyle={[styles.title, { color: colors.text }]} />
            </Appbar.Header>

            <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={[styles.label, { color: colors.text }]}>Shipping Address</Text>
                    <TextInput label="Name" value={form.name} onChangeText={t => update('name', t)} mode="outlined" style={styles.input} activeOutlineColor={colors.primary} />
                    <TextInput label="Phone" value={form.phone} onChangeText={t => update('phone', t)} mode="outlined" keyboardType="phone-pad" style={styles.input} activeOutlineColor={colors.primary} />
                    <TextInput label="Street" value={form.street} onChangeText={t => update('street', t)} mode="outlined" style={styles.input} activeOutlineColor={colors.primary} />
                    <View style={styles.row}>
                        <TextInput label="City" value={form.city} onChangeText={t => update('city', t)} mode="outlined" style={[styles.input, { flex: 1.5, marginRight: 10 }]} activeOutlineColor={colors.primary} />
                        <TextInput label="Zip" value={form.zip} onChangeText={t => update('zip', t)} mode="outlined" keyboardType="number-pad" style={[styles.input, { flex: 1 }]} activeOutlineColor={colors.primary} />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={[styles.label, { color: colors.text }]}>Payment Method</Text>
                    <Surface style={[styles.card, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]} elevation={0}>
                        <PaymentOption label="UPI" active={method === 'upi'} onSelect={() => setMethod('upi')} color={colors.primary} text={colors.text} isDarkMode={isDarkMode} />
                        <PaymentOption label="Cash on Delivery" active={method === 'cod'} onSelect={() => setMethod('cod')} color={colors.primary} text={colors.text} isDarkMode={isDarkMode} />
                        <PaymentOption label="Card" active={method === 'card'} onSelect={() => setMethod('card')} color={colors.primary} text={colors.text} isDarkMode={isDarkMode} />
                    </Surface>
                </View>

                <View style={styles.footer}>
                    <View style={styles.summary}>
                        <Text style={styles.summaryLabel}>Total Payable</Text>
                        <Text style={[styles.total, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>₹{getGrandTotal()}</Text>
                    </View>
                    <Button
                        mode="contained"
                        style={[
                            styles.btn,
                            { backgroundColor: isValid ? colors.primary : (isDarkMode ? '#333333' : '#e0e0e0') }
                        ]}
                        contentStyle={styles.btnContent}
                        labelStyle={[
                            styles.btnLabel,
                            { color: isValid ? (isDarkMode ? '#000000' : '#ffffff') : (isDarkMode ? '#666666' : '#999999') }
                        ]}
                        disabled={!isValid}
                        onPress={handleConfirm}
                    >
                        Confirm Order
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

const PaymentOption = ({ label, active, onSelect, color, text, isDarkMode }) => (
    <TouchableOpacity
        style={[
            styles.payRow,
            active && {
                backgroundColor: isDarkMode ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 215, 0, 0.1)',
                borderColor: color,
                borderWidth: 1
            }
        ]}
        onPress={onSelect}
    >
        <RadioButton value="active" status={active ? 'checked' : 'unchecked'} color={color} onPress={onSelect} />
        <Text style={{ color: text, marginLeft: 5, fontWeight: active ? 'bold' : 'normal' }}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        borderBottomWidth: 1
    },
    title: {
        fontWeight: 'bold'
    },
    scroll: {
        flex: 1,
        padding: 25
    },
    section: {
        marginBottom: 35
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'transparent'
    },
    row: {
        flexDirection: 'row'
    },
    card: {
        borderRadius: 15,
        padding: 5
    },
    payRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    footer: {
        marginTop: 10,
        paddingBottom: 60
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        alignItems: 'center'
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666666'
    },
    total: {
        fontSize: 26,
        fontWeight: '900'
    },
    btn: {
        borderRadius: 15
    },
    btnContent: {
        height: 60
    },
    btnLabel: {
        fontWeight: 'bold',
        fontSize: 16
    }
});


export default CheckoutScreen;

