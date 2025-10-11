import React from 'react'
import {useState} from 'react'
import { StyleSheet, View, Image, Text } from 'react-native';


const PropertyCard = ({address, ...props}) => {
    return (
        <View style={styles.box}>
            <Image style={styles.image} source={require('../screens/rentwiseLogo.png')}/>
            <Text style={styles.address}>{address}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        width: 342,
        height: 134,
        borderColor: 'gray',
        boxShadow: 'rgba(0, 0, 0, 0.25)',
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 4,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        flexShrink: 0
    },
    image:{
        height: 80,
        width: 328
    },
    text:{
        backgroundColor: 'white'
    }

})

export default PropertyCard;