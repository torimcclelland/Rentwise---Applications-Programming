import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Profile from '../components/profile'; 
import BottomNavBar from '../components/BottomNavBar';
import userImage from '../components/profileexample.png'; 
import styles from '../styles/UserProfileStyle.js';
import { GlobalValues } from '../GlobalValues';
import { useTheme } from '../ThemeContext';

const UserProfile = () => {
  const { firstName, lastName, email, isLandlord, isPremUser } = GlobalValues.currentUser;
  const theme = useTheme()

  //Determine membership type
  let membershipLabel = 'Renter';
  if (isLandlord) {
    membershipLabel = isPremUser ? 'Premium Landlord' : 'Free Landlord';
  }

  return (
    <View style={[styles.container, theme.container]}>
      {/* Header with Profile */}
      <View style={[styles.header, theme.container]}>
        <Text style={[styles.title, theme.textColor]}>{firstName}'s Profile</Text>
        <Profile src={userImage} size={48} style={styles.profileIcon} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, theme.textField]}>
          <Text style={[styles.cardTitle, theme.textColor]}>Name</Text>
          <Text style={[styles.cardValue, theme.textColor]}>{firstName} {lastName}</Text>
        </View>
        <View style={[styles.card, theme.textField]}>
          <Text style={[styles.cardTitle, theme.textColor]}>Email</Text>
          <Text style={[styles.cardValue, theme.textColor]}>{email}</Text>
        </View>
        <View style={[styles.card, theme.textField]}>
          <Text style={[styles.cardTitle, theme.textColor]}>Membership Type</Text>
          <Text style={[styles.cardValue, theme.textColor]}>{membershipLabel}</Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <BottomNavBar />
      </View>
    </View>
  );
};

export default UserProfile;