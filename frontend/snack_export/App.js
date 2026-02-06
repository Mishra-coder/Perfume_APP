import 'react-native-gesture-handler';
import React, { createContext, useState, useContext, useEffect, useMemo, useRef } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Modal, KeyboardAvoidingView, Platform, Alert, Animated, StatusBar as RNStatusBar } from 'react-native';
import { Text, IconButton, Chip, Surface, Badge, Button, Provider as PaperProvider, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, Appbar, TextInput, ActivityIndicator, Snackbar } from 'react-native-paper';
import { NavigationContainer, DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

// --- DATA ---
const IMAGE_BASE = "https://aroma-luxe-static-lwf6ktjpy-mishra-coders-projects.vercel.app/assets/src/assets/perfumes/";
const products = [
    { id: 1, name: "Midnight Oud Royale", price: 12999, image: { uri: IMAGE_BASE + "5k_7b55f6f3-7569-44da-9b21-5f1acb38c378.9a9ec98bd8a184e59928a9f531d0c582.jpeg" }, category: "Oriental", strength: 5, profile: "strong", occurrences: ["party", "date", "festival"], notes: { top: ["Saffron"], middle: ["Oud Wood"], base: ["Amber"] }, description: "A deep, mysterious blend of precious agarwood." },
    { id: 2, name: "Velvet Rose Elixir", price: 8499, image: { uri: IMAGE_BASE + "A6mrGrFx_4f49e7e57a6e49b8aa84bf2f2e3a6573.70a5ad59839da52512f9e69118cbb083.jpg" }, category: "Floral", strength: 4, profile: "sweet", occurrences: ["date", "party"], notes: { top: ["Cloves"], middle: ["Damask Rose"], base: ["Praline"] }, description: "An opulent floral masterpiece combining damask rose." },
    { id: 3, name: "Aqua Allegoria Luxe", price: 6499, image: { uri: IMAGE_BASE + "Davidoff-cool-water-parfum-Men.jpg.7d289f6ada99ff80fe3f0ab86c62ab9b.webp" }, category: "Fresh", strength: 2, profile: "fresh", occurrences: ["college", "gym", "office"], notes: { top: ["Bergamot"], middle: ["Sea Salt"], base: ["Musk"] }, description: "A revitalizing burst of citrus and aquatic notes." },
    { id: 5, name: "Chanel N°5 Precious", price: 10999, image: { uri: IMAGE_BASE + "pexels-dhally-romy-16363250-15096784.a18fb452bc6fc3ff84de5cea867df951.jpg" }, category: "Aromatic", strength: 2, profile: "mild", occurrences: ["office", "college"], notes: { top: ["Aldehydes"], middle: ["Jasmine"], base: ["Vanilla"] }, description: "The legendary olfactory icon of elegance." }
];

// --- API ---
const API_URL = 'https://aroma-luxe-jmo7kdaa0-mishra-coders-projects.vercel.app/api';
const api = {
    login: async (e, p) => (await fetch(API_URL + '/auth/login', { method: 'POST', body: JSON.stringify({ email: e, password: p }), headers: { 'Content-Type': 'application/json' } })).json(),
    signup: async (n, e, p) => (await fetch(API_URL + '/auth/signup', { method: 'POST', body: JSON.stringify({ name: n, email: e, password: p }), headers: { 'Content-Type': 'application/json' } })).json(),
};

// --- CONTEXT ---
const ThemeContext = createContext();
const UserContext = createContext();
const CartContext = createContext();

// --- THEME ---
const paperLightTheme = { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, primary: '#1a1a1a', background: '#ffffff', text: '#1a1a1a' } };
const paperDarkTheme = { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, primary: '#D4AF37', background: '#121212', text: '#ffffff' } };
const { LightTheme: NavLight, DarkTheme: NavDark } = adaptNavigationTheme({ reactNavigationLight: NavigationDefaultTheme, reactNavigationDark: NavigationDarkTheme, materialLight: paperLightTheme, materialDark: paperDarkTheme });

// --- UTILS ---
const getRecommendations = (pts, occ) => pts.map(p => ({ ...p, matchPercentage: 95, reasoning: "Matches your style." })).slice(0, 3);

// --- SCREENS ---
const SplashScreen = ({ navigation }) => {
    useEffect(() => { setTimeout(() => navigation.replace('Main'), 2000); }, []);
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}><Text style={{ color: '#fff', fontSize: 32, fontWeight: '900' }}>AROMA LUXE</Text></View>;
};

const HomeScreen = ({ navigation }) => {
    const { isDarkMode } = useContext(ThemeContext);
    const { colors } = usePaperTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Appbar.Header style={{ backgroundColor: colors.background }}>
                <Appbar.Content title="Aroma Luxe" />
                <Appbar.Action icon="magnify" onPress={() => { }} />
                <Appbar.Action icon="shopping" onPress={() => navigation.navigate('Cart')} />
            </Appbar.Header>
            <FlatList
                data={products}
                keyExtractor={i => i.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ flex: 1, m: 10, padding: 10 }} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
                        <Image source={item.image} style={{ width: '100%', height: 150, borderRadius: 15 }} resizeMode="contain" />
                        <Text style={{ fontWeight: 'bold', marginTop: 10 }}>{item.name}</Text>
                        <Text>₹{item.price}</Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={{ p: 10 }}
            />
        </View>
    );
};

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const { colors } = usePaperTheme();
    const { addToCart } = useContext(CartContext);
    return (
        <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
            <Image source={product.image} style={{ width: '100%', height: 400 }} resizeMode="contain" />
            <View style={{ p: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.name}</Text>
                <Text style={{ fontSize: 20, color: colors.primary, my: 10 }}>₹{product.price}</Text>
                <Text style={{ color: '#888' }}>{product.description}</Text>
                <Button mode="contained" onPress={() => { addToCart(product); navigation.navigate('Cart'); }} style={{ mt: 20 }}>Add to Cart</Button>
            </View>
        </ScrollView>
    );
};

// --- MAIN WRAPPERS ---
const Stack = createStackNavigator();
const MainApp = () => {
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <PaperProvider theme={isDarkMode ? paperDarkTheme : paperLightTheme}>
            <NavigationContainer theme={isDarkMode ? NavDark : NavLight}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Splash" component={SplashScreen} />
                    <Stack.Screen name="Main" component={HomeScreen} />
                    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                    <Stack.Screen name="Cart" component={() => <View><Text>Cart Screen</Text></Button>} />
                </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style={isDarkMode ? "light" : "dark"} />
        </PaperProvider>
    );
};

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme: () => setIsDarkMode(!isDarkMode) }}>
            <CartContext.Provider value={{ cartItems: [], addToCart: () => { } }}>
                <MainApp />
            </CartContext.Provider>
        </ThemeContext.Provider>
    );
}
