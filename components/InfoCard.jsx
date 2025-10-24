import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import styles from '../styles/InfoCardStyle';
import { useTheme } from '../ThemeContext';

const InfoCard = ({ title, subtitle, image }) => {

  const theme = useTheme()

  return (
    <View style={[styles.card]}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <View style={styles.textContainer}>
        {title && <Text style={styles.title}>{title}</Text>}
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
};

export default InfoCard;
