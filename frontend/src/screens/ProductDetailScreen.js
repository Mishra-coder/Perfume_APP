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
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    const [activeImage, setActiveImage] = useState(product.image);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsSnackbarVisible(true);
    };

    const isProductInWishlist = isInWishlist(product.id);

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Header
                navigation={navigation}
                isFavorite={isProductInWishlist}
                onToggleWishlist={() => toggleWishlist(product)}
                cartItemCount={getTotalItems()}
                isDarkMode={isDarkMode}
                colors={colors}
            />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <ImageGallery
                    activeImage={activeImage}
                    images={[product.image, product.image, product.image]}
                    onSelectImage={setActiveImage}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />

                <View style={[styles.detailsContainer, { backgroundColor: colors.background }]}>
                    <ProductHeader
                        name={product.name}
                        category={product.category}
                        price={product.price}
                        isDarkMode={isDarkMode}
                        colors={colors}
                    />

                    <RatingSection isDarkMode={isDarkMode} colors={colors} />

                    <Text style={[styles.sectionTitle, { color: colors.text }]}>The Scent Profile</Text>
                    <Text style={[styles.description, { color: isDarkMode ? '#aaaaaa' : '#666666' }]}>
                        {product.description}
                    </Text>

                    <QuantitySelector
                        quantity={quantity}
                        onIncrease={() => setQuantity(q => q + 1)}
                        onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                        isDarkMode={isDarkMode}
                        colors={colors}
                    />

                    <AddToCartButton
                        onPress={handleAddToCart}
                        isDarkMode={isDarkMode}
                        colors={colors}
                    />
                </View>
            </ScrollView>

            <Snackbar
                visible={isSnackbarVisible}
                onDismiss={() => setIsSnackbarVisible(false)}
                duration={2000}
                style={[styles.snackbar, { backgroundColor: isDarkMode ? '#f5f5f5' : '#1a1a1a' }]}
            >
                <Text style={[styles.snackbarText, { color: isDarkMode ? '#000000' : '#ffffff' }]}>
                    Successfully added to cart!
                </Text>
            </Snackbar>
        </View>
    );
};

const Header = ({ navigation, isFavorite, onToggleWishlist, cartItemCount, isDarkMode, colors }) => (
    <View style={styles.header}>
        <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={() => navigation.goBack()} />
        <View style={styles.headerRight}>
            <IconButton
                icon={isFavorite ? "heart" : "heart-outline"}
                size={24}
                iconColor={isFavorite ? colors.primary : colors.text}
                onPress={onToggleWishlist}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
                <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
                {cartItemCount > 0 && (
                    <Badge style={[styles.badge, { backgroundColor: colors.primary, color: isDarkMode ? '#000000' : '#ffffff' }]} size={18}>
                        {cartItemCount}
                    </Badge>
                )}
            </TouchableOpacity>
        </View>
    </View>
);

const ImageGallery = ({ activeImage, images, onSelectImage, isDarkMode, colors }) => (
    <View style={[styles.galleryContainer, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f9f9f9' }]}>
        <Image source={activeImage} style={styles.mainImage} />
        <View style={[styles.thumbnailsRow, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.7)' }]}>
            {images.map((img, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.thumbnail, activeImage === img && { borderColor: colors.primary }]}
                    onPress={() => onSelectImage(img)}
                >
                    <Image source={img} style={styles.thumbnailImage} />
                </TouchableOpacity>
            ))}
        </View>
    </View>
);

const ProductHeader = ({ name, category, price, isDarkMode, colors }) => (
    <View style={styles.titleRow}>
        <View style={styles.titleInfo}>
            <Text style={[styles.productName, { color: colors.text }]}>{name}</Text>
            <Text style={styles.productCategory}>{category} • Eau De Parfum</Text>
        </View>
        <Text style={[styles.productPrice, { color: isDarkMode ? colors.primary : '#000000' }]}>₹{price}</Text>
    </View>
);

const RatingSection = ({ isDarkMode, colors }) => (
    <View style={styles.ratingContainer}>
        <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map(i => (
                <IconButton key={i} icon="star" size={14} iconColor={isDarkMode ? colors.primary : "#000000"} style={styles.starIcon} />
            ))}
        </View>
        <Text style={styles.ratingText}>(4.9 • 120 reviews)</Text>
    </View>
);

const QuantitySelector = ({ quantity, onIncrease, onDecrease, isDarkMode, colors }) => (
    <View style={styles.quantityContainer}>
        <Text style={[styles.quantityLabel, { color: colors.text }]}>Quantity</Text>
        <View style={[styles.counterBox, { backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5' }]}>
            <TouchableOpacity onPress={onDecrease} style={styles.counterButton}>
                <Text style={[styles.counterText, { color: colors.text }]}>−</Text>
            </TouchableOpacity>
            <Text style={[styles.quantityValue, { color: colors.text }]}>{quantity}</Text>
            <TouchableOpacity onPress={onIncrease} style={styles.counterButton}>
                <Text style={[styles.counterText, { color: colors.text }]}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const AddToCartButton = ({ onPress, isDarkMode, colors }) => (
    <Button
        mode="contained"
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        contentStyle={styles.addButtonContent}
        labelStyle={[styles.addButtonLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
        onPress={onPress}
    >
        Add to Cart
    </Button>
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
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cartButton: {
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
    galleryContainer: {
        width: '100%',
        height: SCREEN_WIDTH * 1.2,
        justifyContent: 'flex-end'
    },
    mainImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    thumbnailsRow: {
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
    thumbnailImage: {
        width: '100%',
        height: '100%'
    },
    detailsContainer: {
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
    titleInfo: {
        flex: 1
    },
    productName: {
        fontSize: 28,
        fontWeight: '900',
        letterSpacing: -0.5
    },
    productCategory: {
        fontSize: 14,
        color: '#888888',
        marginTop: 5
    },
    productPrice: {
        fontSize: 24,
        fontWeight: '900'
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15
    },
    starsRow: {
        flexDirection: 'row'
    },
    starIcon: {
        margin: 0
    },
    ratingText: {
        fontSize: 12,
        color: '#aaaaaa',
        marginLeft: 5
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12
    },
    description: {
        fontSize: 15,
        lineHeight: 24
    },
    quantityContainer: {
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
    counterBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 15,
        padding: 5
    },
    counterButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    counterText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    quantityValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 15
    },
    addButton: {
        borderRadius: 15
    },
    addButtonContent: {
        height: 60
    },
    addButtonLabel: {
        fontWeight: 'bold',
        fontSize: 16
    },
    snackbar: {
        borderRadius: 10
    },
    snackbarText: {
        textAlign: 'center'
    }
});

export default ProductDetailScreen;
