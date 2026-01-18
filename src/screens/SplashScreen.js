import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';

const SplashScreen = ({ navigation }) => {
    const brandingFadeAnimation = useRef(new Animated.Value(0)).current;
    const brandingScaleAnimation = useRef(new Animated.Value(0.9)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(brandingFadeAnimation, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.spring(brandingScaleAnimation, {
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
        <View style={styles.mainLayout}>
            <Animated.View
                style={[
                    styles.brandingContainer,
                    {
                        opacity: brandingFadeAnimation,
                        transform: [{ scale: brandingScaleAnimation }]
                    }
                ]}
            >
                <Text style={styles.brandingPrimaryText}>AROMA</Text>
                <Text style={styles.brandingSecondaryText}>LUXE</Text>
                <View style={styles.separatorLine} />
                <Text style={styles.brandingTagline}>Luxury in every drop</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainLayout: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    brandingContainer: {
        alignItems: 'center'
    },
    brandingPrimaryText: {
        fontSize: 56,
        fontWeight: '900',
        color: '#1a1a1a',
        letterSpacing: 8
    },
    brandingSecondaryText: {
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
    brandingTagline: {
        fontSize: 13,
        color: '#bbbbbb',
        letterSpacing: 2,
        textTransform: 'uppercase'
    }
});

export default SplashScreen;
