import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
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
        <View style={styles.shell}>
            <Animated.View style={[styles.visuals, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.prime}>AROMA</Text>
                <Text style={styles.second}>LUXE</Text>
                <View style={styles.line} />
                <Text style={styles.motto}>Luxury in every drop</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    shell: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
    visuals: { alignItems: 'center' },
    logo: { width: 120, height: 120, marginBottom: 20 },
    prime: { fontSize: 56, fontWeight: '900', color: '#1a1a1a', letterSpacing: 8 },
    second: { fontSize: 20, fontWeight: '300', color: '#888', letterSpacing: 12, marginTop: -5 },
    line: { width: 40, height: 2, backgroundColor: '#000', marginVertical: 30 },
    motto: { fontSize: 13, color: '#bbb', letterSpacing: 2, textTransform: 'uppercase' }
});

export default SplashScreen;
