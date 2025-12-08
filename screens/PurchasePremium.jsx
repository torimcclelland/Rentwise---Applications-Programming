import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { styles as globalStyles } from '../styles/UserProfileStyle';
import {styles} from '../styles/PurchasePremiumStyle';
import { User } from '../models/User';

const PurchasePremium = () => {
  const navigation = useNavigation();

  const handlePurchase = () => {
    alert('🎉 Premium activated!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upgrade to Premium</Text>
      <Text style={styles.subtitle}>
        Unlock powerful tools to manage your properties, connect with renters, and boost visibility.
      </Text>

      <View style={styles.benefits}>
        <Text style={styles.benefit}>✅ View detailed rating scores</Text>
        <Text style={styles.benefit}>✅ See total views on properties</Text>
        <Text style={styles.benefit}>✅ Premium badge on your profile</Text>
      </View>

      <PrimaryButton
        title="Upgrade for $12.99/month"
        onPress={handlePurchase}
        style={styles.button}
      />
    </View>
  );
};

export default PurchasePremium;
