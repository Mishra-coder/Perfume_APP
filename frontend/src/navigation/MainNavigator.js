import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../screens/SplashScreen';
import Home from '../screens/HomeScreen';
import Detail from '../screens/ProductDetailScreen';
import Cart from '../screens/CartScreen';
import Recs from '../screens/RecommendationScreen';
import Profile from '../screens/ProfileScreen';
import Check from '../screens/CheckoutScreen';
import Done from '../screens/SuccessScreen';
import Hist from '../screens/OrdersScreen';
import Auth from '../screens/AuthScreen';
import Wish from '../screens/WishlistScreen';
import OrderDetail from '../screens/OrderDetailScreen';

const Stack = createStackNavigator();

const MainNavigator = () => (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Main" component={Home} />
        <Stack.Screen name="ProductDetail" component={Detail} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Recommendation" component={Recs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Checkout" component={Check} />
        <Stack.Screen name="Success" component={Done} />
        <Stack.Screen name="Orders" component={Hist} />
        <Stack.Screen name="OrderDetail" component={OrderDetail} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Wishlist" component={Wish} />
    </Stack.Navigator>
);

export default MainNavigator;
