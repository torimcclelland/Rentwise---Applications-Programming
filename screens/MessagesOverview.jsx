import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import userImage from '../components/profileexample.png';
import styles from '../styles/MessagesOverviewStyle';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';

const messages = [
  { username: 'renter23', message: 'How are you today?', conversationID: 'conv1' },
  { username: 'bff2025', message: 'I got a new apartment in Erie!', conversationID: 'conv2' },
  { username: 'rentqueen', message: 'Smoking is banned in this unit.', conversationID: 'conv3' },
  { username: 'ms.rent', message: 'Where are good places...', conversationID: 'conv4' },
];

const filters = ['All Messages', 'Newest', 'Oldest', 'Active'];

const MessagesOverview = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Specific Message');
  };

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
            onPress={() => navigation.navigate('Specific Message')}
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

