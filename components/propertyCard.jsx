import React from 'react'
import {useState} from 'react'
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/Feather';
import PrimaryButton from './PrimaryButton';


const PropertyCard = ({address, onPress,image, ...props}) => {
    // grab the current system theme for styling
    const theme = useTheme()
    
    return (
        <View style={[styles.box]}>
            <View style={[styles.border, theme.propertyCard]}>
                <Image style={styles.image} source={{uri: image}} />
                <View style={styles.button}>
                    <Text style={[styles.address, theme.textColor]}>{address}</Text>
                    <View style={styles.buttonsSide}>
                        <PrimaryButton
                        title="View"
                        size="small"
                        fontSize={15}
                        customStyle={{height: 35, width: 150}}
                        onPress={onPress}
                        />
                        <PrimaryButton
                        title="Edit"
                        size="small"
                        fontSize={15}
                        customStyle={{height: 35, width: 150}}
                        onPress={onPress}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        // height: 108,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        borderRadius: 12,
        // borderColor: 'gray'
    },
    border:{
        width: 350,
        height: 260,
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
        borderRadius: 12
        
    },
    address:{
        paddingLeft: 8,
        paddingTop: 2,
        font: 'Inter',
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

export default PropertyCard;