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
                        <Image style={styles.icon} source={require('./arrowForward.jpg')}/>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
        borderRadius: 12,
        // borderColor: 'gray'
    },
    border:{
        borderRadius: 12,
        borderWidth: 0.5,
        backgroundColor: 'white',
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
        backgroundColor: 'white',
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