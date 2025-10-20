import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../styles/DashboardStyle';
import PrimaryButton from '../components/PrimaryButton';
import InfoCard from '../components/InfoCard';
import CustomDivider from '../components/divider';
import { GlobalValues } from '../GlobalValues';
import BottomNavBar from '../components/BottomNavBar';

const DashboardScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          <Text style={styles.header}>Hello {GlobalValues.currentUser.firstName}!</Text>
          <Text style={styles.subheader}>Here’s your rent summary at a glance.</Text>

          {/* Lease Summary */}
          <InfoCard
            title="Lease Summary"
            subtitle="3013 Cherry Street $985/month Ending: January 31, 2026"
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
            subtitle="Leaky Faucet🟡 Pending Reported: Oct. 4"
            image={null}
          />
          <TouchableOpacity style={styles.addRequestButton}>
            <PrimaryButton title="Make new request" />
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

        {/* Bottom Navigation Bar */}
        <BottomNavBar selectedTab="home" />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

