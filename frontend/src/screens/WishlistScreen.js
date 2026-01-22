import React from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, IconButton, useTheme as usePaperTheme } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const WishlistScreen = ({ navigation }) => {
    const { user, toggleWishlist } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    if (!user.isLoggedIn) {
        return <AuthRequiredState navigation={navigation} isDarkMode={isDarkMode} colors={colors} />;
    }

    const wishlistItems = user.wishlist || [];

    if (wishlistItems.length === 0) {
        return <EmptyWishlist navigation={navigation} isDarkMode={isDarkMode} colors={colors} />;
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <WishlistHeader navigation={navigation} colors={colors} />
            <FlatList
                data={wishlistItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <WishlistItem
                        item={item}
                        navigation={navigation}
                        onToggleWishlist={toggleWishlist}
                        isDarkMode={isDarkMode}
                        colors={colors}
                    />
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const WishlistHeader = ({ navigation, colors }) => (
    <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => navigation.goBack()} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Wishlist</Text>
        <View style={styles.headerSpacer} />
    </View>
);

const EmptyWishlist = ({ navigation, isDarkMode, colors }) => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <WishlistHeader navigation={navigation} colors={colors} />
        <View style={styles.emptyContainer}>
            <IconButton icon="heart-outline" size={80} iconColor={isDarkMode ? '#333333' : '#eeeeee'} />
            <Text style={styles.emptyText}>Your wishlist is empty</Text>
            <TouchableOpacity
                style={[styles.shopButton, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('Main')}
            >
                <Text style={[styles.shopButtonText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>
                    Explore Scents
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);

const AuthRequiredState = ({ navigation, isDarkMode, colors }) => (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
        <WishlistHeader navigation={navigation} colors={colors} />
        <View style={styles.emptyContainer}>
            <IconButton icon="lock-outline" size={80} iconColor={isDarkMode ? '#333333' : '#eeeeee'} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>Sign in Required</Text>
            <Text style={[styles.emptyText, { textAlign: 'center' }]}>Please sign in to view your luxury fragrance wishlist.</Text>
            <TouchableOpacity
                style={[styles.shopButton, { backgroundColor: colors.primary, marginTop: 20 }]}
                onPress={() => navigation.navigate('Auth')}
            >
                <Text style={[styles.shopButtonText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>
                    Sign In
                </Text>
            </TouchableOpacity>
        </View>
    </View>
);

const WishlistItem = ({ item, navigation, onToggleWishlist, isDarkMode, colors }) => (
    <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigation.navigate('ProductDetail', { product: item })}
        activeOpacity={0.8}
    >
        <View style={[styles.imageContainer, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]}>
            <Image source={item.image} style={styles.itemImage} />
        </View>
        <View style={styles.itemInfo}>
            <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
            <Text style={styles.itemCategory}>{item.category}</Text>
            <Text style={[styles.itemPrice, { color: colors.primary }]}>₹{item.price}</Text>
        </View>
        <IconButton
            icon="heart"
            iconColor={colors.primary}
            onPress={() => onToggleWishlist(item)}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        marginBottom: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    headerSpacer: {
        width: 48
    },
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        overflow: 'hidden'
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemCategory: {
        fontSize: 12,
        color: '#888888',
        marginTop: 4
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: '900',
        marginTop: 6
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    emptyText: {
        fontSize: 18,
        color: '#888888',
        marginTop: 10,
        marginBottom: 30
    },
    shopButton: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 15
    },
    shopButtonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default WishlistScreen;
