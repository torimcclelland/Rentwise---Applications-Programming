import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create ({
  main:{
    flex: 1,
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 12
  },
  scrollContent: {      
    alignItems: 'center',       
    paddingBottom: 110,         
    gap: 16,    
  },                
  topComponent:{
    marginTop: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  addButton: {
    height: 32,
    width: 71,
    alignSelf: 'flex-end'
  },
  text: {
    fontFamily: 'inter',
    fontWeight: 500,
    fontSize: 14,
  },
  image:{
    height: 24,
    width: 24
  },
  bottomNav:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  noProperties:{
    paddingVertical: 20,
    paddingHorizontal: 90
    
  }
});