import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Profile from '../components/profile'; 
import BottomNavBar from '../components/BottomNavBar';
import userImage from '../components/profileexample.png'; 
import styles from '../styles/UserProfileStyle.js';
import { GlobalValues } from '../GlobalValues';



const UserProfile = () => {
  return (
    <View style={styles.container}>
      {/* Header with Profile */}
      <View style={styles.header}>
      <Text style={styles.title}> {GlobalValues.currentUser.firstName}'s Profile</Text>
        <Profile src={userImage} size={48} style={styles.profileIcon} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Name</Text>
          <Text style={styles.cardValue}>{GlobalValues.currentUser.firstName} {GlobalValues.currentUser.lastName}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Email</Text>
          <Text style={styles.cardValue}>{GlobalValues.currentUser.email}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Membership Type</Text>
          <Text style={styles.cardValue}>Renter</Text>
        </View>
        {/* Add more cards or sections as needed */}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {<BottomNavBar /> }
      </View>
    </View>
  );
};

export default UserProfile;