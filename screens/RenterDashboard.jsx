import React, {useState, useEffect} from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, } from 'react-native';
import styles from '../styles/DashboardStyle';
import PrimaryButton from '../components/PrimaryButton';
import InfoCard from '../components/InfoCard';
import StatsCard from '../components/StatsCard';
import CustomDivider from '../components/divider';
import { GlobalValues } from '../GlobalValues';
import BottomNavBar from '../components/BottomNavBar';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import {getPropertyByID} from '../database_calls/property/GetPropertyByID';
import { getFixitRequestsByUserID } from '../database_calls/fixitrequests/GetFixitRequestsByUserID';
import { Property } from '../models/Property';



const DashboardScreen = () => {

  const user = GlobalValues.currentUser;
  const theme = useTheme();
  const navigation = useNavigation();
  const [property, setProperty] = useState(new Property({}))
  const [fixitRequests, setFixitRequests] = useState([])

  useEffect(() => {
    getPropertyInformation(user.propertyId);
    getFixitRequests(user.userID);
  }, [])

  const getPropertyInformation = async(propertyID) => {
    const result = await getPropertyByID(propertyID);

    if (result.success){
      setProperty(result.resultData)
    }
  }

  const getFixitRequests = async(userID) => {
    const result = await getFixitRequestsByUserID(userID)
    console.log(result)
  }


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
            title={`${property.address} ${property.city}, ${property.state}`}
            subtitle={`$${property.monthlyPrice}/month • Ends Jan 31, 2026`}
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
