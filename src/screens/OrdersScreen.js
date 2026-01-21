import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Appbar, Text, Surface, IconButton, Chip, useTheme as usePaperTheme } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const OrdersScreen = ({ navigation }) => {
    const { user } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const orderList = user.orders || [];

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <OrdersHeader navigation={navigation} colors={colors} />

            {orderList.length > 0 ? (
                <FlatList
                    data={orderList}
                    keyExtractor={order => order.id.toString()}
                    renderItem={({ item }) => (
                        <OrderCard
                            order={item}
                            isDarkMode={isDarkMode}
                            themeColors={colors}
                        />
                    )}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <EmptyOrderState isDarkMode={isDarkMode} colors={colors} />
            )}
        </View>
    );
};

const OrdersHeader = ({ navigation, colors }) => (
    <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background }]}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
        <Appbar.Content title="Order History" titleStyle={[styles.appbarTitle, { color: colors.text }]} />
    </Appbar.Header>
);

const EmptyOrderState = ({ isDarkMode, colors }) => (
    <View style={styles.emptyContainer}>
        <IconButton icon="package-variant" size={70} iconColor={isDarkMode ? '#222222' : '#eeeeee'} />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>No orders yet</Text>
        <Text style={styles.emptyText}>Your luxury collection will start here once you place an order.</Text>
    </View>
);

const OrderCard = ({ order, isDarkMode, themeColors }) => {
    const formattedDate = new Date(order.purchaseDate || order.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const displayItems = order.items.slice(0, 3);
    const remainingCount = Math.max(0, order.items.length - 3);

    return (
        <Surface style={[styles.card, { borderColor: isDarkMode ? '#333333' : '#f2f2f2' }]} elevation={0}>
            <View style={styles.cardHeader}>
                <View>
                    <Text style={[styles.orderId, { color: themeColors.text }]}>Order #{order.id}</Text>
                    <Text style={styles.orderDate}>{formattedDate}</Text>
                </View>
                <Chip
                    style={[styles.statusChip, { backgroundColor: isDarkMode ? '#112211' : '#eefcf1' }]}
                    textStyle={[styles.statusText, { color: isDarkMode ? themeColors.primary : '#27ae60' }]}
                >
                    {order.orderStatus || order.status}
                </Chip>
            </View>

            <View style={styles.gallery}>
                {displayItems.map((item, index) => (
                    <View key={index} style={[styles.thumbBox, { backgroundColor: isDarkMode ? '#0a0a0a' : '#fafafa' }]}>
                        <Image source={item.image} style={styles.thumbImage} />
                    </View>
                ))}

                {remainingCount > 0 && (
                    <View style={[styles.moreBadge, { backgroundColor: isDarkMode ? '#333333' : '#f5f5f5' }]}>
                        <Text style={[styles.moreText, { color: isDarkMode ? '#ffffff' : '#666666' }]}>
                            +{remainingCount}
                        </Text>
                    </View>
                )}
            </View>

            <View style={[styles.cardFooter, { borderTopColor: isDarkMode ? '#222222' : '#f9f9f9' }]}>
                <Text style={styles.summaryLabel}>Total Paid</Text>
                <Text style={[styles.summaryValue, { color: isDarkMode ? themeColors.primary : '#1a1a1a' }]}>
                    ₹{order.totalAmount || order.total}
                </Text>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        borderBottomWidth: 0,
        elevation: 0
    },
    appbarTitle: {
        fontWeight: 'bold'
    },
    listContainer: {
        padding: 20
    },
    card: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        backgroundColor: 'transparent'
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    orderDate: {
        fontSize: 12,
        color: '#aaaaaa',
        marginTop: 2
    },
    statusChip: {
        borderRadius: 8
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    gallery: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    thumbBox: {
        width: 60,
        height: 60,
        borderRadius: 12,
        marginRight: 10,
        overflow: 'hidden'
    },
    thumbImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    moreBadge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    moreText: {
        fontSize: 13,
        fontWeight: 'bold'
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        borderTopWidth: 1,
        alignItems: 'center'
    },
    summaryLabel: {
        color: '#999999',
        fontSize: 14
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: '900'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    emptyText: {
        fontSize: 15,
        color: '#999999',
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 40
    }
});

export default OrdersScreen;
