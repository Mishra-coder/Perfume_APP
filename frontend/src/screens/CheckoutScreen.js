import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, Text, RadioButton, Surface, Snackbar, useTheme as usePaperTheme, IconButton } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const CheckoutScreen = ({ navigation }) => {
    const { getGrandTotal, cartItems, clearCart } = useCart();
    const { user, saveOrder } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoError, setPromoError] = useState('');
    const [isPromoApplied, setIsPromoApplied] = useState(false);

    const [addressForm, setAddressForm] = useState({
        name: user.name || '',
        phone: '',
        street: '',
        city: '',
        zip: ''
    });

    const isFormValid =
        addressForm.name &&
        addressForm.phone.length === 10 &&
        addressForm.street &&
        addressForm.city &&
        addressForm.zip.length === 6;

    const applyPromo = () => {
        setPromoError('');
        const code = promoCode.trim().toUpperCase();
        if (code === 'LUXE20') {
            const discValue = Math.round(getGrandTotal() * 0.2);
            setDiscount(discValue);
            setIsPromoApplied(true);
        } else if (code === 'FIRST50') {
            setDiscount(500);
            setIsPromoApplied(true);
        } else {
            setPromoError('The entered code is invalid or expired.');
            setDiscount(0);
            setIsPromoApplied(false);
        }
    };

    const handleConfirmOrder = () => {
        const orderId = `AL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        saveOrder({
            id: orderId,
            items: cartItems,
            total: getGrandTotal() - discount,
            discount: discount,
            date: new Date().toISOString(),
            status: 'Processing',
            address: addressForm,
            method: paymentMethod
        });
        clearCart();
        navigation.navigate('Success', { orderId });
    };

    const updateField = (key, value) => {
        if (['zip', 'phone'].includes(key)) {
            const cleanValue = value.replace(/[^0-9]/g, '');
            if (key === 'zip' && cleanValue.length > 6) return;
            if (key === 'phone' && cleanValue.length > 10) return;
            setAddressForm(prev => ({ ...prev, [key]: cleanValue }));
            return;
        }
        setAddressForm(prev => ({ ...prev, [key]: value }));
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="SECURE CHECKOUT" titleStyle={styles.headerTitle} />
            </Appbar.Header>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
                <Section title="Shipping Details" colors={colors} isDark={isDarkMode}>
                    <TextInput
                        label="Full Name"
                        value={addressForm.name}
                        onChangeText={t => updateField('name', t)}
                        mode="flat"
                        style={styles.inputField}
                        activeUnderlineColor={colors.primary}
                        textColor={colors.text}
                    />
                    <TextInput
                        label="Contact Number"
                        value={addressForm.phone}
                        onChangeText={t => updateField('phone', t)}
                        mode="flat"
                        keyboardType="phone-pad"
                        style={styles.inputField}
                        activeUnderlineColor={colors.primary}
                        textColor={colors.text}
                    />
                    <TextInput
                        label="Street Address"
                        value={addressForm.street}
                        onChangeText={t => updateField('street', t)}
                        mode="flat"
                        style={styles.inputField}
                        activeUnderlineColor={colors.primary}
                        textColor={colors.text}
                    />
                    <View style={styles.rowContainer}>
                        <TextInput
                            label="City"
                            value={addressForm.city}
                            onChangeText={t => updateField('city', t)}
                            mode="flat"
                            style={[styles.inputField, { flex: 1.5, marginRight: 10 }]}
                            activeUnderlineColor={colors.primary}
                            textColor={colors.text}
                        />
                        <TextInput
                            label="Zip Code"
                            value={addressForm.zip}
                            onChangeText={t => updateField('zip', t)}
                            mode="flat"
                            keyboardType="number-pad"
                            style={[styles.inputField, { flex: 1 }]}
                            activeUnderlineColor={colors.primary}
                            textColor={colors.text}
                        />
                    </View>
                </Section>

                <Section title="Payment Method" colors={colors} isDark={isDarkMode}>
                    <PaymentOption
                        label="Secure UPI"
                        value="upi"
                        current={paymentMethod}
                        onSelect={setPaymentMethod}
                        colors={colors}
                        icon="lightning-bolt-outline"
                    />
                    <PaymentOption
                        label="Payment on Collection"
                        value="cod"
                        current={paymentMethod}
                        onSelect={setPaymentMethod}
                        colors={colors}
                        icon="cash-multiple"
                    />
                    <PaymentOption
                        label="Elite Card"
                        value="card"
                        current={paymentMethod}
                        onSelect={setPaymentMethod}
                        colors={colors}
                        icon="credit-card-outline"
                    />
                </Section>

                <Section title="Exclusive Offers" colors={colors} isDark={isDarkMode}>
                    <View style={styles.promoRow}>
                        <TextInput
                            placeholder="Promo Code"
                            value={promoCode}
                            onChangeText={setPromoCode}
                            mode="flat"
                            style={styles.promoInput}
                            activeUnderlineColor={colors.primary}
                            textColor={colors.text}
                            editable={!isPromoApplied}
                        />
                        <Button
                            mode="contained"
                            onPress={applyPromo}
                            disabled={!promoCode || isPromoApplied}
                            style={styles.applyBtn}
                            buttonColor={colors.primary}
                            textColor={isDarkMode ? '#000' : '#FFF'}
                            labelStyle={{ fontWeight: '900', fontSize: 12 }}
                        >
                            {isPromoApplied ? 'APPLIED' : 'APPLY'}
                        </Button>
                    </View>
                    {isPromoApplied && <Text style={[styles.promoSuccess, { color: '#4CAF50' }]}>Privilege discount applied successfully!</Text>}
                </Section>
            </ScrollView>

            <Surface style={[styles.footer, { backgroundColor: isDarkMode ? '#050505' : '#FFF', borderTopColor: isDarkMode ? '#1F1F1F' : '#EEE' }]} elevation={4}>
                <View style={{ overflow: 'hidden', borderRadius: 32 }}>
                    {discount > 0 && (
                        <>
                            <View style={styles.footerRow}>
                                <Text style={styles.footerLabelSmall}>Bag Subtotal</Text>
                                <Text style={[styles.footerValueSmall, { color: colors.text }]}>₹{getGrandTotal().toLocaleString()}</Text>
                            </View>
                            <View style={styles.footerRow}>
                                <Text style={styles.footerLabelSmall}>Privilege Discount</Text>
                                <Text style={[styles.footerValueSmall, { color: '#4CAF50' }]}>−₹{discount.toLocaleString()}</Text>
                            </View>
                            <View style={styles.divider} />
                        </>
                    )}
                    <View style={styles.footerTotalRow}>
                        <Text style={[styles.footerTotalLabel, { color: colors.text }]}>Grand Total</Text>
                        <Text style={[styles.footerTotalVal, { color: colors.primary }]}>₹{(getGrandTotal() - discount).toLocaleString()}</Text>
                    </View>
                    <Button
                        mode="contained"
                        style={[styles.payBtn, { backgroundColor: isFormValid ? colors.primary : (isDarkMode ? '#1F1F1F' : '#EEE') }]}
                        contentStyle={styles.payBtnContent}
                        labelStyle={[styles.payBtnLabel, { color: isFormValid ? (isDarkMode ? '#000' : '#FFF') : '#666' }]}
                        disabled={!isFormValid}
                        onPress={handleConfirmOrder}
                    >
                        CONFIRM ORDER
                    </Button>
                </View>
            </Surface>

            <Snackbar
                visible={!!promoError}
                onDismiss={() => setPromoError('')}
                duration={2000}
                style={{ backgroundColor: '#F44', borderRadius: 12 }}
            >
                {promoError}
            </Snackbar>
        </View>
    );
};

const Section = ({ title, children, colors, isDark }) => (
    <View style={styles.sectionContainer}>
        <Text style={[styles.sectionLabel, { color: colors.primary }]}>{title}</Text>
        <Surface style={[styles.formCard, { backgroundColor: isDark ? 'rgba(212, 175, 55, 0.03)' : 'rgba(0,0,0,0.02)', borderColor: 'rgba(212, 175, 55, 0.1)' }]} elevation={0}>
            <View style={{ overflow: 'hidden', borderRadius: 24 }}>
                {children}
            </View>
        </Surface>
    </View>
);

const PaymentOption = ({ label, value, current, onSelect, colors, icon }) => (
    <TouchableOpacity
        style={styles.paymentRow}
        onPress={() => onSelect(value)}
        activeOpacity={0.7}
    >
        <IconButton icon={icon} iconColor={current === value ? colors.primary : '#888'} size={24} />
        <Text style={[styles.paymentLabel, { color: colors.text, fontWeight: current === value ? '800' : '500' }]}>{label}</Text>
        <RadioButton value={value} status={current === value ? 'checked' : 'unchecked'} color={colors.primary} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    contentContainer: { flex: 1, paddingHorizontal: 20 },
    appbar: { height: 100, paddingTop: 40 },
    headerTitle: { fontWeight: '900', fontSize: 16, letterSpacing: 2 },
    sectionContainer: { marginTop: 20 },
    sectionLabel: { fontSize: 12, fontWeight: '900', letterSpacing: 1.5, marginBottom: 12, textTransform: 'uppercase' },
    formCard: { borderRadius: 24, borderWidth: 1 },
    inputField: { backgroundColor: 'transparent', height: 56, fontSize: 14 },
    rowContainer: { flexDirection: 'row' },
    paymentRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 4 },
    paymentLabel: { flex: 1, fontSize: 15, marginLeft: 8 },
    promoRow: { flexDirection: 'row', alignItems: 'center', padding: 8 },
    promoInput: { flex: 1, backgroundColor: 'transparent', height: 50, fontSize: 14 },
    applyBtn: { marginLeft: 10, borderRadius: 12 },
    promoSuccess: { fontSize: 12, marginTop: 10, fontWeight: '700', paddingHorizontal: 16, paddingBottom: 12 },
    footer: {
        padding: 24,
        paddingBottom: 40,
        borderTopWidth: 1,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    footerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    footerLabelSmall: { fontSize: 14, color: '#888', fontWeight: '500' },
    footerValueSmall: { fontSize: 14, fontWeight: '700' },
    divider: { height: 1, backgroundColor: 'rgba(128,128,128,0.1)', marginVertical: 12 },
    footerTotalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8, marginBottom: 25, alignItems: 'center' },
    footerTotalLabel: { fontSize: 18, fontWeight: '900' },
    footerTotalVal: { fontSize: 24, fontWeight: '900' },
    payBtn: { borderRadius: 20 },
    payBtnContent: { height: 60 },
    payBtnLabel: { fontWeight: '900', fontSize: 16, letterSpacing: 2 }
});

export default CheckoutScreen;
