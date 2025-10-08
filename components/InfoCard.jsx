import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/InfoCardStyle';

const InfoCard = ({ title, subtitle, image }) => {
    return (
      <View style={styles.card}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <View style={styles.textContainer}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>
    );
  };
  
  export default InfoCard;