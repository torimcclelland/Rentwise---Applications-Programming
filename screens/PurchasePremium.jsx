import React, { useState } from 'react';
import { View, Text } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/PurchasePremiumStyle';
import { GlobalValues } from '../GlobalValues';
import { updateUser } from '../database_calls/user/UpdateUser';

const PurchasePremium = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const updatedUser = { ...GlobalValues.currentUser, isPremUser: true };
      const result = await updateUser(updatedUser);

      if (result.success) {
        GlobalValues.currentUser = result.resultData;
        alert('🎉 Premium activated!');
        navigation.goBack();
      } else {
        alert(`Error upgrading: ${result.message}`);
      }
    } catch (err) {
      alert('Something went wrong upgrading.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      const updatedUser = { ...GlobalValues.currentUser, isPremUser: false };
      const result = await updateUser(updatedUser);

      if (result.success) {
        GlobalValues.currentUser = result.resultData;
        alert('You have unsubscribed from Premium.');
        navigation.goBack();
      } else {
        alert(`Error unsubscribing: ${result.message}`);
      }
    } catch (err) {
      alert('Something went wrong unsubscribing.');
    } finally {
      setLoading(false);
    }
  };

  const isPremUser = GlobalValues.currentUser.isPremUser;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isPremUser ? 'Manage Premium Subscription' : 'Upgrade to Premium'}
      </Text>
      <Text style={styles.subtitle}>
        {isPremUser
          ? 'You are currently a Premium Landlord. You can unsubscribe anytime.'
          : 'Unlock powerful tools to manage your properties, connect with renters, and boost visibility.'}
      </Text>

      {!isPremUser ? (
        <View>
          <Text style={styles.benefit}>
            See how many views your profile gets
          </Text>
          <Text style={styles.benefit}>
            Get your properties promoted to more renters
          </Text>
          <Text style={styles.benefit}>
            Premium badge to stand out in searches
          </Text>

          <PrimaryButton
            title="Upgrade for $12.99/month"
            onPress={handlePurchase}
            style={styles.button}
            disabled={loading}
          />
        </View>
      ) : (
        <PrimaryButton
          title="Unsubscribe from Premium"
          onPress={handleUnsubscribe}
          style={styles.button}
          disabled={loading}
        />
      )}
    </View>
  );
};

export default PurchasePremium;
