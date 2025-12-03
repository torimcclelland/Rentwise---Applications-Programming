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
import { styles, theme } from '../styles/UserProfileStyle.js';
import { GlobalValues } from '../GlobalValues';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import { EditUserModal } from '../modals/EditUserModal';
import { login_style } from '../styles/Login';
import { useNavigation } from '@react-navigation/native';
import { User } from '../models/User';
import PrimaryButton from '../components/PrimaryButton';

const UserProfile = () => {
  const theme = useTheme();
  const { firstName, lastName, email, isLandlord, isPremUser, profilePicture } = GlobalValues.currentUser;
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const toggleModal = () => setModalVisible(!modalVisible);

  let membershipLabel = 'Renter';
  if (isLandlord) {
    membershipLabel = isPremUser ? 'Premium Landlord' : 'Free Landlord';
  }

  const handleSignOut = () => {
    navigation.navigate('Login');
    GlobalValues.currentUser = new User();
  };

  return (
    <View style={[styles.container, theme.container]}>
      {/* Header */}
      <View style={[styles.header, theme.container]}>
        <Profile src={profilePicture} size={48} style={styles.profileIcon} />
        <Text style={[styles.title, theme.textColor]}>{firstName}'s Profile</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="edit" size={24} color={theme.textColor.color} />
        </TouchableOpacity>
      </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.welcomeText}>
          Hi {firstName} 👋 Welcome to your profile!
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
        <View style={[
          styles.membershipBadge,
          membershipLabel === 'Renter'
            ? styles.renterBadge
            : membershipLabel === 'Premium Landlord'
            ? styles.premiumBadge
            : styles.freeBadge
        ]}>
          <Icon
            name={membershipLabel === 'Renter' ? 'user' : 'star'}
            size={14}
            color="#1F2937"
            style={{ marginRight: 6 }}
          />
          <Text style={styles.badgeText}>
            {membershipLabel === 'Renter'
              ? 'Verified Renter'
              : membershipLabel === 'Premium Landlord'
              ? 'Premium Landlord'
              : 'Free Landlord'}
          </Text>
        </View>

        {/* Upgrade button for Free Landlord */}
            {isLandlord && !isPremUser && (
      <View style={styles.upgradeContainer}>
        <PrimaryButton
          title="Upgrade to Premium"
          onPress={() => navigation.navigate('PurchasePremium')}
          style={styles.upgradeButton}
        />
      </View>
      )}

      </View>

      {/* Sign out button now inside scrollable content */}
      <PrimaryButton
        title="Sign out"
        onPress={handleSignOut}
        style={[login_style.loginButton, { marginTop: 20 }]}
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
