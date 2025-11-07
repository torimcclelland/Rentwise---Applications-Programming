import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/MessageBubbleStyle';

const MessageBubble = ({ text, fromUser, timestamp, status }) => {
  return (
    <View style={[styles.bubbleContainer, fromUser ? styles.alignRight : styles.alignLeft]}>
      <View style={[styles.bubble, fromUser ? styles.userBubble : styles.agentBubble]}>
        <Text style={styles.textContent}>{text}</Text>
        {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
        {status && <Text style={styles.statusText}>{status}</Text>}
      </View>
    </View>
  );
};

MessageBubble.propTypes = {
  text: PropTypes.string.isRequired,
  fromUser: PropTypes.bool,
  timestamp: PropTypes.string,
  status: PropTypes.string,
};

MessageBubble.defaultProps = {
  fromUser: false,
  timestamp: null,
  status: null,
};

export default MessageBubble;
