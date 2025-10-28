import { StyleSheet } from 'react-native';

const DashboardStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  buttonRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},
activityRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
activityText: {
  marginLeft: 8,
  fontSize: 14,
},
requestRow: {
  marginTop: 10,
},
requestTitle: {
  fontWeight: 'bold',
  fontSize: 16,
},
statusRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 4,
},
statusText: {
  marginLeft: 6,
  color: '#FFA500',
},
requestDate: {
  fontSize: 12,
  color: '#666',
},
addRequestButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
},
addRequestText: {
  marginLeft: 6,
  color: '#007AFF',
  fontWeight: '500',
},

});

export default DashboardStyles;
