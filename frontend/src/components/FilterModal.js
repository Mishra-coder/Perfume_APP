import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Text, IconButton, Chip, Divider } from 'react-native-paper';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const OPTIONS = {
  price: [
    { label: 'Under ₹7,000', min: 0, max: 7000 },
    { label: '₹7k - ₹10k', min: 7000, max: 10000 },
    { label: '₹10k - ₹15k', min: 10000, max: 15000 },
    { label: 'Above ₹15k', min: 15000, max: 999999 }
  ],
  cats: ['Oriental', 'Floral', 'Fresh', 'Woody', 'Aromatic'],
  occs: ['Party', 'Date', 'Festival', 'Office', 'College', 'Gym'],
  sorts: [
    { label: 'Default', val: 'default' },
    { label: 'Price Low-High', val: 'price-asc' },
    { label: 'Price High-Low', val: 'price-desc' },
    { label: 'Name A-Z', val: 'name' }
  ]
};

const FilterModal = ({ visible, onDismiss, filters, onApply, isDark, colors }) => {
  const [active, setActive] = useState(filters);

  useEffect(() => setActive(filters), [filters]);

  const toggle = (key, val) => {
    setActive(prev => {
      const list = prev[key];
      const exists = list.includes(val);
      return { ...prev, [key]: exists ? list.filter(i => i !== val) : [...list, val] };
    });
  };

  const apply = () => { onApply(active); onDismiss(); };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.back} activeOpacity={1} onPress={onDismiss} />
        <View style={[styles.sheet, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
          <View style={[styles.header, { borderBottomColor: isDark ? '#333' : '#eee' }]}>
            <Text style={[styles.title, { color: colors.text }]}>Filters</Text>
            <IconButton icon="close" size={24} onPress={onDismiss} />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Section title="Price Range" items={OPTIONS.price} sel={(i) => active.priceRange?.min === i.min} onPick={(i) => setActive({ ...active, priceRange: active.priceRange?.min === i.min ? null : i })} isDark={isDark} colors={colors} />
            <Section title="Categories" items={OPTIONS.cats} sel={(i) => active.categories.includes(i)} onPick={(i) => toggle('categories', i)} isDark={isDark} colors={colors} />
            <Section title="Occasions" items={OPTIONS.occs} sel={(i) => active.occasions.includes(i.toLowerCase())} onPick={(i) => toggle('occasions', i.toLowerCase())} isDark={isDark} colors={colors} />
            <Section title="Sort By" items={OPTIONS.sorts} sel={(i) => active.sortBy === i.val} onPick={(i) => setActive({ ...active, sortBy: i.val })} isDark={isDark} colors={colors} />
          </ScrollView>
          <View style={[styles.footer, { borderTopColor: isDark ? '#333' : '#eee' }]}>
            <Button label="Reset" onPress={() => setActive({ priceRange: null, categories: [], occasions: [], strengths: [], profiles: [], sortBy: 'default' })} isDark={isDark} colors={colors} />
            <Button label="Apply" onPress={apply} primary colors={colors} isDark={isDark} flex={1.5} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Section = ({ title, items, sel, onPick, isDark, colors }) => (
  <View style={styles.sec}>
    <Text style={[styles.secTitle, { color: colors.text }]}>{title}</Text>
    <View style={styles.grid}>
      {items.map((item, idx) => {
        const selected = sel(item);
        const label = item.label || item;
        return (
          <Chip key={idx} selected={selected} onPress={() => onPick(item)} style={[styles.chip, selected && { backgroundColor: colors.primary }]} textStyle={{ color: selected ? (isDark ? '#000' : '#fff') : colors.text }}>{label}</Chip>
        );
      })}
    </View>
  </View>
);

const Button = ({ label, onPress, primary, colors, isDark, flex = 1 }) => (
  <TouchableOpacity onPress={onPress} style={[styles.btn, { flex, backgroundColor: primary ? colors.primary : (isDark ? '#2a2a2a' : '#f5f5f5') }]}>
    <Text style={{ fontWeight: 'bold', color: primary ? (isDark ? '#000' : '#fff') : colors.text }}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  back: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: { maxHeight: SCREEN_HEIGHT * 0.8, borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1 },
  title: { fontSize: 24, fontWeight: 'bold' },
  sec: { padding: 20 },
  secTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  footer: { flexDirection: 'row', padding: 20, borderTopWidth: 1, gap: 10 },
  btn: { padding: 15, borderRadius: 12, alignItems: 'center' }
});

export default FilterModal;
