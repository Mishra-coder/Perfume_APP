import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';

const SplashScreen = ({ navigation }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 10,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('Main');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.branding, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.title}>AROMA</Text>
                <Text style={styles.subtitle}>LUXE</Text>
                <View style={styles.line} />
                <Text style={styles.tagline}>Luxury in every drop</Text>
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
    branding: {
        alignItems: 'center'
    },
    title: {
        fontSize: 56,
        fontWeight: '900',
        color: '#1a1a1a',
        letterSpacing: 8
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '300',
        color: '#888888',
        letterSpacing: 12,
        marginTop: -5
    },
    line: {
        width: 40,
        height: 2,
        backgroundColor: '#000000',
        marginVertical: 30
    },
    tagline: {
        fontSize: 13,
        color: '#bbbbbb',
        letterSpacing: 2,
        textTransform: 'uppercase'
    }
});

export default SplashScreen;

