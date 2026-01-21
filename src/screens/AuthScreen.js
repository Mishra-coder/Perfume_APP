import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, IconButton, useTheme as usePaperTheme } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const AuthScreen = ({ navigation }) => {
    const { login } = useUser();
    const { isDarkMode } = useTheme();
    const { colors } = usePaperTheme();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const isFormValid = isLoginMode
        ? (formData.email && formData.password)
        : (formData.name && formData.email && formData.password);

    const handleAuthentication = () => {
        const userName = formData.name || formData.email.split('@')[0];
        login({ name: userName, email: formData.email });
        navigation.goBack();
    };

    const updateField = (key, value) => setFormData({ ...formData, [key]: value });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.background }]}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <IconButton icon="arrow-left" size={24} onPress={() => navigation.goBack()} iconColor={colors.text} />
                </View>

                <View style={styles.heroSection}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        {isLoginMode ? 'Welcome Back' : 'Create Account'}
                    </Text>
                    <Text style={[styles.subtitle, { color: isDarkMode ? '#888888' : '#666666' }]}>
                        {isLoginMode ? 'Sign in to continue your journey.' : 'Join for exclusive access.'}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {!isLoginMode && (
                        <TextInput
                            label="Full Name"
                            value={formData.name}
                            onChangeText={val => updateField('name', val)}
                            mode="outlined"
                            style={styles.inputField}
                            activeOutlineColor={colors.primary}
                        />
                    )}

                    <TextInput
                        label="Email"
                        value={formData.email}
                        onChangeText={val => updateField('email', val)}
                        mode="outlined"
                        autoCapitalize="none"
                        style={styles.inputField}
                        activeOutlineColor={colors.primary}
                    />

                    <TextInput
                        label="Password"
                        value={formData.password}
                        onChangeText={val => updateField('password', val)}
                        mode="outlined"
                        secureTextEntry
                        style={styles.inputField}
                        activeOutlineColor={colors.primary}
                    />

                    <Button
                        mode="contained"
                        style={styles.authButton}
                        contentStyle={styles.authButtonContent}
                        labelStyle={[styles.authButtonLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                        disabled={!isFormValid}
                        onPress={handleAuthentication}
                        buttonColor={colors.primary}
                    >
                        {isLoginMode ? 'Login' : 'Sign Up'}
                    </Button>
                </View>

                <View style={styles.footer}>
                    <Text style={{ color: '#999999' }}>
                        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                    </Text>
                    <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
                        <Text style={[styles.linkText, { color: colors.primary }]}>
                            {isLoginMode ? 'Join Now' : 'Login'}
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
    scrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 40
    },
    header: {
        paddingTop: 50,
        marginLeft: -10
    },
    heroSection: {
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
    formContainer: {
        marginTop: 10
    },
    inputField: {
        marginBottom: 15,
        backgroundColor: 'transparent'
    },
    authButton: {
        marginTop: 20,
        borderRadius: 15
    },
    authButtonContent: {
        height: 56
    },
    authButtonLabel: {
        fontWeight: 'bold',
        fontSize: 16
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    linkText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});

export default AuthScreen;
