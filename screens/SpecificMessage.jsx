import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';
import MessageBubble from '../components/MessageBubble';
import styles from '../styles/SpecificMessageStyle';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Sample conversation data keyed by ConversationID
const conversationMap = {
  'conv1': [
    { sender: 'renter23', senderName: 'You', text: 'Hi there!', timestamp: '2023-11-30T09:40:00' },
    { sender: 'landlord', senderName: 'Mrs. Landlord', text: 'Hello! How can I help you today?', timestamp: '2023-11-30T09:41:00' },
    { sender: 'renter23', senderName: 'You', text: 'I had a question about the lease terms.', timestamp: '2023-11-30T09:42:00' },
    { sender: 'landlord', senderName: 'Mrs. Landlord', text: 'Sure! Pets are allowed and rent is due on the 1st.', timestamp: '2023-11-30T09:43:00' },
    { sender: 'renter23', senderName: 'You', text: 'Perfect, thank you!', timestamp: '2023-11-30T09:44:00' },
  ],
};

const SpecificMessage = () => {
  const theme = useTheme();
  const route = useRoute();
  const { ConversationID } = route.params || {};
  const conversation = conversationMap[ConversationID] || [];

  return (
    <View style={[styles.container, theme.container]}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon name="account-circle-outline" size={24} color={theme.textColor.color} />
        <Text style={[styles.header, theme.textColor]}>
          Conversation with Mrs. Landlord
        </Text>
      </View>

      {/* Message Thread */}
      <ScrollView contentContainerStyle={styles.messageList}>
        {conversation.map((msg, index) => (
          <MessageBubble
            key={index}
            text={msg.text}
            fromUser={msg.sender !== 'landlord'}
            timestamp={msg.timestamp}
          />
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <BottomNavBar selectedTab="messages" />
      </View>
    </View>
  );
};

export default SpecificMessage;
