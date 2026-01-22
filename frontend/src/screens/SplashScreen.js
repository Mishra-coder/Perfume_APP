import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';

const SplashScreen = ({ navigation }) => {
    const fade = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, { toValue: 1, duration: 1200, useNativeDriver: true }),
            Animated.spring(scale, { toValue: 1, friction: 8, useNativeDriver: true })
        ]).start();

        const timer = setTimeout(() => navigation.replace('Main'), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.box}>
            <Animated.View style={{ opacity: fade, transform: [{ scale }], alignItems: 'center' }}>
                <Text style={styles.title}>AROMA</Text>
                <Text style={styles.sub}>LUXE</Text>
                <View style={styles.line} />
                <Text style={styles.tag}>Luxury in every drop</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    box: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 50, fontWeight: '900', letterSpacing: 10, color: '#000' },
    sub: { fontSize: 18, fontWeight: '300', letterSpacing: 15, color: '#888', marginTop: -5 },
    line: { width: 40, height: 2, backgroundColor: '#000', marginVertical: 30 },
    tag: { fontSize: 12, color: '#aaa', letterSpacing: 2, textTransform: 'uppercase' }
});

export default SplashScreen;
