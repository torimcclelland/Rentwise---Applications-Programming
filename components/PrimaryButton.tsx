import React from 'react';
import { TouchableOpacity, Text, View, GestureResponderEvent } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../styles/PrimaryButtonStyles';

interface PrimaryButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  iconName?: string;
  iconColor?: string;
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: object;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  iconName,
  iconColor = '#fff',
  backgroundColor = '#007AFF',
  textColor = '#fff',
  size = 'medium',
  disabled = false,
  style,
}) => {
  const sizeStyles = styles[size];

  return (
    <TouchableOpacity
      style={[
        styles.buttonBase,
        sizeStyles,
        { backgroundColor },
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.content}>
        {iconName && (
          <Icon name={iconName} size={20} color={iconColor} style={styles.icon} />
        )}
        <Text style={[styles.text, { color: textColor }]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
