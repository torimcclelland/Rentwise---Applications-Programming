import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/PrimaryButtonStyles';

const PrimaryButton = ({
  title,
  onPress,
  iconName,
  iconColor = '#fff',
  backgroundColor = '#034974',
  textColor = '#fff',
  size = 'medium',
  fontWeight = 600,
  fontSize = 16,
  disabled = false,
  customStyle,
}) => {
  const sizeStyles = styles[size];

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        sizeStyles,
        { backgroundColor },
        disabled && styles.disabled,
        customStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.content}>
        {iconName && (
          <Icon name={iconName} size={20} color={iconColor} style={styles.icon} />
        )}
        <Text style={[styles.text, { fontSize: fontSize, color: textColor, fontWeight: fontWeight }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

