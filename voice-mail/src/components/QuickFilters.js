import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '@constants/colors';

const FILTERS = [
  { label: 'Heute',   filters: { timeFilter: 'heute' } },
  { label: 'Gestern', filters: { timeFilter: 'gestern' } },
  { label: 'Alle',    filters: {} },
];

export default function QuickFilters({ onFilter, disabled }) {
  return (
    <View style={styles.row}>
      {FILTERS.map(({ label, filters }) => (
        <TouchableOpacity
          key={label}
          style={[styles.chip, disabled && styles.chipDisabled]}
          onPress={() => !disabled && onFilter(filters)}
          activeOpacity={0.7}
        >
          <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  chipDisabled: {
    borderColor: COLORS.subtext,
    opacity: 0.4,
  },
  label: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  labelDisabled: {
    color: COLORS.subtext,
  },
});
