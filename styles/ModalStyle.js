import { StyleSheet } from 'react-native';

export const stylesModal = StyleSheet.create({
    centeredView:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    banner:{
      alignItems: 'center',
      paddingVertical: 10,
      marginBottom: 10
    },
    spacing:{
      flexDirection: 'column',
      gap: 16
    },
    modalView:{
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 5,
      width: '80%',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2}
    },
    contentView:{
      paddingHorizontal: 10
    },
    textBoxes:{
      flexDirection: 'row'
    },
    back:{
      flexDirection: 'row',
      marginBottom: 10
    },
    imageBox: {
      width: '100%',                
      height: 150,
      borderWidth: 2,
      borderColor: '#aaa',
      borderStyle: 'dashed',     
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fafafa',
    },
    addImage:{
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      font: 'inter',
      fontWeight: 500,
      fontSize: 14,
    },
    image:{
      height: 24,
      width: 24
    },
  })
  