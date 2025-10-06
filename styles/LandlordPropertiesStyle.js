import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  addButton: {
    fontSize: 16,
    color: '#007AFF',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  address: {
    flex: 1,
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    color: '#999',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
  },
  navIcon: {
    fontSize: 24,
  },
});
