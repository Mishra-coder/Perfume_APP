import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, Text, RadioButton, Surface } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const CheckoutScreen = ({ navigation }) => {
    const { getGrandTotal, cartItems } = useCart();
    const { user, saveOrder } = useUser();

    const [paymentOption, setPaymentOption] = useState('cod');
    const [destination, setDestination] = useState({
        userName: user.name || '',
        phone: '',
        street: '',
        city: '',
        zip: ''
    });

    const canPlaceOrder = destination.userName && destination.phone && destination.street && destination.city && destination.zip;

    const onPlaceOrder = () => {
        const orderId = `AL-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
        const finalOrder = {
            id: orderId,
            items: cartItems,
            total: getGrandTotal(),
            date: new Date().toISOString(),
            status: 'Processing',
            shipping: destination,
            payment: paymentOption
        };

        saveOrder(finalOrder);
        navigation.navigate('Success', { orderId });
    };

    const updateField = (key, value) => {
        setDestination(prev => ({ ...prev, [key]: value }));
    };

    return (
        <View style={styles.base}>
            <Appbar.Header style={styles.navBar}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Order Details" titleStyle={styles.navTitle} />
            </Appbar.Header>

            <ScrollView style={styles.scroller} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping Info</Text>
                    <TextInput
                        label="Recipient Name"
                        value={destination.userName}
                        onChangeText={(v) => updateField('userName', v)}
                        mode="outlined"
                        style={styles.field}
                    />
                    <TextInput
                        label="Phone Number"
                        value={destination.phone}
                        onChangeText={(v) => updateField('phone', v)}
                        mode="outlined"
                        keyboardType="phone-pad"
                        style={styles.field}
                    />
                    <TextInput
                        label="Complete Address"
                        value={destination.street}
                        onChangeText={(v) => updateField('street', v)}
                        mode="outlined"
                        style={styles.field}
                    />
                    <View style={styles.splitRow}>
                        <TextInput
                            label="City"
                            value={destination.city}
                            onChangeText={(v) => updateField('city', v)}
                            mode="outlined"
                            style={[styles.field, { flex: 1.5, marginRight: 10 }]}
                        />
                        <TextInput
                            label="Zip"
                            value={destination.zip}
                            onChangeText={(v) => updateField('zip', v)}
                            mode="outlined"
                            keyboardType="number-pad"
                            style={[styles.field, { flex: 1 }]}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>How will you pay?</Text>
                    <Surface style={styles.optionsCard} elevation={0}>
                        <PaymentRow
                            label="UPI Transfer"
                            selected={paymentOption === 'upi'}
                            onSelect={() => setPaymentOption('upi')}
                        />
                        <PaymentRow
                            label="Cash on Delivery"
                            selected={paymentOption === 'cod'}
                            onSelect={() => setPaymentOption('cod')}
                        />
                        <PaymentRow
                            label="Card Payment"
                            selected={paymentOption === 'card'}
                            onSelect={() => setPaymentOption('card')}
                        />
                    </Surface>
                </View>

                <View style={styles.footer}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Grand Total</Text>
                        <Text style={styles.priceValue}>₹{getGrandTotal()}</Text>
                    </View>
                    <Button
                        mode="contained"
                        style={styles.actionBtn}
                        contentStyle={styles.btnInner}
                        labelStyle={styles.btnText}
                        disabled={!canPlaceOrder}
                        onPress={onPlaceOrder}
                    >
                        Confirm Purchase
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

const PaymentRow = ({ label, selected, onSelect }) => (
    <TouchableOpacity style={styles.payRow} onPress={onSelect}>
        <RadioButton value="v" status={selected ? 'checked' : 'unchecked'} color="#000" onPress={onSelect} />
        <Text style={styles.payLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    base: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navBar: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    navTitle: {
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    scroller: {
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
        color: '#1a1a1a',
    },
    field: {
        marginBottom: 15,
        backgroundColor: '#fff',
        color: '#1a1a1a',
    },
    splitRow: {
        flexDirection: 'row',
    },
    optionsCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        padding: 5,
    },
    payRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    payLabel: {
        fontSize: 15,
        marginLeft: 5,
        color: '#1a1a1a',
    },
    footer: {
        marginTop: 10,
        paddingBottom: 50,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
    },
    priceLabel: {
        fontSize: 16,
        color: '#666',
    },
    priceValue: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    actionBtn: {
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

export default CheckoutScreen;
