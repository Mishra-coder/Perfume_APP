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
        getSubtotal,
        getGrandTotal,
        taxes,
        SHIPPING_FEE
    } = useCart();

    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const handleCheckout = () => {
        navigation.navigate(user.isLoggedIn ? 'Checkout' : 'Auth');
    };

    const renderSummary = () => (
        <Surface style={[styles.summary, { backgroundColor: colors.background, borderTopColor: isDarkMode ? '#222222' : '#f0f0f0' }]} elevation={0}>
            <SummaryRow label="Subtotal" value={getSubtotal()} themeColors={colors} />
            <SummaryRow label="GST (12%)" value={taxes} themeColors={colors} />
            <SummaryRow label="Shipping" value={SHIPPING_FEE} themeColors={colors} />

            <View style={[styles.divider, { backgroundColor: isDarkMode ? '#222222' : '#f5f5f5' }]} />

            <View style={styles.totalRow}>
                <Text style={[styles.totalLabel, { color: colors.text }]}>Grand Total</Text>
                <Text style={[styles.totalPrice, { color: isDarkMode ? colors.primary : '#1a1a1a' }]}>₹{getGrandTotal()}</Text>
            </View>

            <Button
                mode="contained"
                style={[styles.checkoutBtn, { backgroundColor: colors.primary }]}
                contentStyle={styles.checkoutBtnContent}
                labelStyle={[styles.checkoutBtnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                onPress={handleCheckout}
            >
                Proceed to Checkout
            </Button>
        </Surface>
    );

    const renderEmpty = () => (
        <View style={styles.emptyContainer}>
            <IconButton icon="cart-outline" size={80} iconColor={isDarkMode ? '#222222' : '#f0f0f0'} />
            <Text style={styles.emptyText}>Your bag is empty</Text>
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('Main')}
                style={[styles.shopBtn, { borderColor: isDarkMode ? '#333333' : '#f0f0f0' }]}
                textColor={colors.text}
            >
                Start Shopping
            </Button>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.header, { borderBottomColor: isDarkMode ? '#222222' : '#f0f0f0' }]}>
                <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => navigation.goBack()} />
                <Text style={[styles.title, { color: colors.text }]}>Shopping Bag</Text>
                <View style={{ width: 48 }} />
            </View>

            {cartItems.length > 0 ? (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <CartItem
                                product={item}
                                isDarkMode={isDarkMode}
                                themeColors={colors}
                                onRemove={() => removeFromCart(item.id)}
                                onUpdate={(val) => updateQuantity(item.id, val)}
                            />
                        )}
                        contentContainerStyle={styles.list}
                        showsVerticalScrollIndicator={false}
                    />
                    {renderSummary()}
                </View>
            ) : renderEmpty()}
        </View>
    );
};

const SummaryRow = ({ label, value, themeColors }) => (
    <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <Text style={[styles.summaryValue, { color: themeColors.text }]}>₹{value}</Text>
    </View>
);

const CartItem = ({ product, onRemove, onUpdate, isDarkMode, themeColors }) => (
    <Surface style={[styles.card, { backgroundColor: themeColors.background }]} elevation={0}>
        <Image source={product.image} style={[styles.thumb, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]} />
        <View style={styles.info}>
            <View style={styles.topRow}>
                <Text style={[styles.name, { color: themeColors.text }]} numberOfLines={1}>{product.name}</Text>
                <TouchableOpacity onPress={onRemove}>
                    <IconButton icon="delete-outline" size={20} iconColor={isDarkMode ? '#444444' : '#cccccc'} />
                </TouchableOpacity>
            </View>
            <Text style={styles.meta}>{product.category} • 200ml</Text>
            <View style={styles.bottomRow}>
                <Text style={[styles.itemPrice, { color: isDarkMode ? themeColors.primary : '#1a1a1a' }]}>
                    ₹{product.price * product.quantity}
                </Text>

                <View style={[styles.picker, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
                    <TouchableOpacity style={styles.pickerBtn} onPress={() => onUpdate(-1)}>
                        <Text style={[styles.pickerSymbol, { color: themeColors.text }]}>−</Text>
                    </TouchableOpacity>
                    <Text style={[styles.pickerValue, { color: themeColors.text }]}>{product.quantity}</Text>
                    <TouchableOpacity style={styles.pickerBtn} onPress={() => onUpdate(1)}>
                        <Text style={[styles.pickerSymbol, { color: themeColors.text }]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Surface>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        paddingBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    list: {
        padding: 25,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    thumb: {
        width: 90,
        height: 90,
        borderRadius: 15,
    },
    info: {
        flex: 1,
        marginLeft: 15,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    meta: {
        fontSize: 12,
        color: '#999999',
        marginTop: 2,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '900',
    },
    picker: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 5,
    },
    pickerBtn: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerSymbol: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    pickerValue: {
        marginHorizontal: 12,
        fontWeight: 'bold',
    },
    summary: {
        padding: 25,
        borderTopWidth: 1,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        color: '#888888',
        fontSize: 14,
    },
    summaryValue: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    divider: {
        height: 1,
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
    },
    totalPrice: {
        fontSize: 24,
        fontWeight: '900',
    },
    checkoutBtn: {
        borderRadius: 15,
    },
    checkoutBtnContent: {
        height: 60,
    },
    checkoutBtnLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 18,
        color: '#999999',
        marginVertical: 20,
    },
    shopBtn: {
        borderRadius: 15,
        width: '100%',
    },
});

export default CartScreen;
