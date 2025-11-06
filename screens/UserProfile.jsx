import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Profile from '../components/profile';
import BottomNavBar from '../components/BottomNavBar';
import userImage from '../components/profileexample.png';
import { styles, theme } from '../styles/UserProfileStyle.js';
import { GlobalValues } from '../GlobalValues';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { EditUserModal } from '../modals/EditUserModal';
import { login_style } from '../styles/login';
import { useNavigation } from '@react-navigation/native';
import { User } from '../models/User';
import PrimaryButton from '../components/PrimaryButton';

const UserProfile = () => {
  const theme = useTheme();
  const { firstName, lastName, email, isLandlord, isPremUser, profilePicture } = GlobalValues.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  let membershipLabel = 'Renter';
  if (isLandlord) {
    membershipLabel = isPremUser ? 'Premium Landlord' : 'Free Landlord';
  }

  const handleEditUser = () => {
    toggleModal();
  };

  const handleSignOut = () => {
    navigation.navigate('Login');
    GlobalValues.currentUser = new User();
  };

  return (
    <View style={[styles.container, theme.container]}>
      {/* Header */}
      <View style={[styles.header, theme.container]}>
        <Text style={[styles.title, theme.textColor]}>{firstName}'s Profile</Text>
        <TouchableOpacity onPress={handleEditUser}>
          <Icon name="edit" size={24} color={theme.textColor.color} />
        </TouchableOpacity>
        <Profile src={profilePicture} size={48} style={styles.profileIcon} />
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* ✅ Friendly welcome message */}
        <Text style={styles.welcomeText}>
          Hi {firstName} 👋 Here's your profile info
        </Text>

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
          {/* Membership Badge */}
  <View style={[
    styles.membershipBadge,
    membershipLabel === 'Renter'
      ? styles.renterBadge
      : membershipLabel === 'Premium Landlord'
      ? styles.premiumBadge
      : styles.freeBadge
  ]}>
    <Text style={styles.badgeText}>
      {membershipLabel === 'Renter'
        ? 'Verified Renter'
        : membershipLabel === 'Premium Landlord'
        ? 'Premium Landlord'
        : 'Free Landlord'}
    </Text>
  </View>
        </View>

        <PrimaryButton
          title="Sign out"
          onPress={handleSignOut}
          style={login_style.loginButton}
        />
      </ScrollView>

      <EditUserModal visible={modalVisible} onClose={toggleModal} />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <BottomNavBar />
      </View>
    </View>
  );
};

export default UserProfile;
