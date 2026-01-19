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

    const isValid = isLogin
        ? (form.email && form.password)
        : (form.name && form.email && form.password);

    const handleAuth = () => {
        const name = form.name || form.email.split('@')[0];
        login({ name, email: form.email });
        navigation.goBack();
    };

    const update = (key, val) => setForm({ ...form, [key]: val });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
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

                <View style={styles.form}>
                    {!isLogin && (
                        <TextInput
                            label="Full Name"
                            value={form.name}
                            onChangeText={val => update('name', val)}
                            mode="outlined"
                            style={styles.input}
                            activeOutlineColor={colors.primary}
                        />
                    )}

                    <TextInput
                        label="Email"
                        value={form.email}
                        onChangeText={val => update('email', val)}
                        mode="outlined"
                        autoCapitalize="none"
                        style={styles.input}
                        activeOutlineColor={colors.primary}
                    />

                    <TextInput
                        label="Password"
                        value={form.password}
                        onChangeText={val => update('password', val)}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        activeOutlineColor={colors.primary}
                    />

                    <Button
                        mode="contained"
                        style={styles.btn}
                        contentStyle={styles.btnContent}
                        labelStyle={[styles.btnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                        disabled={!isValid}
                        onPress={handleAuth}
                        buttonColor={colors.primary}
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </Button>
                </View>

                <View style={styles.footer}>
                    <Text style={{ color: '#999999' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                    </Text>
                    <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
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
    container: {
        flex: 1
    },
    scroll: {
        paddingHorizontal: 25,
        paddingBottom: 40
    },
    header: {
        paddingTop: 50,
        marginLeft: -10
    },
    hero: {
        marginTop: 20,
        marginBottom: 40
    },
    title: {
        fontSize: 34,
        fontWeight: '900'
    },
    subtitle: {
        fontSize: 16,
        marginTop: 10
    },
    form: {
        marginTop: 10
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'transparent'
    },
    btn: {
        marginTop: 20,
        borderRadius: 15
    },
    btnContent: {
        height: 56
    },
    btnLabel: {
        fontWeight: 'bold',
        fontSize: 16
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    link: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});


export default AuthScreen;

