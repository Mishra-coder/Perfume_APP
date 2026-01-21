import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, IconButton, Button, Surface, useTheme as usePaperTheme } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const CartScreen = ({ navigation }) => {
    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        subtotal,
        taxAmount,
        shipping,
        finalTotal
    } = useCart();

    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const handleCheckout = () => {
        navigation.navigate(user.isLoggedIn ? 'Checkout' : 'Auth');
    };

    if (cartItems.length === 0) {
        return <EmptyState navigation={navigation} isDarkMode={isDarkMode} colors={colors} />;
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CartHeader navigation={navigation} colors={colors} />

            <View style={styles.contentContainer}>
                <FlatList
                    data={cartItems}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <CartItem
                            product={item}
                            isDarkMode={isDarkMode}
                            themeColors={colors}
                            onRemove={() => removeFromCart(item.id)}
                            onUpdateQuantity={(val) => updateQuantity(item.id, val)}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />

                <OrderSummary
                    subtotal={subtotal}
                    tax={taxAmount}
                    shipping={shipping}
                    total={finalTotal}
                    onCheckout={handleCheckout}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />
            </View>
        </View>
    );
};

const CartHeader = ({ navigation, colors }) => (
    <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => navigation.goBack()} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>Shopping Bag</Text>
        <View style={styles.headerSpacer} />
    </View>
);

const EmptyState = ({ navigation, isDarkMode, colors }) => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <CartHeader navigation={navigation} colors={colors} />
        <View style={styles.emptyContainer}>
            <IconButton icon="cart-outline" size={80} iconColor={isDarkMode ? '#222222' : '#f0f0f0'} />
            <Text style={styles.emptyText}>Your bag is empty</Text>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('Main')}
                style={[styles.shopButton, { borderColor: isDarkMode ? '#333333' : '#f0f0f0' }]}
                textColor={colors.text}
            >
                Start Shopping
            </Button>
        </View>
    </View>
);

const CartItem = ({ product, onRemove, onUpdateQuantity, isDarkMode, themeColors }) => (
    <Surface style={styles.itemCard} elevation={0}>
        <Image
            source={product.image}
            style={[styles.itemImage, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]}
        />
        <View style={styles.itemInfo}>
            <View style={styles.itemHeader}>
                <Text style={[styles.itemName, { color: themeColors.text }]} numberOfLines={1}>
                    {product.name}
                </Text>
                <TouchableOpacity onPress={onRemove}>
                    <IconButton icon="delete-outline" size={20} iconColor={isDarkMode ? '#444444' : '#cccccc'} />
                </TouchableOpacity>
            </View>

            <Text style={styles.itemMeta}>{product.category} • 200ml</Text>

            <View style={styles.itemFooter}>
                <Text style={[styles.itemPrice, { color: isDarkMode ? themeColors.primary : '#1a1a1a' }]}>
                    ₹{product.price * product.quantity}
                </Text>

                <View style={[styles.quantitySelector, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
                    <TouchableOpacity style={styles.quantityBtn} onPress={() => onUpdateQuantity(-1)}>
                        <Text style={[styles.quantityBtnText, { color: themeColors.text }]}>−</Text>
                    </TouchableOpacity>
                    <Text style={[styles.quantityValue, { color: themeColors.text }]}>{product.quantity}</Text>
                    <TouchableOpacity style={styles.quantityBtn} onPress={() => onUpdateQuantity(1)}>
                        <Text style={[styles.quantityBtnText, { color: themeColors.text }]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Surface>
);

const OrderSummary = ({ subtotal, tax, shipping, total, onCheckout, isDarkMode, colors }) => (
    <Surface style={[styles.summaryContainer, { backgroundColor: colors.background, borderTopColor: isDarkMode ? '#222222' : '#f0f0f0' }]} elevation={0}>
        <SummaryRow label="Subtotal" value={subtotal} colors={colors} />
        <SummaryRow label="GST (12%)" value={tax} colors={colors} />
        <SummaryRow label="Shipping" value={shipping} colors={colors} />

        <View style={[styles.divider, { backgroundColor: isDarkMode ? '#222222' : '#f5f5f5' }]} />

        <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Grand Total</Text>
            <Text style={[styles.totalValue, { color: colors.primary }]}>₹{total}</Text>
        </View>

        <Button
            mode="contained"
            style={[styles.checkoutButton, { backgroundColor: colors.primary }]}
            contentStyle={styles.checkoutButtonContent}
            labelStyle={[styles.checkoutButtonLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
            onPress={onCheckout}
        >
            Proceed to Checkout
        </Button>
    </Surface>
);

const SummaryRow = ({ label, value, colors }) => (
    <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={[styles.summaryValue, { color: colors.text }]}>₹{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 15,
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    headerSpacer: {
        width: 48
    },
    contentContainer: {
        flex: 1
    },
    listContainer: {
        paddingHorizontal: 25,
        paddingBottom: 25
    },
    itemCard: {
        flexDirection: 'row',
        marginBottom: 25,
        backgroundColor: 'transparent'
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 15
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    itemMeta: {
        fontSize: 12,
        color: '#999999',
        marginTop: 2
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '900'
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 5
    },
    quantityBtn: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quantityBtnText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    quantityValue: {
        marginHorizontal: 12,
        fontWeight: 'bold'
    },
    summaryContainer: {
        padding: 25,
        borderTopWidth: 1
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    summaryLabel: {
        color: '#888888',
        fontSize: 14
    },
    summaryValue: {
        fontWeight: 'bold',
        fontSize: 14
    },
    divider: {
        height: 1,
        marginVertical: 10
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 25,
        alignItems: 'center'
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    totalValue: {
        fontSize: 24,
        fontWeight: '900'
    },
    checkoutButton: {
        borderRadius: 15
    },
    checkoutButtonContent: {
        height: 60
    },
    checkoutButtonLabel: {
        fontWeight: 'bold',
        fontSize: 16
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    emptyText: {
        fontSize: 18,
        color: '#999999',
        marginVertical: 20
    },
    shopButton: {
        borderRadius: 15,
        width: '100%'
    }
});

export default CartScreen;
