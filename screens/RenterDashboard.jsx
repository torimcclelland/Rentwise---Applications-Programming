import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles/DashboardStyle';
import PrimaryButton from '../components/PrimaryButton';

const DashboardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Rentwise</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Rentals</Text>
        <Text style={styles.cardSubtitle}>View and manage your active listings</Text>
        <PrimaryButton title="See my rentals"></PrimaryButton>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Summary</Text>
        <Text style={styles.cardSubtitle}>Track incoming and outgoing payments</Text>
        <PrimaryButton title="See my payments"></PrimaryButton>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Messages</Text>
        <Text style={styles.cardSubtitle}>Connect with renters and landlords</Text>
        <PrimaryButton title="See my messages"></PrimaryButton>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
