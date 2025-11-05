import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavBar';
import MessageBubble from '../components/MessageBubble';
import styles from '../styles/SpecificMessageStyle';
import { useTheme } from '../ThemeContext';

// Sample conversation data keyed by ConversationID
const conversationMap = {
  'conv1': [
    { sender: 'renter23', senderName: 'You', text: 'Hi there!', timestamp: '2023-11-30T09:40:00' },
    { sender: 'landlord', senderName: 'Mrs. Landlord', text: 'Hello! How can I help you today?', timestamp: '2023-11-30T09:41:00' },
    { sender: 'renter23', senderName: 'You', text: 'I had a question about the lease terms.', timestamp: '2023-11-30T09:42:00' },
  ],
  'conv2': [
    { sender: 'bff2025', senderName: 'You', text: 'I got a new apartment in Erie!', timestamp: '2023-11-30T10:00:00' },
    { sender: 'landlord', senderName: 'Mrs. Landlord', text: 'Congrats! Let me know if you need anything.', timestamp: '2023-11-30T10:01:00' },
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
      <Text style={[styles.header, theme.textColor]}>
        Conversation with Mrs. Landlord
      </Text>

      {/* Message Thread */}
      <ScrollView contentContainerStyle={styles.messageList}>
        {conversation.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            senderName={msg.senderName}
            text={msg.text}
            timestamp={msg.timestamp}
            isUser={msg.sender !== 'landlord'}
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
