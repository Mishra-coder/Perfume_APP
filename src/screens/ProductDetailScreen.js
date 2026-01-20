import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, IconButton, Snackbar, Badge, Button, useTheme as usePaperTheme } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route }) => {
    const { product } = route.params;
    const { addToCart, getTotalItems } = useCart();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { toggleWishlist, isInWishlist } = useUser();

    const [quantity, setQuantity] = useState(1);
    const [showAddedToast, setShowAddedToast] = useState(false);
    const [activeImage, setActiveImage] = useState(product.image);

    const handleAdd = () => {
        addToCart(product, quantity);
        setShowAddedToast(true);
    };

    const isFavorite = isInWishlist(product.id);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => navigation.goBack()} />
                <View style={styles.headerActions}>
                    <IconButton
                        icon={isFavorite ? "heart" : "heart-outline"}
                        size={24}
                        iconColor={isFavorite ? colors.primary : colors.text}
                        onPress={() => toggleWishlist(product)}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartIcon}>
                        <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
                        {getTotalItems() > 0 && (
                            <Badge style={[styles.badge, { backgroundColor: colors.primary, color: isDarkMode ? '#000000' : '#ffffff' }]} size={18}>
                                {getTotalItems()}
                            </Badge>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={[styles.imageSection, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]}>
                    <Image source={activeImage} style={styles.heroImage} />
                    <View style={[styles.gallery, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)' }]}>
                        {[product.image, product.image, product.image].map((img, i) => (
                            <TouchableOpacity
                                key={i}
                                style={[styles.thumbnail, activeImage === img && { borderColor: colors.primary }]}
                                onPress={() => setActiveImage(img)}
                            >
                                <Image source={img} style={styles.thumbnailImg} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={[styles.detailsSection, { backgroundColor: colors.background }]}>
                    <View style={styles.titleRow}>
                        <View style={styles.brandInfo}>
                            <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>
                            <Text style={styles.specs}>{product.category} • Eau De Parfum</Text>
                        </View>
                        <Text style={[styles.price, { color: isDarkMode ? colors.primary : '#000000' }]}>₹{product.price}</Text>
                    </View>

                    <Rating themeColors={colors} isDarkMode={isDarkMode} />

                    <Text style={[styles.sectionLabel, { color: colors.text }]}>The Scent Profile</Text>
                    <Text style={[styles.description, { color: isDarkMode ? '#aaaaaa' : '#666666' }]}>{product.description}</Text>

                    <View style={styles.quantityRow}>
                        <Text style={[styles.quantityLabel, { color: colors.text }]}>Quantity</Text>
                        <View style={[styles.counter, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
                            <TouchableOpacity onPress={() => setQuantity(q => Math.max(1, q - 1))} style={styles.counterBtn}>
                                <Text style={[styles.counterSymbol, { color: colors.text }]}>−</Text>
                            </TouchableOpacity>
                            <Text style={[styles.countValue, { color: colors.text }]}>{quantity}</Text>
                            <TouchableOpacity onPress={() => setQuantity(q => q + 1)} style={styles.counterBtn}>
                                <Text style={[styles.counterSymbol, { color: colors.text }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Button
                        mode="contained"
                        style={[styles.buyBtn, { backgroundColor: colors.primary }]}
                        contentStyle={styles.buyBtnContent}
                        labelStyle={[styles.buyBtnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                        onPress={handleAdd}
                    >
                        Add to Cart
                    </Button>
                </View>
            </ScrollView>

            <Snackbar
                visible={showAddedToast}
                onDismiss={() => setShowAddedToast(false)}
                duration={2000}
                style={[styles.toast, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1a1a1a' }]}
            >
                <Text style={[styles.toastText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>
                    Successfully added to cart!
                </Text>
            </Snackbar>
        </View>
    );
};

const Rating = ({ themeColors, isDarkMode }) => (
    <View style={styles.rating}>
        <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map(i => (
                <IconButton key={i} icon="star" size={14} iconColor={isDarkMode ? themeColors.primary : "#000000"} style={styles.star} />
            ))}
        </View>
        <Text style={styles.ratingText}>(4.9 • 120 reviews)</Text>
    </View>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartIcon: {
        marginLeft: 5
    },
    badge: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    scrollContent: {
        paddingBottom: 50
    },
    imageSection: {
        width: '100%',
        height: SCREEN_WIDTH * 1.2,
        justifyContent: 'flex-end'
    },
    heroImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    gallery: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        borderRadius: 20,
        padding: 8
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'transparent'
    },
    thumbnailImg: {
        width: '100%',
        height: '100%'
    },
    detailsSection: {
        padding: 25,
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    brandInfo: {
        flex: 1
    },
    name: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.5
    },
    specs: {
        fontSize: 14,
        color: '#888888',
        marginTop: 5
    },
    price: {
        fontSize: 24,
        fontWeight: '900'
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    stars: {
        flexDirection: 'row'
    },
    star: {
        margin: 0
    },
    ratingText: {
        fontSize: 12,
        color: '#aaaaaa',
        marginLeft: 5
    },
    sectionLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12
    },
    description: {
        fontSize: 15,
        lineHeight: 24
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 30
    },
    quantityLabel: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding: 5
    },
    counterBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterSymbol: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    countValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 15
    },
    buyBtn: {
        borderRadius: 15
    },
    buyBtnContent: {
        height: 60
    },
    buyBtnLabel: {
        fontWeight: 'bold',
        fontSize: 16
    },
    toast: {
        borderRadius: 10
    },
    toastText: {
        textAlign: 'center'
    }
});


export default ProductDetailScreen;

