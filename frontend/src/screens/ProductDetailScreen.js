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
        outputRange: ['rgba(5,5,5,0)', isDarkMode ? '#050505' : '#FFFFFF'],
        extrapolate: 'clamp'
    });

    const imageScale = scrollY.interpolate({
        inputRange: [-200, 0, 400],
        outputRange: [1.3, 1, 0.9],
        extrapolate: 'clamp'
    });

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle="light-content" transparent translucent />

            <Animated.View style={[
                styles.header,
                {
                    backgroundColor: headerBg,
                    borderBottomWidth: scrollY.interpolate({
                        inputRange: [0, 200],
                        outputRange: [0, 0.5],
                        extrapolate: 'clamp'
                    }),
                    borderBottomColor: isDarkMode ? '#1F1F1F' : '#EEE'
                }
            ]}>
                <IconButton
                    icon="arrow-left"
                    iconColor={colors.text}
                    onPress={() => navigation.goBack()}
                    style={[styles.iconCircle, { backgroundColor: isDarkMode ? 'rgba(20,20,20,0.8)' : 'rgba(255,255,255,0.9)' }]}
                />
                <View style={styles.headerRight}>
                    <IconButton
                        icon={isFav ? "heart" : "heart-outline"}
                        iconColor={isFav ? colors.primary : colors.text}
                        onPress={() => toggleWishlist(product)}
                        style={[styles.iconCircle, { backgroundColor: isDarkMode ? 'rgba(20,20,20,0.8)' : 'rgba(255,255,255,0.9)' }]}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                        <IconButton
                            icon="shopping"
                            iconColor={colors.text}
                            style={[styles.iconCircle, { backgroundColor: isDarkMode ? 'rgba(20,20,20,0.8)' : 'rgba(255,255,255,0.9)' }]}
                        />
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
                        backgroundColor: isDarkMode ? '#0D0D0D' : '#F5F5F5'
                    }
                ]}>
                    <Image source={activeImg} style={styles.mainImage} />
                </Animated.View>

                <View style={[styles.detailsSection, { backgroundColor: colors.background }]}>
                    <View style={styles.nameRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
                            <Text style={styles.productMeta}>{product.category} • {product.type}</Text>
                        </View>
                        <Text style={[styles.productPrice, { color: colors.primary }]}>₹{product.price.toLocaleString()}</Text>
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.text }]}>The Fragrance</Text>
                    <Text style={[styles.descriptionText, { color: colors.textSecondary }]}>{product.description}</Text>

                    {product.notes && (
                        <View style={styles.notesContainer}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>Scent Profile</Text>

                            <NoteSection title="Top Notes" notes={product.notes.top} icon="leaf-outline" color={colors.primary} isDarkMode={isDarkMode} />
                            <NoteSection title="Heart Notes" notes={product.notes.middle} icon="heart-outline" color={colors.primary} isDarkMode={isDarkMode} />
                            <NoteSection title="Base Notes" notes={product.notes.base} icon="water-outline" color={colors.primary} isDarkMode={isDarkMode} />
                        </View>
                    )}

                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Exclusive Benefits</Text>
                    <OfferItem code="LUXE20" description="Save 20% on your first order" colors={colors} />
                    <OfferItem code="FREESHIP" description="Complimentary shipping on this order" colors={colors} />

                    <View style={styles.quantitySection}>
                        <Text style={[styles.quantityLabel, { color: colors.text }]}>Quantity</Text>
                        <View style={[styles.stepper, { backgroundColor: isDarkMode ? '#121212' : '#F8F8F8', borderWidth: 1, borderColor: isDarkMode ? '#1F1F1F' : '#EEE' }]}>
                            <TouchableOpacity
                                onPress={() => setQty(q => Math.max(1, q - 1))}
                                style={styles.stepperBtn}
                            >
                                <Text style={[styles.stepperIcon, { color: colors.text }]}>−</Text>
                            </TouchableOpacity>
                            <Text style={[styles.stepperValue, { color: colors.text }]}>{qty}</Text>
                            <TouchableOpacity
                                onPress={() => setQty(q => q + 1)}
                                style={styles.stepperBtn}
                            >
                                <Text style={[styles.stepperIcon, { color: colors.text }]}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Button
                        mode="contained"
                        onPress={handleAddToCart}
                        style={styles.addToCartBtn}
                        contentStyle={{ height: 60 }}
                        buttonColor={colors.primary}
                        textColor={isDarkMode ? '#000' : '#FFF'}
                        labelStyle={{ fontSize: 17, fontWeight: '900', letterSpacing: 1 }}
                    >
                        ADD TO BAG
                    </Button>
                </View>
            </Animated.ScrollView>

            <Snackbar
                visible={snack}
                onDismiss={() => setSnack(false)}
                duration={2000}
                style={{ backgroundColor: colors.primary, borderRadius: 12 }}
            >
                <Text style={{ color: isDarkMode ? '#000' : '#FFF', fontWeight: '700' }}>Added to your collection</Text>
            </Snackbar>
        </View>
    );
};

const NoteSection = ({ title, notes, icon, color, isDarkMode }) => (
    <View style={styles.noteSection}>
        <View style={styles.noteHeader}>
            <IconButton icon={icon} size={18} iconColor={color} style={{ margin: 0 }} />
            <Text style={styles.noteTitle}>{title}</Text>
        </View>
        <View style={styles.noteChips}>
            {notes.map((note, i) => (
                <View key={i} style={[styles.noteChip, { backgroundColor: isDarkMode ? '#1A1A1A' : '#F5F5F5' }]}>
                    <Text style={styles.noteText}>{note}</Text>
                </View>
            ))}
        </View>
    </View>
);

const OfferItem = ({ code, description, colors }) => (
    <Surface style={[styles.offerBox, { borderColor: colors.primary + '20', backgroundColor: colors.primary + '08' }]} elevation={0}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', overflow: 'hidden', borderRadius: 20 }}>
            <View style={[styles.offerDot, { backgroundColor: colors.primary }]} />
            <View style={{ flex: 1 }}>
                <Text style={[styles.offerCode, { color: colors.primary }]}>{code}</Text>
                <Text style={[styles.offerDesc, { color: colors.textSecondary }]}>{description}</Text>
            </View>
        </View>
    </Surface>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        height: 110,
        paddingTop: 50,
        paddingHorizontal: 16,
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
    iconCircle: {
        margin: 4,
        borderRadius: 22,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
    },
    badge: { position: 'absolute', top: 5, right: 5 },
    imageContainer: {
        width: '100%',
        aspectRatio: 0.85,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 60
    },
    mainImage: { width: '85%', height: '85%', resizeMode: 'contain' },
    detailsSection: {
        padding: 30,
        marginTop: -40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        minHeight: 800,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -12 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
        elevation: 20
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 28
    },
    productName: {
        fontSize: 32,
        fontWeight: '900',
        flex: 1,
        marginRight: 12,
        letterSpacing: -0.5,
        lineHeight: 38,
    },
    productMeta: { fontSize: 14, color: '#888', marginTop: 8, letterSpacing: 0.5, fontWeight: '500' },
    productPrice: { fontSize: 28, fontWeight: '900', letterSpacing: -1 },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginTop: 40,
        marginBottom: 16,
        letterSpacing: -0.5,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 26,
        letterSpacing: 0.2,
        opacity: 0.7,
    },
    notesContainer: {
        marginTop: 10,
    },
    noteSection: {
        marginBottom: 20,
    },
    noteHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: -8
    },
    noteTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#888',
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    noteChips: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    noteChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    noteText: {
        fontSize: 13,
        fontWeight: '600',
        opacity: 0.8
    },
    offerBox: {
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 14,
        flexDirection: 'row',
        alignItems: 'center'
    },
    offerDot: {
        width: 3,
        height: 30,
        borderRadius: 2,
        marginRight: 16,
    },
    offerCode: { fontWeight: '800', fontSize: 16, marginBottom: 4, letterSpacing: 1 },
    offerDesc: { fontSize: 13, opacity: 0.7 },
    quantitySection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 40
    },
    quantityLabel: { fontSize: 18, fontWeight: '700', letterSpacing: -0.3 },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        padding: 6,
    },
    stepperValue: { marginHorizontal: 20, fontWeight: '800', fontSize: 20 },
    stepperBtn: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
    },
    stepperIcon: { fontSize: 24, fontWeight: '400' },
    addToCartBtn: {
        borderRadius: 20,
        marginTop: 10,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10
    }
});

export default ProductDetailScreen;
