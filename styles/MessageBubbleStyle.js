import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageBubble = ({ text, fromUser, timestamp }) => {
  return (
    <View style={[styles.bubbleContainer, fromUser ? styles.userAlign : styles.otherAlign]}>
      <View style={[styles.bubble, fromUser ? styles.userBubble : styles.otherBubble]}>
        <Text style={styles.messageText}>{text}</Text>
        <Text style={styles.timestamp}>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    marginVertical: 6,
    paddingHorizontal: 10,
  },
  userAlign: {
    alignSelf: 'flex-end',
  },
  otherAlign: {
    alignSelf: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#007AFF', // iMessage-style blue
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#E5E5EA', // light gray
    borderTopLeftRadius: 0,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  timestamp: {
    color: '#e0e0e0',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
});

export default MessageBubble;
