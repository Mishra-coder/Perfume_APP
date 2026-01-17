import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Text, TextInput, Button, IconButton, Surface } from 'react-native-paper';
import { useUser } from '../context/UserContext';

const AuthScreen = ({ navigation }) => {
    const { login } = useUser();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const canSubmit = isLoginMode
        ? (email && password)
        : (name && email && password);

    const handleAuthAction = () => {
        const displayName = name || email.split('@')[0];
        login({ name: displayName, email });
        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.main}
        >
            <ScrollView contentContainerStyle={styles.scrollArea} showsVerticalScrollIndicator={false}>
                <View style={styles.topBar}>
                    <IconButton
                        icon="arrow-left"
                        size={24}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                <View style={styles.header}>
                    <Text style={styles.heroText}>
                        {isLoginMode ? 'Welcome Back' : 'Join the Club'}
                    </Text>
                    <Text style={styles.subText}>
                        {isLoginMode
                            ? 'Continue your premium scent journey.'
                            : 'Sign up for exclusive luxury access.'}
                    </Text>
                </View>

                <View style={styles.formArea}>
                    {!isLoginMode && (
                        <TextInput
                            label="Name"
                            value={name}
                            onChangeText={setName}
                            mode="outlined"
                            style={styles.field}
                            outlineColor="#f0f0f0"
                            activeOutlineColor="#000"
                        />
                    )}

                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        autoCapitalize="none"
                        style={styles.field}
                        outlineColor="#f0f0f0"
                        activeOutlineColor="#000"
                    />

                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry
                        style={styles.field}
                        outlineColor="#f0f0f0"
                        activeOutlineColor="#000"
                    />

                    <Button
                        mode="contained"
                        style={styles.mainBtn}
                        contentStyle={styles.btnInner}
                        labelStyle={styles.btnText}
                        disabled={!canSubmit}
                        onPress={handleAuthAction}
                    >
                        {isLoginMode ? 'Login' : 'Create Account'}
                    </Button>
                </View>

                <View style={styles.switchBox}>
                    <Text style={styles.switchHint}>
                        {isLoginMode ? "Don't have an account? " : "Already registered? "}
                    </Text>
                    <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
                        <Text style={styles.switchAction}>
                            {isLoginMode ? 'Sign Up' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollArea: {
        paddingHorizontal: 25,
        paddingBottom: 40,
    },
    topBar: {
        paddingTop: 50,
        marginLeft: -10,
    },
    header: {
        marginTop: 20,
        marginBottom: 40,
    },
    heroText: {
        fontSize: 34,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    subText: {
        fontSize: 16,
        color: '#888',
        marginTop: 10,
        lineHeight: 22,
    },
    formArea: {
        marginTop: 10,
    },
    field: {
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    mainBtn: {
        marginTop: 20,
        backgroundColor: '#1a1a1a',
        borderRadius: 15,
    },
    btnInner: {
        height: 56,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    switchBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    switchHint: {
        color: '#999',
    },
    switchAction: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});

export default AuthScreen;
