import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/MessageBubbleStyle';

const MessageBubble = ({
  text,
  fromUser,
  timestamp,
  status,
  bubbleColor,
  textColor,
  styleOverrides = {},
}) => {
  const isUser = fromUser;

  return (
    <View style={[styles.bubbleContainer, isUser ? styles.alignRight : styles.alignLeft]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.otherBubble,
          {
            backgroundColor: bubbleColor || (isUser ? '#007AFF' : '#E5E5EA'),
          },
          styleOverrides.bubble,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            { color: textColor || (isUser ? '#fff' : '#000') },
            styleOverrides.text,
          ]}
        >
          {text}
        </Text>

        {timestamp && (
          <Text style={[styles.timestamp, styleOverrides.timestamp]}>
            {new Date(timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        )}

        {status && (
          <Text style={[styles.statusText, styleOverrides.status]}>
            {status}
          </Text>
        )}
      </View>
    </View>
  );
};

MessageBubble.propTypes = {
  text: PropTypes.string.isRequired,
  fromUser: PropTypes.bool,
  timestamp: PropTypes.string,
  status: PropTypes.string,
  bubbleColor: PropTypes.string,
  textColor: PropTypes.string,
  styleOverrides: PropTypes.object,
};

MessageBubble.defaultProps = {
  fromUser: false,
  timestamp: null,
  status: null,
  bubbleColor: null,
  textColor: null,
  styleOverrides: {},
};

export default MessageBubble;
