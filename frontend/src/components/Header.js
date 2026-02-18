import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { IconButton, Avatar, Badge } from 'react-native-paper';

const Header = ({ isSearch, query, onQuery, onClose, onClear, onSearch, nav, isDark, colors, cartCount = 0 }) => {
    if (isSearch) return (
        <View style={[
            styles.search,
            {
                borderBottomColor: isDark ? '#2a2a2a' : '#e5e5e5',
                backgroundColor: colors.background,
            }
        ]}>
            <IconButton icon="arrow-left" size={24} onPress={onClose} iconColor={colors.text} />
            <TextInput
                placeholder="Search perfumes..."
                value={query}
                onChangeText={onQuery}
                autoFocus
                style={[styles.input, { color: colors.text }]}
                placeholderTextColor={isDark ? '#666' : '#999'}
            />
            {query.length > 0 && <IconButton icon="close-circle" size={20} onPress={onClear} iconColor={colors.textSecondary} />}
        </View>
    );

    return (
        <View style={[
            styles.box,
            {
                backgroundColor: colors.background,
                ...Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDark ? 0.3 : 0.08,
                        shadowRadius: 4,
                    },
                    android: {
                        elevation: 3,
                    },
                    web: {
                        boxShadow: isDark ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.08)',
                    }
                })
            }
        ]}>
            <IconButton
                icon="menu"
                size={26}
                onPress={() => nav.navigate('Recommendation')}
                iconColor={colors.text}
            />
            <View style={styles.actions}>
                <IconButton
                    icon="magnify"
                    size={26}
                    onPress={onSearch}
                    iconColor={colors.text}
                />
                <TouchableOpacity
                    onPress={() => nav.navigate('Cart')}
                    style={styles.cartButton}
                    activeOpacity={0.7}
                >
                    <IconButton
                        icon="shopping-outline"
                        size={26}
                        iconColor={colors.text}
                    />
                    {cartCount > 0 && (
                        <Badge
                            style={[
                                styles.badge,
                                {
                                    backgroundColor: colors.primary,
                                    ...Platform.select({
                                        ios: {
                                            shadowColor: colors.primary,
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.4,
                                            shadowRadius: 3,
                                        },
                                        android: {
                                            elevation: 4,
                                        }
                                    })
                                }
                            ]}
                            size={18}
                        >
                            {cartCount > 99 ? '99+' : cartCount}
                        </Badge>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => nav.navigate('Profile')}
                    activeOpacity={0.7}
                >
                    <IconButton
                        icon="account-circle"
                        size={28}
                        iconColor={colors.text}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderBottomWidth: 0,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    cartButton: {
        position: 'relative',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        paddingBottom: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingHorizontal: 12,
        fontWeight: '500',
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 6,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        fontSize: 10,
        fontWeight: 'bold',
    }
});

export default Header;
