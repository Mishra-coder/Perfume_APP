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
        if (!checkEmail(form.email)) return Alert.alert('Verification', 'Please enter a valid email address');
        if (form.password.length < 6) return Alert.alert('Security', 'Password must be at least 6 characters');

        setLoading(true);
        try {
            if (isLogin) await login(form.email, form.password);
            else await signup(form.name, form.email, form.password);
            navigation.goBack();
        } catch (err) {
            Alert.alert('Authentication Failed', err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <IconButton
                    icon="arrow-left"
                    size={24}
                    onPress={() => navigation.goBack()}
                    iconColor={colors.text}
                    style={styles.backBtn}
                />

                <View style={styles.hero}>
                    <Text style={[styles.title, { color: colors.text }]}>{isLogin ? 'Welcome Back' : 'Create Account'}</Text>
                    <Text style={styles.subtitle}>{isLogin ? 'Enter your details to access your collection' : 'Become a member of Aroma Luxe today'}</Text>
                </View>

                <View style={styles.form}>
                    {!isLogin && (
                        <TextInput
                            label="Full Name"
                            value={form.name}
                            onChangeText={v => setForm({ ...form, name: v })}
                            mode="flat"
                            style={styles.input}
                            activeUnderlineColor={colors.primary}
                            textColor={colors.text}
                        />
                    )}

                    <TextInput
                        label="Email Address"
                        value={form.email}
                        onChangeText={v => setForm({ ...form, email: v })}
                        mode="flat"
                        autoCapitalize="none"
                        style={styles.input}
                        activeUnderlineColor={colors.primary}
                        textColor={colors.text}
                    />

                    <TextInput
                        label="Password"
                        value={form.password}
                        onChangeText={v => setForm({ ...form, password: v })}
                        mode="flat"
                        secureTextEntry
                        style={styles.input}
                        activeUnderlineColor={colors.primary}
                        textColor={colors.text}
                    />

                    <Button
                        mode="contained"
                        onPress={onAuth}
                        style={styles.btn}
                        contentStyle={{ height: 60 }}
                        buttonColor={colors.primary}
                        textColor={isDarkMode ? '#000' : '#FFF'}
                        loading={loading}
                        labelStyle={styles.btnLabel}
                    >
                        {isLogin ? 'LOGIN' : 'SIGN UP'}
                    </Button>

                    <TouchableOpacity style={styles.foot} onPress={() => setIsLogin(!isLogin)} activeOpacity={0.7}>
                        <Text style={styles.footText}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <Text style={[styles.footAction, { color: colors.primary }]}>{isLogin ? 'Sign Up' : 'Login'}</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 30, paddingBottom: 60 },
    backBtn: { marginLeft: -12, marginTop: 40 },
    hero: { marginVertical: 45 },
    title: { fontSize: 38, fontWeight: '900', letterSpacing: -1 },
    subtitle: { color: '#888', marginTop: 12, fontSize: 16, lineHeight: 22, letterSpacing: 0.3 },
    form: { marginTop: 10 },
    input: { marginBottom: 20, backgroundColor: 'transparent', height: 65, fontSize: 16 },
    btn: {
        marginTop: 30,
        borderRadius: 18,
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8
    },
    btnLabel: { fontSize: 16, fontWeight: '900', letterSpacing: 1.5 },
    foot: { marginTop: 50, alignItems: 'center' },
    footText: { color: '#999', fontSize: 15, letterSpacing: 0.2 },
    footAction: { fontWeight: '800' }
});

export default AuthScreen;
