import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, IconButton, Button, Surface } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const CartScreen = ({ navigation }) => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getSubtotal,
        getGrandTotal,
        taxes,
        SHIPPING_FEE
    } = useCart();

    const { user } = useUser();

    const handleCheckout = () => {
        if (user.isLoggedIn) {
            navigation.navigate('Checkout');
        } else {
            navigation.navigate('Auth');
        }
    };

    const renderSummary = () => (
        <Surface style={styles.summaryContainer} elevation={0}>
            <View style={styles.calculationRow}>
                <Text style={styles.calculationLabel}>Subtotal</Text>
                <Text style={styles.calculationValue}>₹{getSubtotal()}</Text>
            </View>
            <View style={styles.calculationRow}>
                <Text style={styles.calculationLabel}>GST (12%)</Text>
                <Text style={styles.calculationValue}>₹{taxes}</Text>
            </View>
            <View style={styles.calculationRow}>
                <Text style={styles.calculationLabel}>Shipping</Text>
                <Text style={styles.calculationValue}>₹{SHIPPING_FEE}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Grand Total</Text>
                <Text style={styles.totalPrice}>₹{getGrandTotal()}</Text>
            </View>

            <Button
                mode="contained"
                style={styles.checkoutBtn}
                contentStyle={styles.checkoutBtnContent}
                labelStyle={styles.checkoutBtnLabel}
                onPress={handleCheckout}
            >
                Proceed to Checkout
            </Button>
        </Surface>
    );

    const renderEmptyCart = () => (
        <View style={styles.emptyState}>
            <IconButton icon="cart-outline" size={80} iconColor="#f0f0f0" />
            <Text style={styles.emptyTitle}>Your bag is empty</Text>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('Main')}
                style={styles.shopNowBtn}
                textColor="#1a1a1a"
            >
                Start Shopping
            </Button>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.appBar}>
                <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} />
                <Text style={styles.screenTitle}>Shopping Bag</Text>
                <View style={{ width: 48 }} />
            </View>

            {cartItems.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <CartItem
                                item={item}
                                onRemove={() => removeFromCart(item.id)}
                                onUpdate={(delta) => updateQuantity(item.id, delta)}
                            />
                        )}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                    {renderSummary()}
                </View>
            ) : renderEmptyCart()}
        </View>
    );
};

const CartItem = ({ item, onRemove, onUpdate }) => (
    <Surface style={styles.itemCard} elevation={0}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.itemDetails}>
            <View style={styles.itemHeader}>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <TouchableOpacity onPress={onRemove}>
                    <IconButton icon="delete-outline" size={20} iconColor="#ccc" />
                </TouchableOpacity>
            </View>
            <Text style={styles.productCategory}>{item.category} • 200ml</Text>
            <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>

                <View style={styles.qtyContainer}>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => onUpdate(-1)}>
                        <Text style={styles.qtySign}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity style={styles.qtyBtn} onPress={() => onUpdate(1)}>
                        <Text style={styles.qtySign}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Surface>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    appBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
        paddingBottom: 10,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    listContent: {
        padding: 25,
    },
    itemCard: {
        flexDirection: 'row',
        marginBottom: 25,
        backgroundColor: '#fff',
    },
    productImage: {
        width: 90,
        height: 90,
        borderRadius: 15,
        backgroundColor: '#f9f9f9',
    },
    itemDetails: {
        flex: 1,
        marginLeft: 15,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        color: '#1a1a1a',
    },
    productCategory: {
        fontSize: 12,
        color: '#999',
        marginTop: 2,
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 5,
    },
    qtyBtn: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtySign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    qtyText: {
        marginHorizontal: 12,
        fontWeight: 'bold',
    },
    summaryContainer: {
        padding: 25,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    calculationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    calculationLabel: {
        color: '#888',
        fontSize: 14,
    },
    calculationValue: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#1a1a1a',
    },
    divider: {
        height: 1,
        backgroundColor: '#f5f5f5',
        marginVertical: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 25,
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    checkoutBtn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
    },
    checkoutBtnContent: {
        height: 60,
    },
    checkoutBtnLabel: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: 18,
        color: '#999',
        marginVertical: 20,
    },
    shopNowBtn: {
        borderRadius: 15,
        width: '100%',
        borderColor: '#f0f0f0',
    },
});

export default CartScreen;
