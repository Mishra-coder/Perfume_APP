import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';

const SplashScreen = ({ navigation }) => {
    const fade = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.9)).current;
    const slideUp = useRef(new Animated.Value(20)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, { toValue: 1, duration: 1500, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, friction: 6, tension: 40, useNativeDriver: true }),
            Animated.timing(slideUp, { toValue: 0, duration: 1500, useNativeDriver: true })
        ]).start();

        const timer = setTimeout(() => navigation.replace('Main'), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.box}>
            <Animated.View style={{
                opacity: fade,
                transform: [{ scale }, { translateY: slideUp }],
                alignItems: 'center'
            }}>
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>AROMA</Text>
                    <Text style={styles.sub}>LUXE</Text>
                </View>
                <View style={styles.line} />
                <Text style={styles.tag}>EST. 2024 • PREMIUM BOUTIQUE</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: '#050505',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 54,
        fontWeight: '900',
        letterSpacing: 12,
        color: '#D4AF37',
        textShadowColor: 'rgba(212, 175, 55, 0.3)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10,
    },
    sub: {
        fontSize: 20,
        fontWeight: '300',
        letterSpacing: 18,
        color: '#E5C158',
        marginTop: -8,
        opacity: 0.8
    },
    line: {
        width: 60,
        height: 1,
        backgroundColor: '#D4AF37',
        marginVertical: 40,
        opacity: 0.5
    },
    tag: {
        fontSize: 10,
        color: '#666',
        letterSpacing: 4,
        textTransform: 'uppercase',
        fontWeight: '600'
    }
});

export default SplashScreen;
