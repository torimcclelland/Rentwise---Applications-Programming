import { StyleSheet } from 'react-native';

const BottomNavBarStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  elementwithchildren: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  rightaligned: {
    alignSelf: 'flex-end !important',
    backgroundColorcolor: 'black'
  }
});

export default BottomNavBarStyle;
