import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Profile from '../components/profile'; 
import BottomNavBar from '../components/BottomNavBar';
import userImage from '../components/profileexample.png'; 
import styles from '../styles/UserProfileStyle.js';
import { GlobalValues } from '../GlobalValues';
// import RatingStars from '../components/RatingStars';

const UserProfile = () => {
  const { firstName, lastName, email, isLandlord, isPremUser } = GlobalValues.currentUser;

  //Determine membership type
  let membershipLabel = 'Renter';
  if (isLandlord) {
    membershipLabel = isPremUser ? 'Premium Landlord' : 'Free Landlord';
  }

  return (
    <View style={styles.container}>
      {/* Header with Profile */}
      <View style={styles.header}>
        <Text style={styles.title}>{firstName}'s Profile</Text>
        {/* <RatingStars></RatingStars> */}
        <Profile src={userImage} size={48} style={styles.profileIcon} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Name</Text>
          <Text style={styles.cardValue}>{firstName} {lastName}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Email</Text>
          <Text style={styles.cardValue}>{email}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Membership Type</Text>
          <Text style={styles.cardValue}>{membershipLabel}</Text>
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