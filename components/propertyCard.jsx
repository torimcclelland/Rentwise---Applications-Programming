import React from 'react'
import {useState} from 'react'
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/Feather';

const PropertyCard = ({address, onPress, ...props}) => {
    // grab the current system theme for styling
    const theme = useTheme()
    
    return (
        <View style={[styles.box]}>
            <View style={[styles.border, theme.textField]}>
                <Image style={styles.image} source={require('./house_2.webp')}/>
                <View style={styles.button}>
                    <Text style={[styles.address, theme.textColor]}>{address}</Text>
                    <Pressable onPress={onPress}>
                        <Icon name="arrow-right" size={24} color={theme.textColor.color}/>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        width: 342,
        height: 108,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
        borderRadius: 12,
        // borderColor: 'gray'
    },
    border:{
        width: 342,
        height: 108,
        borderRadius: 12,
        borderWidth: 0.5,
        overflow: 'hidden',
        // borderColor: 'gray'
    },
    button:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image:{
        height: 80,
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    address:{
        paddingLeft: 8,
        paddingTop: 2,
        font: 'inter',
        fontWeight: 500
    },
    icon:{
        height: 24,
        width: 24
    }
})

export default PropertyCard;