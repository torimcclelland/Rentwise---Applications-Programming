import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import userImage from '../components/profileexample.png'; // placeholder profile image
import styles from '../styles/MessagesOverviewStyle';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';

const messages = [
  { username: 'renter23', message: 'How are you today?' },
  { username: 'bff2025', message: 'I got a new apartment in Erie!' },
  { username: 'rentqueen', message: 'Smoking is banned in this unit.' },
  { username: 'ms.rent', message: 'Where are good places...' },
];

const filters = ['All Messages', 'Newest', 'Oldest', 'Active'];

const MessagesOverview = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, theme.container]}>
      {/* Header */}
      <Text style={[styles.header, theme.textColor]}>Messages (Landlord)</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Message List */}
      <ScrollView contentContainerStyle={styles.messageList}>
        {messages.map((msg, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.messageCard, theme.textField]}
            onPress={() => navigation.navigate('SpecificMessage')}
          >
            <Image source={userImage} style={styles.profileImage} />
            <View style={styles.messageTextContainer}>
              <Text style={[styles.username, theme.textColor]}>{msg.username}</Text>
              <Text style={[styles.message, theme.textColor]}>{msg.message}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <BottomNavBar selectedTab="messages" />
      </View>
    </View>
  );
};

export default MessagesOverview;
