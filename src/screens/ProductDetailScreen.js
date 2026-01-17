import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, IconButton, Snackbar, Badge, Button } from 'react-native-paper';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route }) => {
    const { product } = route.params;
    const { addToCart, getTotalItems } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [activeImage, setActiveImage] = useState(product.image);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setIsAddedToCart(true);
    };

    const renderRating = () => (
        <View style={styles.reviewSection}>
            <View style={styles.starRow}>
                {[1, 2, 3, 4, 5].map(star => (
                    <IconButton
                        key={star}
                        icon="star"
                        size={14}
                        iconColor="#000"
                        style={styles.starIcon}
                    />
                ))}
            </View>
            <Text style={styles.reviewStats}>(4.9 • 120 reviews)</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={() => navigation.goBack()}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Cart')}
                    style={styles.cartBtn}
                >
                    <IconButton icon="shopping-outline" size={24} />
                    {getTotalItems() > 0 ? (
                        <Badge style={styles.cartBadge} size={18}>{getTotalItems()}</Badge>
                    ) : null}
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.imageBox}>
                    <Image source={activeImage} style={styles.mainImg} />

                    <View style={styles.galleryStrip}>
                        {[product.image, product.image, product.image].map((imgUrl, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.galleryThumb,
                                    activeImage === imgUrl && styles.activeThumb
                                ]}
                                onPress={() => setActiveImage(imgUrl)}
                            >
                                <Image source={imgUrl} style={styles.thumbImg} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.detailsArea}>
                    <View style={styles.titleRow}>
                        <View style={styles.nameBlock}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productSub}>{product.category} • Eau De Parfum</Text>
                        </View>
                        <Text style={styles.productPrice}>₹{product.price}</Text>
                    </View>

                    {renderRating()}

                    <Text style={styles.sectionTitle}>The Scent Profile</Text>
                    <Text style={styles.productDesc}>{product.description}</Text>

                    <View style={styles.quantityPicker}>
                        <Text style={styles.pickerLabel}>Quantity</Text>
                        <View style={styles.counterBox}>
                            <TouchableOpacity
                                onPress={() => setQuantity(q => Math.max(1, q - 1))}
                                style={styles.counterBtn}
                            >
                                <Text style={styles.counterSign}>−</Text>
                            </TouchableOpacity>
                            <Text style={styles.counterValue}>{quantity}</Text>
                            <TouchableOpacity
                                onPress={() => setQuantity(q => q + 1)}
                                style={styles.counterBtn}
                            >
                                <Text style={styles.counterSign}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Button
                        mode="contained"
                        style={styles.primaryBtn}
                        contentStyle={styles.btnContent}
                        labelStyle={styles.btnLabel}
                        onPress={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </View>
            </ScrollView>

            <Snackbar
                visible={isAddedToCart}
                onDismiss={() => setIsAddedToCart(false)}
                duration={2000}
                style={styles.notification}
            >
                <Text style={styles.notificationText}>Successfully added to cart!</Text>
            </Snackbar>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        zIndex: 10,
    },
    cartBtn: {
        marginRight: 5,
    },
    cartBadge: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#000',
        color: '#fff',
    },
    scrollContent: {
        paddingBottom: 50,
    },
    imageBox: {
        width: '100%',
        height: width * 1.2,
        backgroundColor: '#f9f9f9',
        justifyContent: 'flex-end',
    },
    mainImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    galleryStrip: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        padding: 8,
    },
    galleryThumb: {
        width: 50,
        height: 50,
        borderRadius: 12,
        overflow: 'hidden',
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    activeThumb: {
        borderColor: '#000',
    },
    thumbImg: {
        width: '100%',
        height: '100%',
    },
    detailsArea: {
        padding: 25,
        marginTop: -20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    nameBlock: {
        flex: 1,
    },
    productName: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    productSub: {
        fontSize: 14,
        color: '#888',
        marginTop: 5,
    },
    productPrice: {
        fontSize: 24,
        fontWeight: '900',
        color: '#000',
    },
    reviewSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    starRow: {
        flexDirection: 'row',
    },
    starIcon: {
        margin: 0,
    },
    reviewStats: {
        fontSize: 12,
        color: '#aaa',
        marginLeft: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 12,
        color: '#1a1a1a',
    },
    productDesc: {
        fontSize: 15,
        color: '#666',
        lineHeight: 24,
    },
    quantityPicker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 30,
    },
    pickerLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    counterBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        padding: 5,
    },
    counterBtn: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterSign: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    counterValue: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 15,
    },
    primaryBtn: {
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
    },
    btnContent: {
        height: 60,
    },
    btnLabel: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    notification: {
        backgroundColor: '#333',
        borderRadius: 10,
    },
    notificationText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ProductDetailScreen;
