import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import {
  BubbleContainer,
  Bubble,
  TextContent,
  Timestamp,
  StatusText,
} from './MessageBubbleStyle';

const MessageBubble = ({ text, fromUser, timestamp, status }) => {
  return (
    <BubbleContainer fromUser={fromUser}>
      <Bubble fromUser={fromUser}>
        <TextContent>{text}</TextContent>
        {timestamp && <Timestamp>{timestamp}</Timestamp>}
        {status && <StatusText>{status}</StatusText>}
      </Bubble>
    </BubbleContainer>
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
