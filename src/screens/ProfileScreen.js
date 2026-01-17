import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Appbar, TextInput, Button, Avatar, Text, Surface, IconButton } from 'react-native-paper';
import { useUser } from '../context/UserContext';

const ProfileScreen = ({ navigation }) => {
    const { user, setUserProfile, logout } = useUser();

    const [nameDraft, setNameDraft] = useState(user.name);
    const [isEditing, setIsEditing] = useState(false);

    const onSave = () => {
        setUserProfile(nameDraft);
        setIsEditing(false);
    };

    const onLogout = () => {
        logout();
        navigation.navigate('Main');
    };

    return (
        <View style={styles.shell}>
            <Appbar.Header style={styles.navBar}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Profile Settings" />
            </Appbar.Header>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.hero}>
                    <Avatar.Icon size={100} icon="account" style={styles.heroAvatar} color="#fff" />

                    {isEditing ? (
                        <View style={styles.editForm}>
                            <TextInput
                                label="Update Name"
                                value={nameDraft}
                                onChangeText={setNameDraft}
                                mode="outlined"
                                style={styles.nameField}
                                activeOutlineColor="#000"
                            />
                            <Button mode="contained" onPress={onSave} style={styles.saveBtn} labelStyle={styles.btnTxt}>
                                Confirm Update
                            </Button>
                        </View>
                    ) : (
                        <View style={styles.profileInfo}>
                            <Text style={styles.userName}>{user.name || "Guest Traveler"}</Text>
                            {user.isLoggedIn && (
                                <TouchableOpacity onPress={() => setIsEditing(true)}>
                                    <Text style={styles.editHint}>Edit Name</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>

                <View style={styles.menuArea}>
                    <MenuTile
                        icon="package-variant-closed"
                        title="Purchase History"
                        sub="View all your past orders"
                        onPress={() => navigation.navigate('Orders')}
                    />
                    <MenuTile
                        icon="map-marker-outline"
                        title="My Addresses"
                        sub="Manage delivery details"
                    />

                    {user.isLoggedIn ? (
                        <MenuTile
                            icon="logout"
                            title="Sign Out"
                            sub="Securely exit your account"
                            danger
                            onPress={onLogout}
                        />
                    ) : (
                        <MenuTile
                            icon="login"
                            title="Join / Sign In"
                            sub="Unlock exclusive fragrance access"
                            accent
                            onPress={() => navigation.navigate('Auth')}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

const MenuTile = ({ icon, title, sub, onPress, danger = false, accent = false }) => (
    <TouchableOpacity style={styles.tile} onPress={onPress} activeOpacity={0.7}>
        <Surface style={[styles.tileIconBox, danger && styles.bgDanger, accent && styles.bgAccent]} elevation={0}>
            <IconButton icon={icon} size={24} iconColor={danger ? '#d32f2f' : accent ? '#007bff' : '#000'} />
        </Surface>
        <View style={styles.tileContent}>
            <Text style={[styles.tileTitle, danger && styles.textDanger, accent && styles.textAccent]}>{title}</Text>
            <Text style={styles.tileSub}>{sub}</Text>
        </View>
        <IconButton icon="chevron-right" size={20} iconColor="#eee" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    shell: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navBar: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    hero: {
        alignItems: 'center',
        paddingVertical: 50,
        backgroundColor: '#fafafa',
    },
    heroAvatar: {
        backgroundColor: '#1a1a1a',
    },
    editForm: {
        width: '80%',
        marginTop: 20,
    },
    nameField: {
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    saveBtn: {
        backgroundColor: '#000',
        borderRadius: 12,
    },
    btnTxt: {
        fontWeight: 'bold',
    },
    profileInfo: {
        alignItems: 'center',
        marginTop: 15,
    },
    userName: {
        fontSize: 26,
        fontWeight: '900',
        color: '#1a1a1a',
    },
    editHint: {
        color: '#888',
        marginTop: 5,
        textDecorationLine: 'underline',
        fontSize: 13,
    },
    menuArea: {
        paddingHorizontal: 25,
        marginTop: 10,
    },
    tile: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
    },
    tileIconBox: {
        width: 50,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgDanger: {
        backgroundColor: '#fff0f0',
    },
    bgAccent: {
        backgroundColor: '#f0f7ff',
    },
    tileContent: {
        flex: 1,
        marginLeft: 15,
    },
    tileTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    tileSub: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 2,
    },
    textDanger: {
        color: '#d32f2f',
    },
    textAccent: {
        color: '#007bff',
    },
});

export default ProfileScreen;
