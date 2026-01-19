import React from 'react';
import { View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, IconButton, useTheme as usePaperTheme, Surface } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const WishlistScreen = ({ navigation }) => {
    const { user, toggleWishlist } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            activeOpacity={0.8}
        >
            <View style={[styles.imageWrapper, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]}>
                <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.info}>
                <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={[styles.price, { color: colors.primary }]}>₹{item.price}</Text>
            </View>
            <IconButton
                icon="heart"
                iconColor={colors.primary}
                onPress={() => toggleWishlist(item)}
            />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => navigation.goBack()} />
                <Text style={[styles.title, { color: colors.text }]}>My Wishlist</Text>
                <View style={{ width: 48 }} />
            </View>

            {(user.wishlist || []).length > 0 ? (
                <FlatList
                    data={user.wishlist}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.empty}>
                    <IconButton icon="heart-outline" size={80} iconColor={isDarkMode ? '#333333' : '#eeeeee'} />
                    <Text style={styles.emptyText}>Your wishlist is empty</Text>
                    <TouchableOpacity
                        style={[styles.shopBtn, { backgroundColor: colors.primary }]}
                        onPress={() => navigation.navigate('Main')}
                    >
                        <Text style={[styles.shopBtnText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>Explore Scents</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

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
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    list: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    imageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 20,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    info: {
        flex: 1,
        marginLeft: 15
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    category: {
        fontSize: 12,
        color: '#888888',
        marginTop: 4
    },
    price: {
        fontSize: 15,
        fontWeight: '900',
        marginTop: 6
    },
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50
    },
    emptyText: {
        fontSize: 18,
        color: '#888888',
        marginTop: 10,
        marginBottom: 30
    },
    shopBtn: {
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 15
    },
    shopBtnText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});


export default WishlistScreen;
