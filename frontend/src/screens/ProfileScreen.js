import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Appbar, TextInput, Button, Avatar, Text, Surface, IconButton, Switch, Badge, useTheme as usePaperTheme } from 'react-native-paper';
import * as Updates from 'expo-updates';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

const ProfileScreen = ({ navigation }) => {
    const { user, setUserProfile, logout } = useUser();
    const { isDarkMode, toggleTheme } = useTheme();
    const { colors } = usePaperTheme();
    const { count } = useCart();
    const [editing, setEditing] = useState(false);

    const onLogout = () => {
        logout();
        navigation.navigate('Main');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={{ backgroundColor: colors.background }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Profile" titleStyle={{ fontWeight: 'bold' }} />
                <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={{ marginRight: 10 }}>
                    <IconButton icon="shopping-outline" size={24} iconColor={colors.text} />
                    {count > 0 && <Badge style={{ position: 'absolute', top: 5, right: 5, backgroundColor: colors.primary }} size={16}>{count}</Badge>}
                </TouchableOpacity>
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileHero
                    user={user}
                    editing={editing}
                    setEditing={setEditing}
                    onUpdate={setUserProfile}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />

                <Settings
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    isLoggedIn={user.isLoggedIn}
                    onLogout={onLogout}
                    nav={navigation}
                    colors={colors}
                />
            </ScrollView>
        </View>
    );
};

const ProfileHero = ({ user, editing, setEditing, onUpdate, isDarkMode, colors }) => {
    const [name, setName] = useState(user.name);

    if (editing) return (
        <View style={styles.hero}>
            <Surface style={styles.avatarCard} elevation={2}>
                <Avatar.Icon size={100} icon="account-edit" backgroundColor={colors.primary} color={isDarkMode ? '#000' : '#FFF'} />
            </Surface>
            <TextInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                mode="flat"
                style={styles.editInput}
                activeUnderlineColor={colors.primary}
                textColor={colors.text}
            />
            <Button
                mode="contained"
                onPress={() => {
                    if (typeof onUpdate === 'function') {
                        onUpdate(name);
                        setEditing(false);
                    } else {
                        Alert.alert("System Error", "Update function missing.");
                    }
                }}
                buttonColor={colors.primary}
                textColor={isDarkMode ? '#000' : '#FFF'}
                style={styles.saveBtn}
                labelStyle={{ fontWeight: '900' }}
            >
                SAVE CHANGES
            </Button>
            <TouchableOpacity onPress={() => setEditing(false)} style={{ marginTop: 15 }}>
                <Text style={{ color: '#888', fontWeight: 'bold' }}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.hero}>
            <Surface style={styles.avatarCard} elevation={2}>
                <Avatar.Icon size={100} icon="account" backgroundColor={colors.primary} color={isDarkMode ? '#000' : '#FFF'} />
            </Surface>
            <Text style={[styles.name, { color: colors.text }]}>{user.name || "Guest Collector"}</Text>
            <Text style={styles.email}>{user.email || "premium@aromaluxe.com"}</Text>
            {user.isLoggedIn && (
                <TouchableOpacity onPress={() => setEditing(true)} style={styles.editBtn}>
                    <Text style={[styles.edit, { color: colors.primary }]}>Edit Profile</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const Settings = ({ isDarkMode, toggleTheme, isLoggedIn, onLogout, nav, colors }) => (
    <View style={styles.settings}>
        <View style={styles.sectionHeader}>
            <Text style={[styles.label, { color: colors.primary }]}>Preferences</Text>
        </View>
        <Surface style={styles.settingCard} elevation={1}>
            <View style={{ overflow: 'hidden', borderRadius: 24 }}>
                <View style={styles.row}>
                    <View style={styles.rowIconLabel}>
                        <IconButton icon="theme-light-dark" iconColor={colors.primary} size={20} />
                        <Text style={[styles.rowText, { color: colors.text }]}>Dark Mode</Text>
                    </View>
                    <Switch value={isDarkMode} onValueChange={toggleTheme} color={colors.primary} />
                </View>
            </View>
        </Surface>

        <View style={styles.sectionHeader}>
            <Text style={[styles.label, { color: colors.primary }]}>Account & Orders</Text>
        </View>
        <Surface style={styles.settingCard} elevation={1}>
            <View style={{ overflow: 'hidden', borderRadius: 24 }}>
                <Item icon="cart-outline" title="My Bag" nav={nav} to="Cart" colors={colors} />
                <Item icon="heart-outline" title="My Wishlist" nav={nav} to="Wishlist" colors={colors} />
                <Item icon="package-variant" title="Order History" nav={nav} to="Orders" colors={colors} />
            </View>
        </Surface>

        {isLoggedIn ? (
            <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
                <Text style={styles.logoutText}>SIGN OUT</Text>
            </TouchableOpacity>
        ) : (
            <Button
                mode="contained"
                onPress={() => nav.navigate('Auth')}
                style={styles.loginBtn}
                buttonColor={colors.primary}
                textColor={isDarkMode ? '#000' : '#FFF'}
                labelStyle={{ fontWeight: '900' }}
            >
                SIGN IN
            </Button>
        )}

        <View style={styles.footer}>
            <Text style={styles.version}>Aroma Luxe v1.0.2 • GOLD EDITION</Text>
            <TouchableOpacity onPress={() => Alert.alert("Aroma Luxe", "You are using the latest version.")}>
                <Text style={[styles.checkUpdate, { color: colors.primary }]}>Check for Updates</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const Item = ({ icon, title, nav, to, onPress, colors, danger }) => (
    <TouchableOpacity style={styles.item} onPress={onPress || (() => nav.navigate(to))}>
        <View style={styles.rowIconLabel}>
            <IconButton icon={icon} iconColor={danger ? '#f44' : colors.primary} size={20} />
            <Text style={[styles.itemText, { color: danger ? '#f44' : colors.text }]}>{title}</Text>
        </View>
        <IconButton icon="chevron-right" size={20} iconColor="#555" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    hero: { alignItems: 'center', paddingVertical: 50, paddingHorizontal: 30 },
    avatarCard: {
        padding: 4,
        borderRadius: 60,
        backgroundColor: '#D4AF37',
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 10,
    },
    name: { fontSize: 28, fontWeight: '900', marginTop: 24, letterSpacing: -0.5 },
    email: { fontSize: 14, color: '#888', marginTop: 6, letterSpacing: 0.5 },
    editBtn: { marginTop: 16, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(212, 175, 55, 0.3)' },
    edit: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1 },
    editInput: { width: '100%', marginTop: 30, backgroundColor: 'transparent' },
    saveBtn: { marginTop: 30, width: '100%', borderRadius: 16 },
    settings: { paddingHorizontal: 25, paddingBottom: 60 },
    sectionHeader: { marginTop: 20, marginBottom: 12, paddingHorizontal: 4 },
    label: { fontSize: 12, fontWeight: '900', textTransform: 'uppercase', letterSpacing: 2 },
    settingCard: {
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'rgba(212, 175, 55, 0.03)',
        borderWidth: 1,
        borderColor: 'rgba(212, 175, 55, 0.08)',
        marginBottom: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12
    },
    rowIconLabel: { flexDirection: 'row', alignItems: 'center' },
    rowText: { fontSize: 16, fontWeight: '600', marginLeft: 4 },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(212, 175, 55, 0.05)'
    },
    itemText: { flex: 1, marginLeft: 4, fontSize: 16, fontWeight: '600' },
    logoutBtn: {
        marginTop: 20,
        paddingVertical: 18,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'rgba(255, 68, 68, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 68, 68, 0.1)'
    },
    logoutText: { color: '#FF4444', fontWeight: '900', letterSpacing: 2 },
    loginBtn: { marginTop: 20, borderRadius: 20, height: 56, justifyContent: 'center' },
    footer: { marginTop: 60, alignItems: 'center' },
    version: { fontSize: 10, color: '#666', fontWeight: 'bold', letterSpacing: 1 },
    checkUpdate: { fontSize: 12, fontWeight: '800', marginTop: 12, textDecorationLine: 'underline' }
});

export default ProfileScreen;
