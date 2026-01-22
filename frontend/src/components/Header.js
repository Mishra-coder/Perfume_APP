import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, Avatar } from 'react-native-paper';

const Header = ({
    isSearchActive,
    searchQuery,
    onSearchChange,
    onCloseSearch,
    onClearSearch,
    onSearchPress,
    onFilterPress,
    navigation,
    filterCount = 0,
    cartCount = 0,
    wishlistCount = 0,
    ordersCount = 0,
    isDarkMode,
    colors
}) => {
    if (isSearchActive) {
        return (
            <View style={[styles.searchHeader, { borderBottomColor: isDarkMode ? '#333333' : '#f0f0f0' }]}>
                <IconButton icon="arrow-left" size={24} iconColor={colors.text} onPress={onCloseSearch} />
                <TextInput
                    placeholder="Search luxury scents..."
                    value={searchQuery}
                    onChangeText={onSearchChange}
                    autoFocus
                    style={[styles.searchInput, { color: colors.text }]}
                    placeholderTextColor={isDarkMode ? "#666666" : "#aaaaaa"}
                />
                {searchQuery.length > 0 && (
                    <IconButton icon="close-circle" size={20} iconColor={colors.primary} onPress={onClearSearch} />
                )}
            </View>
        );
    }

    return (
        <View style={styles.standardHeader}>
            <IconButton
                icon="menu"
                size={28}
                iconColor={colors.text}
                onPress={() => navigation.navigate('Recommendation')}
            />

            <View style={styles.headerActions}>
                <IconButton
                    icon="magnify"
                    size={28}
                    iconColor={colors.text}
                    onPress={onSearchPress}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.profileButton}
                >
                    <Avatar.Icon
                        size={32}
                        icon="account"
                        backgroundColor={isDarkMode ? '#2a2a2a' : '#f0f0f0'}
                        color={colors.text}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const BadgeIcon = ({ icon, count, onPress, themeColors, isDarkMode }) => (
    <TouchableOpacity onPress={onPress} style={styles.badgeWrapper} activeOpacity={0.7}>
        <IconButton
            icon={icon}
            size={24}
            iconColor={themeColors.text}
            style={{ margin: 0 }}
        />
        {count > 0 && (
            <Badge
                style={[
                    styles.badge,
                    {
                        backgroundColor: themeColors.primary,
                        color: isDarkMode ? '#000000' : '#ffffff',
                        borderWidth: 1.5,
                        borderColor: isDarkMode ? '#000000' : '#ffffff'
                    }
                ]}
                size={16}
            >
                {count}
            </Badge>
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    standardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    searchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    profileButton: {
        marginLeft: 8,
        borderWidth: 1,
        borderColor: 'transparent', // Placeholder for potential border
        borderRadius: 20,
    }
});

export default Header;
