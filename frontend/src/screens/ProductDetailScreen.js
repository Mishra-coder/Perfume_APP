import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions, Animated, StatusBar } from 'react-native';
import { Text, IconButton, Snackbar, Badge, Button, Surface, useTheme as usePaperTheme } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route }) => {
    const { product } = route.params;
    const { addToCart, count } = useCart();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const { toggleWishlist, isInWishlist } = useUser();

    const [qty, setQty] = useState(1);
    const [snack, setSnack] = useState(false);
    const activeImg = product.image;

    const scrollY = useRef(new Animated.Value(0)).current;

    const handleAddToCart = () => {
        addToCart(product, qty);
        setSnack(true);
    };

    const isFav = isInWishlist(product.id);

    const headerBg = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: ['rgba(255,255,255,0)', colors.background],
        extrapolate: 'clamp'
    });

    const headerElevation = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [0, 4],
        extrapolate: 'clamp'
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-200, 0, 400],
        outputRange: [1.3, 1, 0.95],
        extrapolate: 'clamp'
    });

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} transparent translucent />

            <Animated.View style={[
                styles.header,
                {
                    backgroundColor: headerBg,
                    elevation: headerElevation,
                    borderBottomWidth: scrollY.interpolate({
                        inputRange: [0, 200],
                        outputRange: [0, 0.5],
                        extrapolate: 'clamp'
                    }),
                    borderBottomColor: isDarkMode ? '#333' : '#eee'
                }
            ]}>
                <IconButton
                    icon="arrow-left"
                    iconColor={colors.text}
                    onPress={() => navigation.goBack()}
                    style={styles.iconCircle}
                />
                <View style={styles.headerRight}>
                    <IconButton
                        icon={isFav ? "heart" : "heart-outline"}
                        iconColor={isFav ? colors.primary : colors.text}
                        onPress={() => toggleWishlist(product)}
                        style={styles.iconCircle}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <IconButton icon="shopping" iconColor={colors.text} style={styles.iconCircle} />
                        {count > 0 && <Badge style={[styles.badge, { backgroundColor: colors.primary }]}>{count}</Badge>}
                    </TouchableOpacity>
                </View>
            </Animated.View>

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
                scrollEventThrottle={16}
            >
                <Animated.View style={[
                    styles.imageContainer,
                    {
                        transform: [{ scale: imageScale }],
                        backgroundColor: isDarkMode ? '#121212' : '#f5f5f5'
                    }
                ]}>
                    <Image source={activeImg} style={styles.mainImage} />
                </Animated.View>

                <View style={[styles.detailsSection, { backgroundColor: colors.background }]}>
                    <View style={styles.nameRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
                            <Text style={styles.productMeta}>{product.category} • EDP</Text>
                        </View>
                        <Text style={[styles.productPrice, { color: colors.primary }]}>₹{product.price}</Text>
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
                    <Text style={[styles.descriptionText, { color: isDarkMode ? '#aaa' : '#666' }]}>{product.description}</Text>

                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Limited Offers</Text>
                    <OfferItem code="LUXE20" description="Save 20% on your first order" colors={colors} />
                    <OfferItem code="FREESHIP" description="Free delivery for orders over ₹5000" colors={colors} />

                    <View style={styles.quantitySection}>
                        <Text style={styles.quantityLabel}>Quantity</Text>
                        <View style={[styles.stepper, { backgroundColor: isDarkMode ? '#222' : '#f0f0f0' }]}>
                            <TouchableOpacity onPress={() => setQty(q => Math.max(1, q - 1))} style={styles.stepperBtn}>
                                <Text style={[styles.stepperIcon, { color: colors.text }]}>-</Text>
                            </TouchableOpacity>
                            <Text style={[styles.stepperValue, { color: colors.text }]}>{qty}</Text>
                            <TouchableOpacity onPress={() => setQty(q => q + 1)} style={styles.stepperBtn}>
                                <Text style={[styles.stepperIcon, { color: colors.text }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Button
                        mode="contained"
                        onPress={handleAddToCart}
                        style={styles.addToCartBtn}
                        contentStyle={{ height: 58 }}
                        buttonColor={colors.primary}
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                    >
                        Add to Bag
                    </Button>
                </View>
            </Animated.ScrollView>

            <Snackbar
                visible={snack}
                onDismiss={() => setSnack(false)}
                duration={2000}
                style={{ marginBottom: 20 }}
            >
                Successfully added to your bag
            </Snackbar>
        </View>
    );
};

const OfferItem = ({ code, description, colors }) => (
    <Surface style={[styles.offerBox, { borderColor: colors.primary + '25' }]} elevation={0}>
        <View style={styles.offerDot} />
        <View style={{ flex: 1 }}>
            <Text style={[styles.offerCode, { color: colors.primary }]}>{code}</Text>
            <Text style={styles.offerDesc}>{description}</Text>
        </View>
    </Surface>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        height: 110,
        paddingTop: 50,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100
    },
    headerRight: { flexDirection: 'row', alignItems: 'center' },
    iconCircle: { backgroundColor: 'rgba(255,255,255,0.7)', margin: 4 },
    badge: { position: 'absolute', top: 5, right: 5 },
    imageContainer: { width: '100%', aspectRatio: 0.8, justifyContent: 'center', alignItems: 'center', paddingTop: 100, paddingBottom: 40 },
    mainImage: { width: '85%', height: '85%', resizeMode: 'contain' },
    detailsSection: {
        padding: 24,
        marginTop: -35,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        minHeight: 650,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10
    },
    nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
    productName: { fontSize: 26, fontWeight: 'bold', flex: 1, marginRight: 10 },
    productMeta: { fontSize: 13, color: '#999', marginTop: 4 },
    productPrice: { fontSize: 24, fontWeight: '900' },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 30, marginBottom: 15 },
    descriptionText: { fontSize: 15, lineHeight: 24, opacity: 0.8 },
    offerBox: { padding: 16, borderRadius: 16, borderWidth: 1, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
    offerDot: { width: 4, height: 20, borderRadius: 2, marginRight: 12, backgroundColor: '#888' },
    offerCode: { fontWeight: 'bold', fontSize: 15, marginBottom: 2 },
    offerDesc: { fontSize: 12, color: '#888' },
    quantitySection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 40 },
    quantityLabel: { fontSize: 16, fontWeight: '600' },
    stepper: { flexDirection: 'row', alignItems: 'center', borderRadius: 15, padding: 5 },
    stepperBtn: { width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
    stepperIcon: { fontSize: 24 },
    stepperValue: { marginHorizontal: 20, fontWeight: 'bold', fontSize: 18 },
    addToCartBtn: { borderRadius: 16, elevation: 6 }
});

export default ProductDetailScreen;
