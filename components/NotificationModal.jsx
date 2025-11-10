import React from 'react'
import { View, Text, Modal, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur' 
import PrimaryButton from './PrimaryButton'
import { useTheme } from '../ThemeContext' 

const NotificationModal = ({ message, visible, onClose }) => {
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
          <Text style={[notifModal.message, theme.textColor]}>{message}</Text>
          <PrimaryButton
            title="Close"
            size="small"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  )
}

export default NotificationModal

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
