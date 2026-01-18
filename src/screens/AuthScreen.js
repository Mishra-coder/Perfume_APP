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
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const isFormValid = isLoginMode
        ? (formData.email && formData.password)
        : (formData.fullName && formData.email && formData.password);

    const handleAuthAction = () => {
        const displayName = formData.fullName || formData.email.split('@')[0];
        login({ name: displayName, email: formData.email });
        navigation.goBack();
    };

    const toggleMode = () => setIsLoginMode(prev => !prev);

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

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
                        {isLoginMode ? 'Welcome Back' : 'Sign Up'}
                    </Text>
                    <Text style={[styles.subtitle, { color: isDarkMode ? '#888888' : '#666666' }]}>
                        {isLoginMode ? 'Continue your luxury journey.' : 'Join for exclusive fragrance access.'}
                    </Text>
                </View>

                <View style={styles.form}>
                    {!isLoginMode && (
                        <TextInput
                            label="Full Name"
                            value={formData.fullName}
                            onChangeText={(val) => updateField('fullName', val)}
                            mode="outlined"
                            style={[styles.input, { backgroundColor: colors.background }]}
                            outlineColor={isDarkMode ? '#333333' : '#f0f0f0'}
                            activeOutlineColor={colors.primary}
                            textColor={colors.text}
                        />
                    )}

                    <TextInput
                        label="Email Address"
                        value={formData.email}
                        onChangeText={(val) => updateField('email', val)}
                        mode="outlined"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={[styles.input, { backgroundColor: colors.background }]}
                        outlineColor={isDarkMode ? '#333333' : '#f0f0f0'}
                        activeOutlineColor={colors.primary}
                        textColor={colors.text}
                    />

                    <TextInput
                        label="Password"
                        value={formData.password}
                        onChangeText={(val) => updateField('password', val)}
                        mode="outlined"
                        secureTextEntry
                        style={[styles.input, { backgroundColor: colors.background }]}
                        outlineColor={isDarkMode ? '#333333' : '#f0f0f0'}
                        activeOutlineColor={colors.primary}
                        textColor={colors.text}
                    />

                    <Button
                        mode="contained"
                        buttonColor={colors.primary}
                        style={styles.actionBtn}
                        contentStyle={styles.actionBtnContent}
                        labelStyle={[styles.actionBtnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                        disabled={!isFormValid}
                        onPress={handleAuthAction}
                    >
                        {isLoginMode ? 'Login' : 'Create Account'}
                    </Button>
                </View>

                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: '#999999' }]}>
                        {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                    </Text>
                    <TouchableOpacity onPress={toggleMode}>
                        <Text style={[styles.footerLink, { color: colors.primary }]}>
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
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingBottom: 40,
    },
    header: {
        paddingTop: 50,
        marginLeft: -10,
    },
    heroSection: {
        marginTop: 20,
        marginBottom: 40,
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
    },
    subtitle: {
        fontSize: 16,
        marginTop: 10,
        lineHeight: 22,
    },
    form: {
        marginTop: 10,
    },
    input: {
        marginBottom: 15,
    },
    actionBtn: {
        marginTop: 20,
        borderRadius: 15,
    },
    actionBtnContent: {
        height: 56,
    },
    actionBtnLabel: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    footerText: {
        color: '#999',
    },
    footerLink: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default AuthScreen;
