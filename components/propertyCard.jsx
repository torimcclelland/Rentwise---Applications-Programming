import React from 'react'
import {useState} from 'react'
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';


const PropertyCard = ({address, ...props}) => {
    return (
        <View style={styles.box}>
            <View style={styles.border}>
                <Image style={styles.image} source={require('./house_2.webp')}/>
                <View style={styles.button}>
                    <Text style={styles.address}>{address}</Text>
                    <Pressable>
                        <Image style={styles.icon} source={require('./arrow_forward.svg')}/>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box:{
        width: 342,
        height: 134,
        borderColor: 'gray',
        boxShadow: 'rgba(0, 0, 0, 0.25)',
        // textShadowOffset: { width: 0, height: 4 }, these are apparently depricated 
        // textShadowRadius: 4,
        borderWidth: 0.5,
        height: 107,
        width: 328,
        borderWidth: 0.5,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    button:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image:{
        height: 80,
        width: 328,
        width: '100%',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    address:{
        backgroundColor: 'white',
        paddingLeft: 8,
        paddingTop: 2,
        font: 'inter',
        fontWeight: 500
    },
    icon:{
    }
})

export default PropertyCard;