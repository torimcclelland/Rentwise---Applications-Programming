import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles/DashboardStyle';

const DashboardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Welcome to Rentwise</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Rentals</Text>
        <Text style={styles.cardSubtitle}>View and manage your active listings</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Go to Rentals</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Summary</Text>
        <Text style={styles.cardSubtitle}>Track incoming and outgoing payments</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View Payments</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Messages</Text>
        <Text style={styles.cardSubtitle}>Connect with renters and landlords</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Open Inbox</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
