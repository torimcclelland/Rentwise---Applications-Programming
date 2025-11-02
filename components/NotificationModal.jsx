import React, {useState} from 'react'
import {View, Text, Modal} from 'react-native'
import PrimaryButton from './PrimaryButton'

const NotificationModal = ({message}) => {

    const [modalVisible, setModalVisible] = useState(false)
    return(
        <Modal
        animationType='fade'
        visible = {modalVisible}
        >
            
        </Modal>
    )
}