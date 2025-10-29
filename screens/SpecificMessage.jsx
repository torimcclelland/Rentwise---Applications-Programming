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
    { sender: 'renter23', text: 'Hi there!' },
    { sender: 'landlord', text: 'Hello! How can I help you today?' },
    { sender: 'renter23', text: 'I had a question about the lease terms.' },
  ],
  'conv2': [
    { sender: 'bff2025', text: 'I got a new apartment in Erie!' },
    { sender: 'landlord', text: 'Congrats! Let me know if you need anything.' },
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
        Conversation: {ConversationID || 'Unknown'}
      </Text>

      {/* Message Thread */}
      <ScrollView contentContainerStyle={styles.messageList}>
        {conversation.map((msg, index) => (
          <MessageBubble
            key={index}
            sender={msg.sender}
            text={msg.text}
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
