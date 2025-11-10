import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../ThemeContext';

const StatsCard = ({ label, value }) => {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.textField.backgroundColor }]}>
      <Text style={[styles.value, { color: theme.textColor.color }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.textColor.color }]}>{label}</Text>
    </View>
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
    boxShadowColor: '#000',
    boxShadowOpacity: 0.08,
    boxShadowRadius: 6,
    elevation: 3,
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

