import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Text, TextInput, Button, IconButton, useTheme as usePaperTheme, ActivityIndicator } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const AuthScreen = ({ navigation }) => {
    const { login, signup } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });

    const checkEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

    const onAuth = async () => {
        if (!checkEmail(form.email)) return Alert.alert('Error', 'Invalid email');
        if (form.password.length < 6) return Alert.alert('Error', 'Short password');

        setLoading(true);
        try {
            if (isLogin) await login(form.email, form.password);
            else await signup(form.name, form.email, form.password);
            navigation.goBack();
        } catch (err) {
            Alert.alert('Fail', err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={{ padding: 25 }}>
                <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} iconColor={colors.text} style={{ marginLeft: -10, marginTop: 40 }} />

                <View style={styles.hero}>
                    <Text style={[styles.title, { color: colors.text }]}>{isLogin ? 'Welcome' : 'Join Us'}</Text>
                    <Text style={{ color: '#888', marginTop: 10 }}>{isLogin ? 'Sign in to your account' : 'Register for premium access'}</Text>
                </View>

                {!isLogin && <TextInput label="Name" value={form.name} onChangeText={v => setForm({ ...form, name: v })} mode="outlined" style={styles.input} activeOutlineColor={colors.primary} />}

                <TextInput label="Email" value={form.email} onChangeText={v => setForm({ ...form, email: v })} mode="outlined" autoCapitalize="none" style={styles.input} activeOutlineColor={colors.primary} />

                <TextInput label="Password" value={form.password} onChangeText={v => setForm({ ...form, password: v })} mode="outlined" secureTextEntry style={styles.input} activeOutlineColor={colors.primary} />

                <Button mode="contained" onPress={onAuth} style={styles.btn} contentStyle={{ height: 56 }} buttonColor={colors.primary} labelStyle={{ color: isDarkMode ? '#00' : '#fff' }}>
                    {loading ? <ActivityIndicator color="#fff" /> : (isLogin ? 'Login' : 'Sign Up')}
                </Button>

                <TouchableOpacity style={styles.foot} onPress={() => setIsLogin(!isLogin)}>
                    <Text style={{ color: '#999' }}>{isLogin ? "Need account? " : "Have account? "}<Text style={{ color: colors.primary, fontWeight: 'bold' }}>{isLogin ? 'Sign Up' : 'Login'}</Text></Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    hero: { marginVertical: 40 },
    title: { fontSize: 32, fontWeight: '900' },
    input: { marginBottom: 15, backgroundColor: 'transparent' },
    btn: { marginTop: 20, borderRadius: 12 },
    foot: { marginTop: 40, alignItems: 'center' }
});

export default AuthScreen;
