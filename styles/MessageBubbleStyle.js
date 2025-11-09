import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bubbleContainer: {
    marginVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    elevation: 1,
  },
  userBubble: {
    borderTopRightRadius: 0,
  },
  otherBubble: {
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
    color: '#888',
  },
  statusText: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'right',
    color: '#aaa',
  },
});

export default styles;
