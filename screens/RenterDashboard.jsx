import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../styles/DashboardStyle';
import PrimaryButton from '../components/PrimaryButton';
import InfoCard from '../components/InfoCard';
import CustomDivider from '../components/CustomDivider';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DashboardScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hello Eric!</Text>
      <Text style={styles.subheader}>Here’s your rent summary at a glance.</Text>

      {/* Lease Summary */}
      <InfoCard
        title="Lease Summary"
        subtitle="3013 Cherry Street\n$985/month\nEnding: January 31, 2026"
        image={null}
      />
      <View style={styles.buttonRow}>
        <PrimaryButton title="View History" />
        <PrimaryButton title="View Current" />
      </View>

      <CustomDivider />

      {/* Recent Activity */}
      <InfoCard
        title="Recent Activity"
        subtitle="✅ Payment of $985 received on Sept. 30"
        image={null}
      />
      <PrimaryButton title="Make Payment" />

      <CustomDivider />

      {/* FixIt Requests */}
      <InfoCard
        title="FixIt Requests"
        subtitle="Leaky Faucet\n🟡 Pending\nReported: Oct. 4"
        image={null}
      />
      <TouchableOpacity style={styles.addRequestButton}>
        <Icon name="add-circle-outline" size={24} color="#007AFF" />
        <Text style={styles.addRequestText}>Add New Request</Text>
      </TouchableOpacity>

      <CustomDivider />

      {/* Existing Cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Rentals</Text>
        <Text style={styles.cardSubtitle}>View and manage your active listings</Text>
        <PrimaryButton title="See my rentals" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Payment Summary</Text>
        <Text style={styles.cardSubtitle}>Track incoming and outgoing payments</Text>
        <PrimaryButton title="See my payments" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Messages</Text>
        <Text style={styles.cardSubtitle}>Connect with renters and landlords</Text>
        <PrimaryButton title="See my messages" />
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;
