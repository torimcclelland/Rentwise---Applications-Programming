import React from 'react'
import { View, Text, Modal, StyleSheet, Pressable } from 'react-native'
import { BlurView } from 'expo-blur' 
import PrimaryButton from './PrimaryButton'
import TextField from './TextField'
import { useTheme } from '../ThemeContext' 
import Icon from 'react-native-vector-icons/FontAwesome'

const NotificationWithCloseModal = ({ message, visible, onClose, toggle, dynamic=false, buttonTitle = "close", textMessage, setText}) => {
  const theme = useTheme()

  return (
    <Modal
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      transparent={true}
    >
      {/* Full-screen background */}
      <View style={notifModal.overlay}>
        <BlurView intensity={60} tint="dark" style={StyleSheet.absoluteFill} />
        {/* Centered modal box */}
        <View style={[notifModal.modalContent, theme.textField]}>
          <Pressable onPress={toggle} style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
            <Icon name="close" size={20} color="#000" />
          </Pressable>
          <Text style={[notifModal.message, theme.textColor]}>{message}</Text>

          {dynamic && (
            <TextField
              placeholder={textMessage}
              style={{ borderWidth: 1, borderColor: 'red' }}
              onChangeText={(text) => setText(text)}
            />
          )}

          <PrimaryButton
            title={buttonTitle}
            size="small"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  )
}

export default NotificationWithCloseModal

const notifModal = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',  // centers vertically
    alignItems: 'center',      // centers horizontally
    backgroundColor: 'rgba(0,0,0,0.25)', // dark semi-transparent overlay
  },
  modalContent: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Android boxShadow
    boxShadowColor: '#000', // iOS boxShadow
    boxShadowOpacity: 0.3,
    boxShadowRadius: 8,
    boxShadowOffset: { width: 0, height: 2 },
  },
  message: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
})
