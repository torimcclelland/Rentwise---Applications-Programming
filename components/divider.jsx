import React, {useState} from 'react';
import { StyleSheet, View} from 'react-native';


const CustomDivider = ({customStyles}) => {
    return (
        <View style={[styles.container, customStyles]}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        backgroundColor: '#E6E6E6',
        height: 1
    }
});

export default CustomDivider;