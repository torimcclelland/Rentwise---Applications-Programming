import React from 'react'
import {useState} from 'react'
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/Feather';



const RenterPropertyCard = ({address, view, edit, image, ...props}) => {
    // grab the current system theme for styling
    const theme = useTheme()
    
    return (
        <View style={[styles.box]}>
            <View style={[styles.border, theme.propertyCard]}>
                <Image style={styles.image} source={{uri: image}} />
                <View style={styles.button}>
                    <Text style={[styles.address, theme.textColor]}>{address}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        // height: 108,
        boxShadowColor: '#000',
        boxShadowOffset: { width: 0, height: 4 },
        boxShadowOpacity: 0.2,
        boxShadowRadius: 4,
        borderRadius: 12,
        // borderColor: 'gray'
    },
    border:{
        width: 350,
        height: 220,
        borderRadius: 12,
        overflow: 'hidden',
        borderColor: '#034974'
    },
    button:{
        flexDirection: 'column',
        alignItems: 'center'
    },
    image:{
        height: 180,
        width: '100%',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingTop: 10
        
    },
    address:{
        paddingLeft: 8,
        paddingTop: 2,
        fontFamily: 'Inter',
        fontSize: 20,
        fontWeight: 500
    },
    icon:{
        height: 24,
        width: 24
    },
    buttonsSide:{
        flexDirection: 'row',
        gap: 10
        
    }
})

export default RenterPropertyCard;