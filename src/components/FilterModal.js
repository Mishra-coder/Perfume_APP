import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions
} from 'react-native';
import { Text, IconButton, Chip, Divider } from 'react-native-paper';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const PRICE_FILTER_OPTIONS = [
  { label: 'Under ₹7,000', min: 0, max: 7000 },
  { label: '₹7,000 - ₹10,000', min: 7000, max: 10000 },
  { label: '₹10,000 - ₹15,000', min: 10000, max: 15000 },
  { label: 'Above ₹15,000', min: 15000, max: 999999 }
];

const CATEGORY_OPTIONS = ['Oriental', 'Floral', 'Fresh', 'Woody', 'Aromatic'];
const OCCASION_OPTIONS = ['Party', 'Date', 'Festival', 'Office', 'College', 'Gym'];
const STRENGTH_OPTIONS = [
  { label: 'Light (1-2)', value: 'light' },
  { label: 'Medium (3)', value: 'medium' },
  { label: 'Strong (4-5)', value: 'strong' }
];
const PROFILE_OPTIONS = ['Fresh', 'Sweet', 'Mild', 'Strong'];
const SORTING_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A to Z', value: 'name' }
];

const FilterModal = ({ visible, onDismiss, filters, onApplyFilters, isDarkMode, themeColors }) => {
  const [activeFilters, setActiveFilters] = useState(filters);

  useEffect(() => {
    setActiveFilters(filters);
  }, [filters]);

  const updatePriceFilter = (range) => {
    setActiveFilters(current => ({
      ...current,
      priceRange: current.priceRange?.min === range.min && current.priceRange?.max === range.max
        ? null
        : range
    }));
  };

  const updateCategoryFilter = (category) => {
    setActiveFilters(current => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter(c => c !== category)
        : [...current.categories, category]
    }));
  };

  const updateOccasionFilter = (occasion) => {
    const occasionValue = occasion.toLowerCase();
    setActiveFilters(current => ({
      ...current,
      occasions: current.occasions.includes(occasionValue)
        ? current.occasions.filter(o => o !== occasionValue)
        : [...current.occasions, occasionValue]
    }));
  };

  const updateStrengthFilter = (strength) => {
    setActiveFilters(current => ({
      ...current,
      strengths: current.strengths.includes(strength)
        ? current.strengths.filter(s => s !== strength)
        : [...current.strengths, strength]
    }));
  };

  const updateProfileFilter = (profile) => {
    const profileValue = profile.toLowerCase();
    setActiveFilters(current => ({
      ...current,
      profiles: current.profiles.includes(profileValue)
        ? current.profiles.filter(p => p !== profileValue)
        : [...current.profiles, profileValue]
    }));
  };

  const updateSortOption = (sortValue) => {
    setActiveFilters(current => ({ ...current, sortBy: sortValue }));
  };

  const resetAllFilters = () => {
    setActiveFilters({
      priceRange: null,
      categories: [],
      occasions: [],
      strengths: [],
      profiles: [],
      sortBy: 'default'
    });
  };

  const applyAndClose = () => {
    onApplyFilters(activeFilters);
    onDismiss();
  };

  const getFilterCount = () => {
    let count = 0;
    if (activeFilters.priceRange) count++;
    count += activeFilters.categories.length;
    count += activeFilters.occasions.length;
    count += activeFilters.strengths.length;
    count += activeFilters.profiles.length;
    if (activeFilters.sortBy !== 'default') count++;
    return count;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onDismiss}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onDismiss}
        />

        <View style={[
          styles.contentContainer,
          { backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff' }
        ]}>
          <View style={[
            styles.header,
            { borderBottomColor: isDarkMode ? '#333333' : '#f0f0f0' }
          ]}>
            <Text style={[styles.title, { color: themeColors.text }]}>
              Filters
            </Text>
            <IconButton
              icon="close"
              size={24}
              iconColor={themeColors.text}
              onPress={onDismiss}
            />
          </View>

          <ScrollView
            style={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <FilterSection
              title="Price Range"
              items={PRICE_FILTER_OPTIONS}
              isObject={true}
              isSelected={(item) => activeFilters.priceRange?.min === item.min}
              onSelect={updatePriceFilter}
              themeColors={themeColors}
              isDarkMode={isDarkMode}
            />

            <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }} />

            <FilterSection
              title="Category"
              items={CATEGORY_OPTIONS}
              isSelected={(item) => activeFilters.categories.includes(item)}
              onSelect={updateCategoryFilter}
              themeColors={themeColors}
              isDarkMode={isDarkMode}
            />

            <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }} />

            <FilterSection
              title="Occasion"
              items={OCCASION_OPTIONS}
              isSelected={(item) => activeFilters.occasions.includes(item.toLowerCase())}
              onSelect={updateOccasionFilter}
              themeColors={themeColors}
              isDarkMode={isDarkMode}
            />

            <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }} />

            <FilterSection
              title="Fragrance Strength"
              items={STRENGTH_OPTIONS}
              isObject={true}
              isSelected={(item) => activeFilters.strengths.includes(item.value)}
              onSelect={(item) => updateStrengthFilter(item.value)}
              themeColors={themeColors}
              isDarkMode={isDarkMode}
            />

            <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }} />

            <FilterSection
              title="Scent Profile"
              items={PROFILE_OPTIONS}
              isSelected={(item) => activeFilters.profiles.includes(item.toLowerCase())}
              onSelect={updateProfileFilter}
              themeColors={themeColors}
              isDarkMode={isDarkMode}
            />

            <Divider style={{ backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }} />

            <FilterSection
              title="Sort By"
              items={SORTING_OPTIONS}
              isObject={true}
              isSelected={(item) => activeFilters.sortBy === item.value}
              onSelect={(item) => updateSortOption(item.value)}
              themeColors={themeColors}
              isDarkMode={isDarkMode}
            />
          </ScrollView>

          <View style={[
            styles.footer,
            { borderTopColor: isDarkMode ? '#333333' : '#f0f0f0' }
          ]}>
            <TouchableOpacity
              style={[
                styles.footerButton,
                { backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5' }
              ]}
              onPress={resetAllFilters}
            >
              <Text style={[styles.buttonText, { color: themeColors.text }]}>
                Clear All
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.footerButton,
                styles.applyButton,
                { backgroundColor: themeColors.primary }
              ]}
              onPress={applyAndClose}
            >
              <Text style={[
                styles.buttonText,
                { color: isDarkMode ? '#000000' : '#ffffff' }
              ]}>
                Apply {getFilterCount() > 0 && `(${getFilterCount()})`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const FilterSection = ({ title, items, isSelected, onSelect, themeColors, isDarkMode, isObject = false }) => (
  <View style={styles.sectionContainer}>
    <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
      {title}
    </Text>
    <View style={styles.chipsRow}>
      {items.map((item, index) => {
        const itemLabel = isObject ? item.label : item;
        const selected = isSelected(item);

        return (
          <Chip
            key={index}
            selected={selected}
            onPress={() => onSelect(item)}
            style={[
              styles.chip,
              selected && { backgroundColor: themeColors.primary }
            ]}
            textStyle={{
              color: selected ? (isDarkMode ? '#000000' : '#ffffff') : themeColors.text
            }}
          >
            {itemLabel}
          </Chip>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  contentContainer: {
    maxHeight: SCREEN_HEIGHT * 0.85,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    borderBottomWidth: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  scrollContainer: {
    paddingBottom: 20
  },
  sectionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  chip: {
    marginRight: 8,
    marginBottom: 8
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    gap: 10
  },
  footerButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  applyButton: {
    flex: 1.5
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default FilterModal;
