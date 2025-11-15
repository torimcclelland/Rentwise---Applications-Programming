import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';
import BottomNavBar from '../components/BottomNavBar';
import RenterPropertyCard from '../components/renterPropertyCard';
import CustomDivider from '../components/divider';
import { styles } from '../styles/LandlordPropertiesStyle';

const RenterLeaseScreen = () => {
  const theme = useTheme();

  const leaseInfo = {
    address: '123 Elm Street, Erie, PA',
    rent: 950,
    dueDate: '1st of every month',
    landlordName: 'Mrs. Landlord',
    landlordEmail: 'landlord@example.com',
    image: 'https://www.jameshardie.com/_next/image/?url=https%3A%2F%2Fimages.ctfassets.net%2Fdzi2asncd44t%2F6pRezpMP3rQ0xG97feYlAR%2Fadf121ed2ee973afe56a2abc6d1a517f%2FContrasting-Texture-Siding.jpg&w=3840&q=75'
  };

  return (
    <View style={[styles.main, theme.container]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.text, { alignSelf: 'flex-start' }, theme.textColor]}>
          My Current Lease
        </Text>

        <RenterPropertyCard
          address={leaseInfo.address}
          image={leaseInfo.image}
          onPress={() => {}}
        />

        <View style={{ alignSelf: 'flex-start', width: '100%', marginTop: 12 }}>
          <Text style={[styles.text, theme.textColor]}>Rent: ${leaseInfo.rent}</Text>
          <Text style={[styles.text, theme.textColor]}>Due Date: {leaseInfo.dueDate}</Text>
          <Text style={[styles.text, theme.textColor]}>Landlord: {leaseInfo.landlordName}</Text>
          <Text style={[styles.text, theme.textColor]}>Contact: {leaseInfo.landlordEmail}</Text>
        </View>

        <CustomDivider customStyles={{ marginBottom: 20, marginTop: 20 }} />
      </ScrollView>
    </View>
  );
};

export default RenterLeaseScreen;
