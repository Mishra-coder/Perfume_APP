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

    const UserHero = () => (
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
                        label="Update Name"
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
                        Save Changes
                    </Button>
                </View>
            ) : (
                <View style={styles.info}>
                    <Text style={[styles.name, { color: colors.text }]}>
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

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Appbar.Header style={[styles.appbar, { backgroundColor: colors.background }]}>
                <Appbar.BackAction onPress={() => navigation.goBack()} color={colors.text} />
                <Appbar.Content title="Profile" titleStyle={[styles.appbarTitle, { color: colors.text }]} />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <UserHero />

                <View style={styles.menu}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Settings</Text>

                    <View style={styles.row}>
                        <View style={styles.labelGroup}>
                            <IconButton icon={isDarkMode ? "weather-night" : "weather-sunny"} iconColor={colors.primary} size={24} />
                            <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
                        </View>
                        <Switch value={isDarkMode} onValueChange={toggleTheme} color={colors.primary} />
                    </View>

                    <Text style={[styles.sectionTitle, { color: colors.primary, marginTop: 25 }]}>More</Text>

                    <MenuItem
                        icon="heart-outline"
                        title="My Wishlist"
                        subtitle="View your saved fragrances"
                        onPress={() => navigation.navigate('Wishlist')}
                    />

                    <MenuItem
                        icon="package-variant-closed"
                        title="My Orders"
                        subtitle="Check your order status"
                        onPress={() => navigation.navigate('Orders')}
                    />

                    {user.isLoggedIn ? (
                        <MenuItem
                            icon="logout"
                            title="Sign Out"
                            subtitle="Logout from your account"
                            isDestructive
                            onPress={handleLogout}
                        />
                    ) : (
                        <MenuItem
                            icon="login"
                            title="Sign In"
                            subtitle="Log in to your account"
                            onPress={() => navigation.navigate('Auth')}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const MenuItem = ({ icon, title, subtitle, onPress, isDestructive }) => {
    const { colors } = usePaperTheme();
    const { isDarkMode } = useTheme();

    const iconBg = isDarkMode ? '#1a1a1a' : (isDestructive ? '#fff0f0' : '#f5f5f5');
    const iconColor = isDestructive ? '#d32f2f' : (isDarkMode ? colors.primary : '#000000');

    return (
        <TouchableOpacity style={[styles.itemWrapper, { borderBottomColor: isDarkMode ? '#222222' : '#f9f9f9' }]} onPress={onPress}>
            <Surface style={[styles.itemIcon, { backgroundColor: iconBg }]} elevation={0}>
                <IconButton icon={icon} size={24} iconColor={iconColor} />
            </Surface>
            <View style={styles.itemContent}>
                <Text style={[styles.itemTitle, { color: isDestructive ? '#d32f2f' : colors.text }]}>{title}</Text>
                <Text style={styles.itemSubtitle}>{subtitle}</Text>
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
        borderBottomWidth: 0
    },
    appbarTitle: {
        fontWeight: 'bold'
    },
    scrollContent: {
        paddingBottom: 40
    },
    hero: {
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
    updateBtn: {
        borderRadius: 12
    },
    updateBtnLabel: {
        fontWeight: 'bold'
    },
    info: {
        alignItems: 'center',
        marginTop: 15
    },
    name: {
        fontSize: 26,
        fontWeight: '900'
    },
    editLink: {
        color: '#888888',
        marginTop: 5,
        textDecorationLine: 'underline',
        fontSize: 13
    },
    menu: {
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10
    },
    labelGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -15
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1
    },
    itemIcon: {
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContent: {
        flex: 1,
        marginLeft: 15
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    itemSubtitle: {
        fontSize: 12,
        color: '#888888',
        marginTop: 2
    }
});


export default ProfileScreen;

