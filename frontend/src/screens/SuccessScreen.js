import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton, useTheme as usePaperTheme, Surface } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const SuccessScreen = ({ navigation, route }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const id = route.params?.orderId || 'AL-DIRECT';

    return (
        <View style={[styles.box, { backgroundColor: colors.background }]}>
            <Surface style={styles.iconWrapper} elevation={4}>
                <IconButton icon="check-decagram" size={80} iconColor={isDarkMode ? '#000' : '#FFF'} />
            </Surface>
            <Text style={[styles.title, { color: colors.text }]}>ORDER CONFIRMED</Text>
            <Text style={styles.msg}>Your bespoke fragrance collection is being prepared. Your order ID is {id}.</Text>

            <View style={styles.divider} />

            <Text style={styles.thankYou}>Thank you for choosing Aroma Luxe.</Text>

            <Button
                mode="contained"
                onPress={() => navigation.navigate('Main')}
                style={styles.btn}
                contentStyle={{ height: 60 }}
                buttonColor={colors.primary}
                labelStyle={{ color: isDarkMode ? '#000' : '#FFF', fontWeight: '900', letterSpacing: 2 }}
            >
                RETURN TO BOUTIQUE
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    box: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    iconWrapper: {
        width: 140,
        height: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: '#D4AF37',
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 15
    },
    title: { fontSize: 24, fontWeight: '900', marginBottom: 16, letterSpacing: 3 },
    msg: { textAlign: 'center', color: '#888', marginBottom: 20, lineHeight: 22, fontSize: 16 },
    divider: { width: 40, height: 2, backgroundColor: '#D4AF37', marginBottom: 20, opacity: 0.5 },
    thankYou: { fontSize: 13, fontWeight: '700', color: '#666', marginBottom: 40, textTransform: 'uppercase', letterSpacing: 1 },
    btn: { width: '100%', borderRadius: 20 }
});

export default SuccessScreen;
