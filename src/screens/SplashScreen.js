import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';

const SplashScreen = ({ navigation }) => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    const scaleAnimation = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnimation, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnimation, {
                toValue: 1,
                tension: 10,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        const navigationTimer = setTimeout(() => {
            navigation.replace('Main');
        }, 3000);

        return () => clearTimeout(navigationTimer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.brandingContainer, { opacity: fadeAnimation, transform: [{ scale: scaleAnimation }] }]}>
                <Text style={styles.brandTitle}>AROMA</Text>
                <Text style={styles.brandSubtitle}>LUXE</Text>
                <View style={styles.separatorLine} />
                <Text style={styles.brandTagline}>Luxury in every drop</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    brandingContainer: {
        alignItems: 'center'
    },
    brandTitle: {
        fontSize: 56,
        fontWeight: '900',
        color: '#1a1a1a',
        letterSpacing: 8
    },
    brandSubtitle: {
        fontSize: 20,
        fontWeight: '300',
        color: '#888888',
        letterSpacing: 12,
        marginTop: -5
    },
    separatorLine: {
        width: 40,
        height: 2,
        backgroundColor: '#000000',
        marginVertical: 30
    },
    brandTagline: {
        fontSize: 13,
        color: '#bbbbbb',
        letterSpacing: 2,
        textTransform: 'uppercase'
    }
});

export default SplashScreen;
