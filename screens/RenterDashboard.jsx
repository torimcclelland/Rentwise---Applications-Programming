import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from '../styles/DashboardStyle';
import PrimaryButton from '../components/PrimaryButton';
import InfoCard from '../components/InfoCard';
import StatsCard from '../components/StatsCard';
import CustomDivider from '../components/divider';
import { GlobalValues } from '../GlobalValues';
import BottomNavBar from '../components/BottomNavBar';
import { useTheme } from '../ThemeContext';

const DashboardScreen = () => {
  const theme = useTheme();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[{ flex: 1 }, theme.dashboardContainer]}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Greeting */}
          <Text style={[styles.header, theme.textColor]}>
            Hello {GlobalValues.currentUser.firstName} 👋
          </Text>
          <Text style={[styles.subheader, theme.textColor]}>
            Here’s your rent summary at a glance.
          </Text>

          {/* Stats Overview */}
          <View style={styles.statsRow}>
            <StatsCard label="Open Fixit Tickets" value="2" />
            <StatsCard label="Nearby Available Properties" value="3" />
            <StatsCard label="Payments Due" value="$985" />
          </View>

          <CustomDivider />

          {/* Lease Summary */}
          <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Lease Summary</Text>
          <InfoCard
            title="3013 Cherry Street"
            subtitle="$985/month • Ends Jan 31, 2026"
          />
          <View style={styles.buttonRow}>
            <PrimaryButton title="View History" />
            <PrimaryButton title="View Current" />
          </View>

          <CustomDivider />

          {/* Recent Activity */}
          <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Payment Summary</Text>

          <InfoCard
            title="Last Payment"
            subtitle="✅ $985 received on Sept. 30"
          />
          <PrimaryButton title="Make Payment" />

          <CustomDivider />

          {/* FixIt Requests */}
          <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Fix-it Requests</Text>

          <InfoCard
            title="Leaky Faucet"
            subtitle="🟡 Pending • Reported Oct. 4"
          />
          <TouchableOpacity style={styles.addRequestButton}>
            <PrimaryButton title="Make New Request" />
          </TouchableOpacity>

          <CustomDivider />

          {/* Quick Access Cards */}
          <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Quick Access</Text>

          {[
            { title: 'Your Rentals', subtitle: 'Manage active listings', nav: 'Rentals' },
            { title: 'Payment Summary', subtitle: 'Track transactions', nav: 'Payments' },
            { title: 'Messages', subtitle: 'Connect with landlords', nav: 'Messages' },
          ].map((card, index) => (
            <TouchableOpacity key={index} onPress={() => console.log(`Navigate to ${card.nav}`)}>
              <View style={[styles.card, theme.textField]}>
                <Text style={[styles.cardTitle, theme.textColor]}>{card.title}</Text>
                <Text style={[styles.cardSubtitle, theme.textColor]}>{card.subtitle}</Text>
                <PrimaryButton title={`Go to ${card.nav}`} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <BottomNavBar selectedTab="home" />
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
