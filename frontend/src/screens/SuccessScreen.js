import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton, useTheme as usePaperTheme } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const SuccessScreen = ({ navigation, route }) => {
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();
    const id = route.params?.orderId || 'AL-DIRECT';

    return (
        <View style={[styles.box, { backgroundColor: colors.background }]}>
            <View style={[styles.icon, { backgroundColor: colors.primary }]}>
                <IconButton icon="check" size={60} iconColor={isDarkMode ? '#000' : '#fff'} />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>Success!</Text>
            <Text style={styles.msg}>Your order {id} is being processed.</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Main')} style={styles.btn} contentStyle={{ height: 56 }} buttonColor={colors.primary} labelStyle={{ color: isDarkMode ? '#000' : '#fff' }}>Continue</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    box: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    icon: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center', marginBottom: 30 },
    title: { fontSize: 30, fontWeight: '900', marginBottom: 10 },
    msg: { textAlign: 'center', color: '#888', marginBottom: 40 },
    btn: { width: '100%', borderRadius: 12 }
});

export default SuccessScreen;
