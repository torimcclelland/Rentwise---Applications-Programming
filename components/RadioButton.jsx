import React from 'react'
import {useState} from 'react'
import {View, TouchableOpacity, Touchable, StyleSheet} from 'react-native'
import {RadioButton} from 'react-native-paper'


const RadioButtons = ({label, selected, onPress}) => {
    <RadioButton.Android
    value="option1"
    status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
    onPress={() => setSelectedValue('option1')}
    color="#007BFF" // Custom color for the radio button
    />
}



export default RadioButtons;