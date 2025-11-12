import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create ({
  main:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E6E6E6'
  },
  scrollContent: {
    flexGrow: 1,        
    justifyContent: 'center',  
    alignItems: 'center',       
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 110,         
    width: '100%',
    gap: 16,    
  },                
  topComponent:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageContent:{
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  pageArea:{
    justifyContent: 'top'
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
    width: '100%'
  },
  noProperties:{
    paddingVertical: 20,
    paddingHorizontal: 90
    
  }
});