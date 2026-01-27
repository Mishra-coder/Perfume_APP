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
            <Avatar.Icon size={80} icon="account" backgroundColor={colors.primary} />
            <TextInput label="Name" value={name} onChangeText={setName} mode="outlined" style={styles.input} />
            <Button
                mode="contained"
                onPress={() => {
                    if (typeof onUpdate === 'function') {
                        onUpdate(name);
                        setEditing(false);
                    } else {
                        Alert.alert("System Error", "Update function missing. Please force close and restart the app to apply updates.");
                    }
                }}
                buttonColor={colors.primary}
            >
                Save
            </Button>
        </View>
    );

    return (
        <View style={styles.hero}>
            <Avatar.Icon size={80} icon="account" backgroundColor={colors.primary} />
            <Text style={[styles.name, { color: colors.text }]}>{user.name || "Guest"}</Text>
            {user.isLoggedIn && <TouchableOpacity onPress={() => setEditing(true)}><Text style={styles.edit}>Edit Profile</Text></TouchableOpacity>}
        </View>
    );
};

const Settings = ({ isDarkMode, toggleTheme, isLoggedIn, onLogout, nav, colors }) => (
    <View style={styles.settings}>
        <Text style={[styles.label, { color: colors.primary }]}>Settings</Text>
        <View style={styles.row}>
            <Text style={{ color: colors.text }}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleTheme} color={colors.primary} />
        </View>

        <Text style={[styles.label, { color: colors.primary, marginTop: 30 }]}>Account</Text>
        <Item icon="cart-outline" title="Cart" nav={nav} to="Cart" colors={colors} />
        <Item icon="heart-outline" title="Wishlist" nav={nav} to="Wishlist" colors={colors} />
        <Item icon="package-variant" title="Orders" nav={nav} to="Orders" colors={colors} />

        {isLoggedIn ?
            <Item icon="logout" title="Sign Out" onPress={onLogout} colors={colors} danger /> :
            <Item icon="login" title="Sign In" nav={nav} to="Auth" colors={colors} />
        }

        <View style={{ marginTop: 40, alignItems: 'center', opacity: 0.5 }}>
            <Text style={{ fontSize: 10, color: colors.text }}>Version: 1.0.2 (OTA Live Sync OK)</Text>
            <TouchableOpacity onPress={async () => {
                try {
                    const updateCheck = await Updates.checkForUpdateAsync();
                    if (updateCheck.isAvailable) {
                        Alert.alert("Update Found", "Naya update mil gaya hai! Kya aap abhi install karna chahte hain?", [
                            { text: "Baad me", style: "cancel" },
                            { text: "Haan", onPress: async () => { await Updates.fetchUpdateAsync(); await Updates.reloadAsync(); } }
                        ]);
                    } else {
                        Alert.alert("Aroma Luxe", "Aap pehle se hi latest version par hain! ✨");
                    }
                } catch (e) {
                    Alert.alert("Update Error", `Check failed: ${e.message}`);
                }
            }}>
                <Text style={{ fontSize: 10, color: colors.primary, marginTop: 5, textDecorationLine: 'underline' }}>Check for Updates</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const Item = ({ icon, title, nav, to, onPress, colors, danger }) => (
    <TouchableOpacity style={styles.item} onPress={onPress || (() => nav.navigate(to))}>
        <Surface style={styles.iconBox} elevation={0}><IconButton icon={icon} iconColor={danger ? '#f44' : colors.text} /></Surface>
        <Text style={[styles.itemText, { color: danger ? '#f44' : colors.text }]}>{title}</Text>
        <IconButton icon="chevron-right" size={20} iconColor="#aaa" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: { flex: 1 },
    hero: { alignItems: 'center', padding: 40 },
    name: { fontSize: 24, fontWeight: '900', marginTop: 15 },
    edit: { color: '#888', marginTop: 5, textDecorationLine: 'underline' },
    input: { width: '80%', marginVertical: 15 },
    settings: { padding: 25 },
    label: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
    item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
    iconBox: { width: 44, height: 44, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    itemText: { flex: 1, marginLeft: 15, fontSize: 16, fontWeight: 'bold' }
});

export default ProfileScreen;
