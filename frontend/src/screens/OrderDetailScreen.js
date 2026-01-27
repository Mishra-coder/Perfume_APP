import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Appbar, Text, Surface, Divider, useTheme as usePaperTheme, List, Chip, IconButton } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const OrderDetailScreen = ({ route, navigation }) => {
    const { order } = route.params;
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={{ backgroundColor: colors.background }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Order Details" titleStyle={{ fontWeight: 'bold' }} />
            </Appbar.Header>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <OrderTimeline status={order.status} colors={colors} isDarkMode={isDarkMode} />

                <Surface style={[styles.card, { borderColor: isDarkMode ? '#333' : '#eee' }]} elevation={0}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={[styles.label, { color: '#999' }]}>Order ID</Text>
                            <Text style={[styles.value, { color: colors.text }]}>#{order.id}</Text>
                        </View>
                        <Chip style={{ backgroundColor: isDarkMode ? '#121' : '#efe' }} textStyle={{ color: isDarkMode ? colors.primary : '#27ae60' }}>
                            {order.status}
                        </Chip>
                    </View>
                    <Divider style={styles.divider} />
                    <View>
                        <Text style={[styles.label, { color: '#999' }]}>Order Date</Text>
                        <Text style={[styles.value, { color: colors.text }]}>{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</Text>
                    </View>
                </Surface>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Items</Text>
                <Surface style={[styles.card, { borderColor: isDarkMode ? '#333' : '#eee' }]} elevation={0}>
                    {order.items.map((item, index) => (
                        <View key={index}>
                            <View style={styles.itemRow}>
                                <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
                                <View style={styles.itemInfo}>
                                    <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                                    <Text style={[styles.itemSub, { color: '#999' }]}>Qty: {item.quantity}</Text>
                                </View>
                                <Text style={[styles.itemPrice, { color: colors.text }]}>₹{item.price * item.quantity}</Text>
                            </View>
                            {index < order.items.length - 1 && <Divider style={styles.itemDivider} />}
                        </View>
                    ))}
                </Surface>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Price Breakdown</Text>
                <Surface style={[styles.card, { borderColor: isDarkMode ? '#333' : '#eee' }]} elevation={0}>
                    <View style={styles.priceRow}>
                        <Text style={{ color: '#999' }}>Subtotal</Text>
                        <Text style={{ color: colors.text }}>₹{order.total - Math.round((order.total - 30) / 1.12 * 0.12) - 30}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={{ color: '#999' }}>Tax (12%)</Text>
                        <Text style={{ color: colors.text }}>₹{Math.round((order.total - 30) / 1.12 * 0.12)}</Text>
                    </View>
                    <View style={styles.priceRow}>
                        <Text style={{ color: '#999' }}>Shipping</Text>
                        <Text style={{ color: colors.text }}>₹30</Text>
                    </View>
                    <Divider style={styles.divider} />
                    <View style={styles.priceRow}>
                        <Text style={[styles.totalLabel, { color: colors.text }]}>Total Amount Paid</Text>
                        <Text style={[styles.totalValue, { color: isDarkMode ? colors.primary : '#000' }]}>₹{order.total}</Text>
                    </View>
                </Surface>

                <Text style={[styles.sectionTitle, { color: colors.text }]}>Shipping Address</Text>
                <Surface style={[styles.card, { borderColor: isDarkMode ? '#333' : '#eee', marginBottom: 40 }]} elevation={0}>
                    <View style={styles.addressContainer}>
                        <Text style={[styles.addressText, { color: colors.text }]}>
                            Default Address
                        </Text>
                        <Text style={[styles.addressSub, { color: '#999' }]}>
                            123 Luxury Lane, Fragrance District{"\n"}Mumbai, Maharashtra, 400001
                        </Text>
                    </View>
                </Surface>
            </ScrollView>
        </View>
    );
};

const OrderTimeline = ({ status, colors, isDarkMode }) => {
    const steps = [
        { label: 'Ordered', key: 'ordered' },
        { label: 'Packed', key: 'packed' },
        { label: 'Shipped', key: 'shipped' },
        { label: 'Delivered', key: 'delivered' }
    ];

    // Simple mapping for demo purposes
    const getActiveStep = (s) => {
        const statusLower = s.toLowerCase();
        if (statusLower === 'delivered') return 3;
        if (statusLower === 'shipped') return 2;
        if (statusLower === 'packed' || statusLower === 'processing') return 1;
        return 0;
    };

    const activeIndex = getActiveStep(status);

    return (
        <View style={styles.timelineWrapper}>
            <View style={styles.timelineRow}>
                {steps.map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                        {/* Line connector */}
                        {index !== 0 && (
                            <View
                                style={[
                                    styles.connector,
                                    { backgroundColor: index <= activeIndex ? colors.primary : (isDarkMode ? '#333' : '#eee') }
                                ]}
                            />
                        )}

                        {/* Status Circle */}
                        <View
                            style={[
                                styles.circle,
                                {
                                    backgroundColor: index <= activeIndex ? colors.primary : (isDarkMode ? '#1a1a1a' : '#fff'),
                                    borderColor: index <= activeIndex ? colors.primary : (isDarkMode ? '#333' : '#eee')
                                }
                            ]}
                        >
                            {index <= activeIndex && (
                                <IconButton icon="check" size={12} iconColor="#000" style={{ margin: 0 }} />
                            )}
                        </View>

                        {/* Label */}
                        <Text
                            style={[
                                styles.stepLabel,
                                {
                                    color: index <= activeIndex ? colors.text : '#888',
                                    fontWeight: index === activeIndex ? 'bold' : 'normal'
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
    timelineWrapper: {
        marginBottom: 30,
        paddingHorizontal: 10
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
        top: 12,
        zIndex: -1
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8
    },
    stepLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 0.5
    },
    scrollContent: { padding: 20 },
    card: {
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
        backgroundColor: 'transparent',
        marginBottom: 20,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 },
    value: { fontSize: 16, fontWeight: 'bold' },
    divider: { marginVertical: 15, opacity: 0.5 },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 5,
        textTransform: 'uppercase',
        letterSpacing: 2,
        opacity: 0.7
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
    },
    itemName: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemSub: {
        fontSize: 12,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    itemDivider: { marginVertical: 5, opacity: 0.3 },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '900',
    },
    addressContainer: {
        paddingVertical: 5,
    },
    addressText: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    addressSub: {
        fontSize: 13,
        lineHeight: 20,
    }
});

export default OrderDetailScreen;
