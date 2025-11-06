import { StyleSheet } from 'react-native';

export const stylesModal = StyleSheet.create({
    centeredView:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    banner:{
      alignItems: 'center',
      width: '100%',
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
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 5,
      width: '80%',
      height: '70%',
      //height: '70%',
      borderColor: '#E6e6e6',
      borderWidth: 1,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2}
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
    editButtons: {
    position: 'absolute',
    top: 0,
    right: 10,
    flexDirection: 'row',
    gap: 10
    },
    iconButton: {
      padding: 8,
      borderRadius: 20,
      elevation: 2,
    },
  })
  