import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton, Avatar, Badge } from 'react-native-paper';

const Header = ({ isSearch, query, onQuery, onClose, onClear, onSearch, nav, isDark, colors, cartCount = 0 }) => {
    if (isSearch) return (
        <View style={[styles.search, { borderBottomColor: isDark ? '#333' : '#eee' }]}>
            <IconButton icon="arrow-left" size={24} onPress={onClose} />
            <TextInput placeholder="Search..." value={query} onChangeText={onQuery} autoFocus style={[styles.input, { color: colors.text }]} placeholderTextColor="#888" />
            {query.length > 0 && <IconButton icon="close-circle" size={20} onPress={onClear} />}
        </View>
    );

    return (
        <View style={styles.box}>
            <IconButton icon="menu" size={28} onPress={() => nav.navigate('Recommendation')} />
            <View style={styles.actions}>
                <IconButton icon="magnify" size={28} onPress={onSearch} />
                <TouchableOpacity onPress={() => nav.navigate('Cart')}>
                    <IconButton icon="shopping-outline" size={28} iconColor={colors.text} />
                    {cartCount > 0 && <Badge style={[styles.badge, { backgroundColor: colors.primary }]} size={18}>{cartCount}</Badge>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => nav.navigate('Profile')}>
                    <IconButton icon="account-circle" size={30} iconColor={colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingHorizontal: 15, paddingBottom: 10 },
    actions: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    search: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 15, borderBottomWidth: 1, paddingBottom: 10 },
    input: { flex: 1, fontSize: 16, paddingHorizontal: 10 },
    badge: { position: 'absolute', top: 5, right: 5 }
});

export default Header;
