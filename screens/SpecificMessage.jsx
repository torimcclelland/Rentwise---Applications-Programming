import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import MessageBubble from '../components/MessageBubble';
import styles from '../styles/SpecificMessageStyle';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../components/PrimaryButton';
import TextFieldLong from '../components/TextFieldLong';

const staticConversation = [
  { sender: 'renter23', senderName: 'You', text: 'Hi there!', timestamp: '2023-11-30T09:40:00' },
  { sender: 'landlord', senderName: 'Mrs. Landlord', text: 'Hello! How can I help you today?', timestamp: '2023-11-30T09:41:00' },
  { sender: 'renter23', senderName: 'You', text: 'I had a question about the lease terms.', timestamp: '2023-11-30T09:42:00' },
  { sender: 'landlord', senderName: 'Mrs. Landlord', text: 'Sure! Pets are allowed and rent is due on the 1st.', timestamp: '2023-11-30T09:43:00' },
  { sender: 'renter23', senderName: 'You', text: 'Perfect, thank you!', timestamp: '2023-11-30T09:44:00' },
];

const SpecificMessage = () => {
  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState(staticConversation);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage = {
        sender: 'renter23',
        senderName: 'You',
        text: inputText,
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, theme.container]}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Icon name="account-circle-outline" size={24} color={theme.textColor?.color || '#333'} />
          <Text style={[styles.header, theme.textColor || { color: '#333' }]}>
            Conversation with Mrs. Landlord
          </Text>
        </View>

        {/* Message Thread */}
        <View style={styles.messageContainer}>
          <ScrollView contentContainerStyle={styles.messageList}>
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                text={msg.text}
                fromUser={msg.sender !== 'landlord'}
                timestamp={msg.timestamp}
              />
            ))}
          </ScrollView>
        </View>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TextFieldLong
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
            customStyle={styles.textField}
          />
          <PrimaryButton
            title="Send"
            size="small"
            onPress={handleSend}
            disabled={!inputText.trim()}
            customStyle={styles.sendButton}
          />
</View>


        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <BottomNavBar selectedTab="messages" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SpecificMessage;

