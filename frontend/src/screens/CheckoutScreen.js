import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, Text, RadioButton, Surface, Snackbar, useTheme as usePaperTheme } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const CheckoutScreen = ({ navigation }) => {
    const { getGrandTotal, cartItems } = useCart();
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
            setPromoError('Invalid promo code');
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
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background, borderBottomColor: isDarkMode ? '#222222' : '#f0f0f0' }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Checkout" titleStyle={[styles.headerTitle, { color: colors.text }]} />
            </Appbar.Header>

            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <AddressForm
                    form={addressForm}
                    onUpdate={updateField}
                    colors={colors}
                />

                <PaymentSection
                    selectedMethod={paymentMethod}
                    onSelect={setPaymentMethod}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />

                <PromoSection
                    code={promoCode}
                    onCodeChange={setPromoCode}
                    onApply={applyPromo}
                    error={promoError}
                    isApplied={isPromoApplied}
                    colors={colors}
                />

                <OrderFooter
                    subtotal={getGrandTotal()}
                    discount={discount}
                    total={getGrandTotal() - discount}
                    isValid={isFormValid}
                    onConfirm={handleConfirmOrder}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />
            </ScrollView>
            <Snackbar visible={!!promoError} onDismiss={() => setPromoError('')} duration={2000}>{promoError}</Snackbar>
        </View>
    );
};

const AddressForm = ({ form, onUpdate, colors }) => (
    <View style={styles.sectionContainer}>
        <Text style={[styles.sectionLabel, { color: colors.text }]}>Shipping Address</Text>
        <TextInput
            label="Name"
            value={form.name}
            onChangeText={t => onUpdate('name', t)}
            mode="outlined"
            style={styles.inputField}
            activeOutlineColor={colors.primary}
        />
        <TextInput
            label="Phone"
            value={form.phone}
            onChangeText={t => onUpdate('phone', t)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.inputField}
            activeOutlineColor={colors.primary}
        />
        <TextInput
            label="Street"
            value={form.street}
            onChangeText={t => onUpdate('street', t)}
            mode="outlined"
            style={styles.inputField}
            activeOutlineColor={colors.primary}
        />
        <View style={styles.rowContainer}>
            <TextInput
                label="City"
                value={form.city}
                onChangeText={t => onUpdate('city', t)}
                mode="outlined"
                style={[styles.inputField, { flex: 1.5, marginRight: 10 }]}
                activeOutlineColor={colors.primary}
            />
            <TextInput
                label="Zip"
                value={form.zip}
                onChangeText={t => onUpdate('zip', t)}
                mode="outlined"
                keyboardType="number-pad"
                style={[styles.inputField, { flex: 1 }]}
                activeOutlineColor={colors.primary}
            />
        </View>
    </View>
);

const PaymentSection = ({ selectedMethod, onSelect, isDarkMode, colors }) => (
    <View style={styles.sectionContainer}>
        <Text style={[styles.sectionLabel, { color: colors.text }]}>Payment Method</Text>
        <Surface style={[styles.paymentCard, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]} elevation={0}>
            <PaymentOption
                label="UPI"
                value="upi"
                active={selectedMethod === 'upi'}
                onSelect={onSelect}
                colors={colors}
                isDarkMode={isDarkMode}
            />
            <PaymentOption
                label="Cash on Delivery"
                value="cod"
                active={selectedMethod === 'cod'}
                onSelect={onSelect}
                colors={colors}
                isDarkMode={isDarkMode}
            />
            <PaymentOption
                label="Card"
                value="card"
                active={selectedMethod === 'card'}
                onSelect={onSelect}
                colors={colors}
                isDarkMode={isDarkMode}
            />
        </Surface>
    </View>
);

const PaymentOption = ({ label, value, active, onSelect, colors, isDarkMode }) => (
    <TouchableOpacity
        style={[
            styles.paymentOptionRow,
            active && {
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
                borderColor: colors.primary,
                borderWidth: 1
            }
        ]}
        onPress={() => onSelect(value)}
    >
        <RadioButton value={value} status={active ? 'checked' : 'unchecked'} color={colors.primary} onPress={() => onSelect(value)} />
        <Text style={{ color: colors.text, marginLeft: 5, fontWeight: active ? 'bold' : 'normal' }}>{label}</Text>
    </TouchableOpacity>
);

const PromoSection = ({ code, onCodeChange, onApply, error, isApplied, colors }) => (
    <View style={styles.sectionContainer}>
        <Text style={[styles.sectionLabel, { color: colors.text }]}>Promo Code</Text>
        <View style={styles.promoInputRow}>
            <TextInput
                placeholder="Enter Code (e.g. LUXE20)"
                value={code}
                onChangeText={onCodeChange}
                mode="outlined"
                style={styles.promoInput}
                activeOutlineColor={colors.primary}
                outlineColor={isApplied ? '#4CAF50' : (error ? '#F44336' : '#ccc')}
                editable={!isApplied}
            />
            <Button
                mode="contained"
                onPress={onApply}
                disabled={!code || isApplied}
                style={styles.applyBtn}
                buttonColor={isApplied ? '#4CAF50' : colors.primary}
                labelStyle={{ color: '#000' }}
            >
                {isApplied ? 'Applied' : 'Apply'}
            </Button>
        </View>
        {isApplied && <Text style={styles.promoSuccess}>Promo applied successfully!</Text>}
    </View>
);

const OrderFooter = ({ subtotal, discount, total, isValid, onConfirm, isDarkMode, colors }) => (
    <View style={styles.footerContainer}>
        {discount > 0 && (
            <View style={styles.summaryRowSmall}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={[styles.summaryVal, { color: colors.text }]}>₹{subtotal}</Text>
            </View>
        )}
        {discount > 0 && (
            <View style={styles.summaryRowSmall}>
                <Text style={styles.summaryLabel}>Discount</Text>
                <Text style={[styles.summaryVal, { color: '#4CAF50' }]}>−₹{discount}</Text>
            </View>
        )}
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Payable</Text>
            <Text style={[styles.totalAmount, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>₹{total}</Text>
        </View>
        <Button
            mode="contained"
            style={[
                styles.confirmButton,
                { backgroundColor: isValid ? colors.primary : (isDarkMode ? '#333333' : '#e0e0e0') }
            ]}
            contentStyle={styles.confirmButtonContent}
            labelStyle={[
                styles.confirmButtonLabel,
                { color: isValid ? (isDarkMode ? '#000000' : '#ffffff') : (isDarkMode ? '#666666' : '#999999') }
            ]}
            disabled={!isValid}
            onPress={onConfirm}
        >
            Confirm Order
        </Button>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        borderBottomWidth: 1
    },
    headerTitle: {
        fontWeight: 'bold'
    },
    contentContainer: {
        flex: 1,
        padding: 25
    },
    sectionContainer: {
        marginBottom: 35
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20
    },
    inputField: {
        marginBottom: 15,
        backgroundColor: 'transparent'
    },
    rowContainer: {
        flexDirection: 'row'
    },
    paymentCard: {
        borderRadius: 15,
        padding: 5
    },
    paymentOptionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    footerContainer: {
        marginTop: 10,
        paddingBottom: 60
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        alignItems: 'center'
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666666'
    },
    totalAmount: {
        fontSize: 26,
        fontWeight: '900'
    },
    confirmButton: {
        borderRadius: 15
    },
    confirmButtonContent: {
        height: 60
    },
    confirmButtonLabel: {
        fontWeight: 'bold',
        fontSize: 16
    },
    promoInputRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    promoInput: {
        flex: 1,
        marginRight: 10,
        backgroundColor: 'transparent',
        height: 50
    },
    applyBtn: {
        borderRadius: 10,
        height: 50,
        justifyContent: 'center'
    },
    promoSuccess: {
        color: '#4CAF50',
        fontSize: 12,
        marginTop: 5,
        fontWeight: 'bold'
    },
    summaryRowSmall: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8
    },
    summaryVal: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default CheckoutScreen;
