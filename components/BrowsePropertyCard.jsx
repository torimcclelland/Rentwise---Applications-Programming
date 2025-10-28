import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { useTheme } from '../ThemeContext'
import PrimaryButton from './PrimaryButton'


const BrowsePropertyCard = ({address, price}) =>{
    return(
        <View>
            <Image style={browseProps.image} source={require('./house_2.webp')} /> 
            <View style={browseProps.allInfo}>
                <View style={browseProps.info}>
                    <Text>Hello</Text>
                    <Text>house</Text>
                </View>
                <View style={browseProps.next}>
                    <Text>stars</Text>
                    <PrimaryButton
                    title="View ->"
                    size="small"
                    />
                </View>
            </View>
        </View>
    )
}

const browseProps = StyleSheet.create({
    image:{
        height: 141,
        width: '100%',
        borderRadius: 14
    },
    allInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    info:{
        alignItems: 'flex-start'
    },
    next:{
        alignItems: 'flex-end',
    }
})

export default BrowsePropertyCard