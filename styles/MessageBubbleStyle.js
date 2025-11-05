import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  bubbleContainer: {
    marginVertical: 8,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 8,
  },
  userBubble: {
    backgroundColor: '#cce5ff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 0,
  },
  agentBubble: {
    backgroundColor: '#e2e3e5',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
  },
  textContent: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#007bff',
    marginTop: 4,
  },
});
