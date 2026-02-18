import React from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Appbar, Text, Surface, Divider, useTheme as usePaperTheme, List, Chip, IconButton, Button } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';
import { products } from '../data/products';

const OrderDetailScreen = ({ route, navigation }) => {
    const { order: initialOrder } = route.params;
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { user, cancelOrder } = useUser();

    // Find the latest version of this order from context
    const order = user.orders.find(o => o.id === initialOrder.id) || initialOrder;

    const handleCancel = () => {
        Alert.alert(
            "Cancel Order",
            "Are you sure you want to cancel this curated request? This action reflects a shift in your luxury collection path.",
            [
                { text: "STAY COMMITTED", style: "cancel" },
                {
                    text: "CANCEL ORDER",
                    onPress: () => cancelOrder(order.id),
                    style: "destructive"
                }
            ]
        );
    };

    const canCancel = order.status.toLowerCase() === 'ordered' || order.status.toLowerCase() === 'processing';

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="ORDER SPECIFICATIONS" titleStyle={styles.headerTitle} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <OrderTimeline status={order.status} isDarkMode={isDarkMode} colors={colors} />

                <Surface style={[styles.card, { backgroundColor: isDarkMode ? 'rgba(212, 175, 55, 0.03)' : 'rgba(0,0,0,0.02)', borderColor: 'rgba(212, 175, 55, 0.1)' }]} elevation={0}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.label}>Identifier</Text>
                            <Text style={[styles.value, { color: colors.text }]}>#{order.id}</Text>
                        </View>
                        <Chip
                            style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                            textStyle={{ color: colors.primary, fontSize: 10, fontWeight: '900' }}
                        >
                            {order.status.toUpperCase()}
                        </Chip>
                    </View>
                    <View style={styles.divider} />
                    <View>
                        <Text style={styles.label}>Acquisition Date</Text>
                        <Text style={[styles.value, { color: colors.text }]}>
                            {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                    </View>
                </Surface>

                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Artifacts</Text>
                <Surface style={[styles.card, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }]} elevation={0}>
                    {order.items.map((item, index) => {
                        const originalProduct = products.find(p => p.id === item.id);
                        const displayImage = originalProduct ? originalProduct.image : item.image;

                        return (
                            <View key={index}>
                                <View style={styles.itemRow}>
                                    <View style={[styles.itemImageWrapper, { backgroundColor: isDarkMode ? '#121212' : '#F5F5F5' }]}>
                                        <Image source={displayImage} style={styles.itemImage} resizeMode="contain" />
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                                        <Text style={styles.itemSub}>Quantity: {item.quantity}</Text>
                                    </View>
                                    <Text style={[styles.itemPrice, { color: colors.text }]}>₹{(item.price * item.quantity).toLocaleString()}</Text>
                                </View>
                                {index < order.items.length - 1 && <View style={styles.itemDivider} />}
                            </View>
                        );
                    })}
                </Surface>

                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Investment Summary</Text>
                <Surface style={[styles.card, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }]} elevation={0}>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>Net Subtotal</Text>
                        <Text style={[styles.priceValue, { color: colors.text }]}>₹{(order.total - Math.round((order.total - 30) / 1.12 * 0.12) - 30).toLocaleString()}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>GST (12%)</Text>
                        <Text style={[styles.priceValue, { color: colors.text }]}>₹{Math.round((order.total - 30) / 1.12 * 0.12).toLocaleString()}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={styles.priceLabel}>White-Glove Delivery</Text>
                        <Text style={[styles.priceValue, { color: colors.primary }]}>COMPLIMENTARY</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.priceRow}>
                        <Text style={[styles.totalLabel, { color: colors.text }]}>Total Invested</Text>
                        <Text style={[styles.totalValue, { color: colors.primary }]}>₹{order.total.toLocaleString()}</Text>
                    </View>
                </Surface>

                <Text style={[styles.sectionTitle, { color: colors.primary }]}>Delivery Destination</Text>
                <Surface style={[styles.card, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }]} elevation={0}>
                    <View style={styles.addressContainer}>
                        <Text style={[styles.addressText, { color: colors.text }]}>
                            {order.address?.name || 'Exclusive Collector'}
                        </Text>
                        <Text style={styles.addressSub}>
                            {order.address?.street}{"\n"}
                            {order.address?.city}, {order.address?.zip}{"\n"}
                            Contact: {order.address?.phone}
                        </Text>
                    </View>
                </Surface>

                {canCancel && (
                    <Button
                        mode="outlined"
                        onPress={handleCancel}
                        style={[styles.cancelBtn, { borderColor: '#FF5252' }]}
                        contentStyle={styles.cancelBtnContent}
                        labelStyle={styles.cancelBtnLabel}
                        textColor="#FF5252"
                    >
                        CANCEL ORDER
                    </Button>
                )}
                <View style={{ height: 60 }} />
            </ScrollView>
        </View>
    );
};

const OrderTimeline = ({ status, isDarkMode, colors }) => {
    const steps = [
        { label: 'ORDERED', key: 'ordered', icon: 'check-circle-outline' },
        { label: 'PACKED', key: 'packed', icon: 'package-variant-closed' },
        { label: 'SHIPPED', key: 'shipped', icon: 'truck-delivery-outline' },
        { label: 'DELIVERED', key: 'delivered', icon: 'crown-outline' }
    ];

    const getActiveStep = (s = "") => {
        const sl = s.toLowerCase();
        if (sl === 'delivered') return 3;
        if (sl === 'shipped') return 2;
        if (sl === 'packed' || sl === 'processing') return 1;
        return 0;
    };

    const activeIndex = getActiveStep(status);

    return (
        <View style={styles.timelineWrapper}>
            <View style={styles.timelineRow}>
                {steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                        {index !== 0 && (
                            <View
                                style={[
                                    styles.connector,
                                    { backgroundColor: index <= activeIndex ? colors.primary : (isDarkMode ? '#1F1F1F' : '#EEE') }
                                ]}
                            />
                        )}

                        <View
                            style={[
                                styles.circle,
                                {
                                    backgroundColor: index <= activeIndex ? colors.primary : (isDarkMode ? '#0A0A0A' : '#FFF'),
                                    borderColor: index <= activeIndex ? colors.primary : (isDarkMode ? '#1F1F1F' : '#DDD')
                                }
                            ]}
                        >
                            <IconButton
                                icon={step.icon}
                                size={14}
                                iconColor={index <= activeIndex ? (isDarkMode ? "#000" : "#FFF") : "#666"}
                                style={{ margin: 0 }}
                            />
                        </View>

                        <Text
                            style={[
                                styles.stepLabel,
                                {
                                    color: index <= activeIndex ? colors.primary : '#666',
                                    fontWeight: index <= activeIndex ? '900' : '600'
                                }
                            ]}
                        >
                            {step.label}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    appbar: { height: 100, paddingTop: 40 },
    headerTitle: { fontWeight: '900', fontSize: 16, letterSpacing: 2 },
    scrollContent: { paddingHorizontal: 25, paddingVertical: 20 },
    timelineWrapper: {
        marginBottom: 40,
        marginTop: 10,
        paddingHorizontal: 0
    },
    timelineRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    stepContainer: {
        alignItems: 'center',
        flex: 1,
        position: 'relative'
    },
    connector: {
        position: 'absolute',
        height: 2,
        width: '100%',
        left: '-50%',
        top: 15,
        zIndex: -1
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    stepLabel: {
        fontSize: 9,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginTop: 4,
        textAlign: 'center',
        width: '100%'
    },
    card: {
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        marginBottom: 30,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8, color: '#888', fontWeight: '700' },
    value: { fontSize: 16, fontWeight: '900', letterSpacing: -0.2 },
    divider: { height: 1, backgroundColor: 'rgba(128,128,128,0.1)', marginVertical: 20 },
    sectionTitle: {
        fontSize: 12,
        fontWeight: '900',
        marginBottom: 16,
        paddingLeft: 4,
        textTransform: 'uppercase',
        letterSpacing: 2.5,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    itemImageWrapper: {
        width: 64,
        height: 64,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 6
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 16,
    },
    itemName: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 4,
        letterSpacing: -0.3
    },
    itemSub: {
        fontSize: 12,
        color: '#888',
        fontWeight: '500'
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: -0.5
    },
    itemDivider: { height: 1, backgroundColor: 'rgba(128,128,128,0.05)', marginVertical: 8 },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    priceLabel: { fontSize: 14, color: '#888', fontWeight: '500' },
    priceValue: { fontSize: 14, fontWeight: '700' },
    totalLabel: {
        fontSize: 16,
        fontWeight: '900',
        letterSpacing: -0.5
    },
    totalValue: {
        fontSize: 22,
        fontWeight: '900',
        letterSpacing: -0.8
    },
    addressContainer: {
        paddingVertical: 5,
    },
    addressText: {
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 8,
        letterSpacing: -0.3
    },
    addressSub: {
        fontSize: 14,
        color: '#888',
        lineHeight: 22,
        fontWeight: '500'
    },
    cancelBtn: {
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 1.5,
    },
    cancelBtnContent: {
        height: 56,
    },
    cancelBtnLabel: {
        fontWeight: '900',
        fontSize: 14,
        letterSpacing: 2
    }
});

export default OrderDetailScreen;
