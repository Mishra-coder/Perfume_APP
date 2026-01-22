import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, IconButton, useTheme as usePaperTheme } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const AuthScreen = ({ navigation }) => {
    const { login } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const checkEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const checkPass = (pass) => /[A-Z]/.test(pass) && /[0-9]/.test(pass);

    const isValid = isLogin
        ? (form.email && form.password)
        : (form.name && checkEmail(form.email) && checkPass(form.password));

    const onAuth = () => {
        const displayName = form.name || form.email.split('@')[0];
        login({ name: displayName, email: form.email });
        navigation.goBack();
    };

    const onChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));

        if (!isLogin) {
            setErrors(prev => {
                const newErrors = { ...prev };
                if (field === 'email') {
                    newErrors.email = value && !checkEmail(value) ? 'Invalid email format' : null;
                }
                if (field === 'password') {
                    newErrors.password = value && !checkPass(value) ? 'Need 1 capital & 1 number' : null;
                }
                return newErrors;
            });
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.nav}>
                    <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} iconColor={colors.text} />
                </View>

                <View style={styles.hero}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </Text>
                    <Text style={[styles.subtitle, { color: isDarkMode ? '#888888' : '#666666' }]}>
                        {isLogin ? 'Sign in to continue your journey.' : 'Join for exclusive access.'}
                    </Text>
                </View>

                <View style={styles.formView}>
                    {!isLogin && (
                        <TextInput
                            label="Full Name"
                            value={form.name}
                            onChangeText={val => onChange('name', val)}
                            mode="outlined"
                            style={styles.input}
                            activeOutlineColor={colors.primary}
                        />
                    )}

                    <TextInput
                        label="Email"
                        value={form.email}
                        onChangeText={val => onChange('email', val)}
                        mode="outlined"
                        autoCapitalize="none"
                        style={styles.input}
                        activeOutlineColor={colors.primary}
                        error={!!errors.email}
                    />
                    {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <TextInput
                        label="Password"
                        value={form.password}
                        onChangeText={val => onChange('password', val)}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        activeOutlineColor={colors.primary}
                        error={!!errors.password}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <Button
                        mode="contained"
                        style={styles.btn}
                        contentStyle={styles.btnContent}
                        labelStyle={[styles.btnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                        disabled={!isValid}
                        onPress={onAuth}
                        buttonColor={colors.primary}
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </View>

                <View style={styles.footer}>
                    <Text style={{ color: '#999999' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </Text>
                    <TouchableOpacity onPress={() => { setIsLogin(!isLogin); setErrors({}); }}>
                        <Text style={[styles.link, { color: colors.primary }]}>
                            {isLogin ? 'Join Now' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scroll: { paddingHorizontal: 25, paddingBottom: 40 },
    nav: { paddingTop: 50, marginLeft: -10 },
    hero: { marginTop: 20, marginBottom: 40 },
    title: { fontSize: 34, fontWeight: '900' },
    subtitle: { fontSize: 16, marginTop: 10 },
    formView: { marginTop: 10 },
    input: { marginBottom: 15, backgroundColor: 'transparent' },
    btn: { marginTop: 20, borderRadius: 15 },
    btnContent: { height: 56 },
    btnLabel: { fontWeight: 'bold', fontSize: 16 },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 50 },
    link: { fontWeight: 'bold', textDecorationLine: 'underline' },
    error: { color: '#d32f2f', fontSize: 11, marginTop: -10, marginBottom: 10, marginLeft: 4 }
});

export default AuthScreen;
