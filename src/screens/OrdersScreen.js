import React from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';
import { Appbar, Text, Surface, IconButton, Chip } from 'react-native-paper';
import { useUser } from '../context/UserContext';

const OrdersScreen = ({ navigation }) => {
    const { user } = useUser();

    const formatDate = (isoStr) => {
        return new Date(isoStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <IconButton icon="package-variant" size={70} iconColor="#eee" />
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptySubtitle}>
                Your orders will appear here once you complete a purchase.
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Appbar.Header style={styles.header}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Purchases" titleStyle={styles.headerTitle} />
            </Appbar.Header>

            {user.orders.length > 0 ? (
                <FlatList
                    data={user.orders}
                    keyExtractor={order => order.id}
                    renderItem={({ item }) => (
                        <OrderCard
                            order={item}
                            formattedDate={formatDate(item.date)}
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : renderEmptyState()}
        </View>
    );
};

const OrderCard = ({ order, formattedDate }) => (
    <Surface style={styles.card} elevation={0}>
        <View style={styles.cardHeader}>
            <View>
                <Text style={styles.orderId}>Order #{order.id}</Text>
                <Text style={styles.orderDate}>{formattedDate}</Text>
            </View>
            <Chip style={styles.statusBadge} textStyle={styles.statusText}>
                {order.status}
            </Chip>
        </View>

        <View style={styles.imageGallery}>
            {order.items.slice(0, 3).map((product, index) => (
                <View key={index} style={styles.thumbnailBox}>
                    <Image source={product.image} style={styles.thumbnail} />
                </View>
            ))}
            {order.items.length > 3 && (
                <View style={styles.overFlowCounter}>
                    <Text style={styles.overflowText}>+{order.items.length - 3}</Text>
                </View>
            )}
        </View>

        <View style={styles.cardFooter}>
            <Text style={styles.paymentHint}>Paid Amount</Text>
            <Text style={styles.totalAmount}>₹{order.total}</Text>
        </View>
    </Surface>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    headerTitle: {
        fontWeight: 'bold',
    },
    listContent: {
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#f2f2f2',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    orderDate: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 2,
    },
    statusBadge: {
        backgroundColor: '#eefcf1',
    },
    statusText: {
        color: '#27ae60',
        fontSize: 12,
        fontWeight: 'bold',
    },
    imageGallery: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    thumbnailBox: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#fafafa',
        marginRight: 10,
        overflow: 'hidden',
    },
    thumbnail: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overFlowCounter: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overflowText: {
        fontSize: 13,
        color: '#666',
        fontWeight: 'bold',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f9f9f9',
        alignItems: 'center',
    },
    paymentHint: {
        color: '#999',
        fontSize: 14,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    emptySubtitle: {
        fontSize: 15,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
        paddingHorizontal: 40,
    },
});

export default OrdersScreen;
