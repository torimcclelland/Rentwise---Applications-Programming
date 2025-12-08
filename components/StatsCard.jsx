import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const StatsCard = ({ label, value, onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.textField.backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.value, { color: theme.textColor.color }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.textColor.color }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
  },
});

export default StatsCard;
