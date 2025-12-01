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
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();

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
            <StatsCard label="Open Fixit Tickets" value="2" onPress={() => navigation.navigate('Fixit')} />
            <StatsCard label="Nearby Available Properties" value="3" onPress={() => navigation.navigate('Browse Properties')}/>
            <StatsCard label="Payments Due" value="$985" onPress={() => navigation.navigate('Payment')} />
          </View>

          <CustomDivider />

          {/* Lease Summary */}
          <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Lease Summary</Text>
          <InfoCard
            title="3013 Cherry Street"
            subtitle="$985/month • Ends Jan 31, 2026"
          />
          <View style={styles.buttonRow}>
            <PrimaryButton title="View Lease" onPress={() => navigation.navigate('Lease Info')} />
          </View>

          <CustomDivider />

          {/* Recent Activity */}
          <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Payment Summary</Text>

          <InfoCard
            title="Last Payment"
            subtitle="✅ $985 received on Sept. 30"
          />
          <PrimaryButton title="Make Payment" onPress={() => navigation.navigate('Payment')} />

          <CustomDivider />

          {/* FixIt Requests */}
          <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Fix-it Requests</Text>

          <InfoCard
            title="Leaky Faucet"
            subtitle="🟡 Pending • Reported Oct. 4"
          />
          <TouchableOpacity style={styles.addRequestButton}>
          <PrimaryButton title="New Maintenance Request" onPress={() => navigation.navigate('Fixit')} />
          </TouchableOpacity>

          <CustomDivider />

          {/* Quick Access Cards */}
          <Text style={[styles.sectionHeader, theme.sectionHeaderColor]}>Quick Access</Text>

          {[
            { title: 'Payment Summary', subtitle: 'View past transactions', nav: 'Payments' },
          ].map((card, index) => (
            <TouchableOpacity key={index} onPress={() => console.log(`Navigate to ${card.nav}`)}>
              <View style={[styles.card, theme.textField]}>
                <Text style={[styles.cardTitle, theme.textColor]}>{card.title}</Text>
                <Text style={[styles.cardSubtitle, theme.textColor]}>{card.subtitle}</Text>
                <PrimaryButton title={`Go to ${card.nav}`} onPress={() => navigation.navigate('Payment Summary')}/>
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
