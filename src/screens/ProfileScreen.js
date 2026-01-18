import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, Avatar, Text, Surface, IconButton, Switch, useTheme as usePaperTheme } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
    const { user, setUserProfile, logout } = useUser();
    const { isDarkMode, toggleTheme } = useTheme();
    const { colors } = usePaperTheme();

    const [name, setName] = useState(user.name);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdate = () => {
        setUserProfile(name);
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        navigation.navigate('Main');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background, borderBottomColor: isDarkMode ? '#222222' : '#f0f0f0' }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Account Settings" titleStyle={[styles.appbarTitle, { color: colors.text }]} />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={[styles.hero, { backgroundColor: isDarkMode ? '#121212' : '#fafafa' }]}>
                    <Avatar.Icon
                        size={100}
                        icon="account"
                        style={[styles.avatar, { backgroundColor: colors.primary }]}
                        color={isDarkMode ? '#000000' : '#ffffff'}
                    />

                    {isEditing ? (
                        <View style={styles.editForm}>
                            <TextInput
                                label="Update Display Name"
                                value={name}
                                onChangeText={setName}
                                mode="outlined"
                                style={[styles.input, { backgroundColor: colors.background }]}
                                activeOutlineColor={colors.primary}
                                textColor={colors.text}
                            />
                            <Button
                                mode="contained"
                                onPress={handleUpdate}
                                style={[styles.updateBtn, { backgroundColor: colors.primary }]}
                                labelStyle={[styles.updateBtnLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                            >
                                Confirm Update
                            </Button>
                        </View>
                    ) : (
                        <View style={styles.info}>
                            <Text style={[styles.name, { color: colors.text }]}>
                                {user.name || "Guest Connoisseur"}
                            </Text>
                            {user.isLoggedIn && (
                                <TouchableOpacity onPress={() => setIsEditing(true)} activeOpacity={0.7}>
                                    <Text style={styles.editLink}>Modify Profile Details</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>

                <View style={styles.menu}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Preferences</Text>
                    <View style={styles.row}>
                        <View style={styles.labelGroup}>
                            <IconButton icon={isDarkMode ? "weather-night" : "weather-sunny"} iconColor={colors.primary} size={24} />
                            <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
                        </View>
                        <Switch value={isDarkMode} onValueChange={toggleTheme} color={colors.primary} />
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.primary, marginTop: 25 }]}>Experience</Text>

                    <MenuItem
                        icon="package-variant-closed"
                        title="Order History"
                        subtitle="Review your past fragrance purchases"
                        onPress={() => navigation.navigate('Orders')}
                    />

                    <MenuItem
                        icon="map-marker-outline"
                        title="Saved Addresses"
                        subtitle="Manage your delivery destinations"
                    />

                    {user.isLoggedIn ? (
                        <MenuItem
                            icon="logout"
                            title="Sign Out"
                            subtitle="Securely sign out of your account"
                            isDestructive
                            onPress={handleLogout}
                        />
                    ) : (
                        <MenuItem
                            icon="login"
                            title="SignIn / Register"
                            subtitle="Join the Aroma Luxe membership"
                            isPrimary
                            onPress={() => navigation.navigate('Auth')}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const MenuItem = ({ icon, title, subtitle, onPress, isDestructive, isPrimary }) => {
    const { colors } = usePaperTheme();
    const { isDarkMode } = useTheme();

    const bgColor = isDarkMode ? '#1a1a1a' : (isDestructive ? '#fff0f0' : isPrimary ? '#f0f7ff' : '#f5f5f5');
    const fgColor = isDestructive ? '#d32f2f' : (isPrimary ? '#007bff' : (isDarkMode ? colors.primary : '#000000'));

    return (
        <TouchableOpacity style={[styles.itemWrapper, { borderBottomColor: isDarkMode ? '#222222' : '#f9f9f9' }]} onPress={onPress}>
            <Surface style={[styles.itemIcon, { backgroundColor: bgColor }]} elevation={0}>
                <IconButton icon={icon} size={24} iconColor={fgColor} />
            </Surface>
            <View style={styles.itemContent}>
                <Text style={[styles.itemTitle, { color: isDestructive ? '#d32f2f' : isPrimary ? '#007bff' : colors.text }]}>{title}</Text>
                <Text style={styles.itemSubtitle}>{subtitle}</Text>
            </View>
            <IconButton icon="chevron-right" size={20} iconColor={isDarkMode ? '#444444' : '#eeeeee'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    appbar: {
        borderBottomWidth: 1,
    },
    appbarTitle: {
        fontWeight: 'bold',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    hero: {
        alignItems: 'center',
        paddingVertical: 50,
    },
    avatar: {
        elevation: 10,
    },
    editForm: {
        width: '80%',
        marginTop: 20,
    },
    input: {
        marginBottom: 10,
    },
    updateBtn: {
        borderRadius: 12,
    },
    updateBtnLabel: {
        fontWeight: 'bold',
    },
    info: {
        alignItems: 'center',
        marginTop: 15,
    },
    name: {
        fontSize: 26,
        fontWeight: '900',
    },
    editLink: {
        color: '#888888',
        marginTop: 5,
        textDecorationLine: 'underline',
        fontSize: 13,
    },
    menu: {
        paddingHorizontal: 25,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginBottom: 5,
    },
    labelGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
    },
    itemIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContent: {
        flex: 1,
        marginLeft: 15,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemSubtitle: {
        fontSize: 12,
        color: '#888888',
        marginTop: 2,
    },
});

export default ProfileScreen;
