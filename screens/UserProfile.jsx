import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Profile from './components/profile'; 
import BottomNavBar from './components/BottomNavBar';
import { userImage } from './components/profileexample.png'; 
import styles from './UserProfile.styles';


const UserProfile = () => {
  return (
    <View style={styles.container}>
      {/* Header with Profile */}
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile</Text>
        <Profile src={userImage} size={48} style={styles.profileIcon} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Name</Text>
          <Text style={styles.cardValue}>Tori McClelland</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Email</Text>
          <Text style={styles.cardValue}>tori.mcclelland@example.com</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Membership</Text>
          <Text style={styles.cardValue}>Premium</Text>
        </View>
        {/* Add more cards or sections as needed */}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <BottomNavBar />
      </View>
    </View>
  );
};