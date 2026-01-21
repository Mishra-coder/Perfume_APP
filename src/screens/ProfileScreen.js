import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, Avatar, Text, Surface, IconButton, Switch, useTheme as usePaperTheme } from 'react-native-paper';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
    const { user, setUserProfile, logout } = useUser();
    const { isDarkMode, toggleTheme } = useTheme();
    const { colors } = usePaperTheme();

    const [isEditingProfile, setIsEditingProfile] = useState(false);

    const handleLogout = () => {
        logout();
        navigation.navigate('Main');
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Profile" titleStyle={[styles.appbarTitle, { color: colors.text }]} />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <UserProfileHeader
                    user={user}
                    isEditing={isEditingProfile}
                    setIsEditing={setIsEditingProfile}
                    onUpdateProfile={setUserProfile}
                    isDarkMode={isDarkMode}
                    colors={colors}
                />

                <SettingsMenu
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    isLoggedIn={user.isLoggedIn}
                    onLogout={handleLogout}
                    navigation={navigation}
                    colors={colors}
                />
            </ScrollView>
        </View>
    );
};

const UserProfileHeader = ({ user, isEditing, setIsEditing, onUpdateProfile, isDarkMode, colors }) => {
    const [tempName, setTempName] = useState(user.name);

    const saveChanges = () => {
        onUpdateProfile(tempName);
        setIsEditing(false);
    };

    return (
        <View style={[styles.heroContainer, { backgroundColor: isDarkMode ? '#121212' : '#fafafa' }]}>
            <Avatar.Icon
                size={100}
                icon="account"
                style={[styles.avatar, { backgroundColor: colors.primary }]}
                color={isDarkMode ? '#000000' : '#ffffff'}
            />

            {isEditing ? (
                <View style={styles.editForm}>
                    <TextInput
                        label="Update Name"
                        value={tempName}
                        onChangeText={setTempName}
                        mode="outlined"
                        style={[styles.input, { backgroundColor: colors.background }]}
                        activeOutlineColor={colors.primary}
                        textColor={colors.text}
                    />
                    <Button
                        mode="contained"
                        onPress={saveChanges}
                        style={[styles.saveButton, { backgroundColor: colors.primary }]}
                        labelStyle={[styles.saveButtonLabel, { color: isDarkMode ? '#000000' : '#ffffff' }]}
                    >
                        Save Changes
                    </Button>
                </View>
            ) : (
                <View style={styles.userInfo}>
                    <Text style={[styles.userName, { color: colors.text }]}>
                        {user.name || "Guest User"}
                    </Text>
                    {user.isLoggedIn && (
                        <TouchableOpacity onPress={() => setIsEditing(true)}>
                            <Text style={styles.editLink}>Edit Profile</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const SettingsMenu = ({ isDarkMode, toggleTheme, isLoggedIn, onLogout, navigation, colors }) => (
    <View style={styles.menuContainer}>
        <Text style={[styles.sectionTitle, { color: colors.primary }]}>Settings</Text>

        <View style={styles.settingRow}>
            <View style={styles.settingLabelGroup}>
                <IconButton icon={isDarkMode ? "weather-night" : "weather-sunny"} iconColor={colors.primary} size={24} />
                <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Mode</Text>
            </View>
            <Switch value={isDarkMode} onValueChange={toggleTheme} color={colors.primary} />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.primary, marginTop: 25 }]}>More</Text>

        <MenuItem
            icon="heart-outline"
            title="My Wishlist"
            subtitle="View your saved fragrances"
            onPress={() => navigation.navigate('Wishlist')}
            colors={colors}
            isDarkMode={isDarkMode}
        />

        <MenuItem
            icon="package-variant-closed"
            title="My Orders"
            subtitle="Check your order status"
            onPress={() => navigation.navigate('Orders')}
            colors={colors}
            isDarkMode={isDarkMode}
        />

        {isLoggedIn ? (
            <MenuItem
                icon="logout"
                title="Sign Out"
                subtitle="Logout from your account"
                isDestructive
                onPress={onLogout}
                colors={colors}
                isDarkMode={isDarkMode}
            />
        ) : (
            <MenuItem
                icon="login"
                title="Sign In"
                subtitle="Log in to your account"
                onPress={() => navigation.navigate('Auth')}
                colors={colors}
                isDarkMode={isDarkMode}
            />
        )}
    </View>
);

const MenuItem = ({ icon, title, subtitle, onPress, isDestructive, colors, isDarkMode }) => {
    const iconBackgroundColor = isDarkMode ? '#1a1a1a' : (isDestructive ? '#fff0f0' : '#f5f5f5');
    const iconTintColor = isDestructive ? '#d32f2f' : (isDarkMode ? colors.primary : '#000000');

    return (
        <TouchableOpacity style={[styles.menuItemWrapper, { borderBottomColor: isDarkMode ? '#222222' : '#f9f9f9' }]} onPress={onPress}>
            <Surface style={[styles.menuItemIcon, { backgroundColor: iconBackgroundColor }]} elevation={0}>
                <IconButton icon={icon} size={24} iconColor={iconTintColor} />
            </Surface>
            <View style={styles.menuItemContent}>
                <Text style={[styles.menuItemTitle, { color: isDestructive ? '#d32f2f' : colors.text }]}>{title}</Text>
                <Text style={styles.menuItemSubtitle}>{subtitle}</Text>
            </View>
            <IconButton icon="chevron-right" size={20} iconColor={isDarkMode ? '#444444' : '#eeeeee'} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        borderBottomWidth: 0,
        elevation: 0
    },
    appbarTitle: {
        fontWeight: 'bold'
    },
    scrollContent: {
        paddingBottom: 40
    },
    heroContainer: {
        alignItems: 'center',
        paddingVertical: 50
    },
    avatar: {
        elevation: 0
    },
    editForm: {
        width: '80%',
        marginTop: 20
    },
    input: {
        marginBottom: 10
    },
    saveButton: {
        borderRadius: 12
    },
    saveButtonLabel: {
        fontWeight: 'bold'
    },
    userInfo: {
        alignItems: 'center',
        marginTop: 15
    },
    userName: {
        fontSize: 26,
        fontWeight: '900'
    },
    editLink: {
        color: '#888888',
        marginTop: 5,
        textDecorationLine: 'underline',
        fontSize: 13
    },
    menuContainer: {
        paddingHorizontal: 25,
        marginTop: 20
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginBottom: 10
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    settingLabelGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -15
    },
    settingLabel: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    menuItemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1
    },
    menuItemIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuItemContent: {
        flex: 1,
        marginLeft: 15
    },
    menuItemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    menuItemSubtitle: {
        fontSize: 12,
        color: '#888888',
        marginTop: 2
    }
});

export default ProfileScreen;
