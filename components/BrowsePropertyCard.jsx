import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { useTheme } from '../ThemeContext'
import PrimaryButton from './PrimaryButton'


const BrowsePropertyCard = ({address, price, onPress}) =>{

    const theme = useTheme()

    return(
        <View>
            <Image style={browseProps.image} source={require('./house_2.webp')} /> 
            <View style={browseProps.allInfo}>
                <View style={browseProps.info}>
                    <Text style={[browseProps.text, theme.textColor]}>Hello</Text>
                    <Text style={[browseProps.text, theme.textColor, {fontSize: 20}]}>house</Text>
                </View>
                <View style={browseProps.next}>
                    <Text style={[browseProps.text, theme.textColor]}>stars</Text>
                    <PrimaryButton
                    title="View ->"
                    size="small"
                    customStyle={{height: 30, width: 91}}
                    onPress={onPress}
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
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: 10
    },
    info:{
        alignItems: 'flex-start',
        marginTop: 5
    },
    next:{
        alignItems: 'flex-end',
    },
    text:{
        font: 'Inter',
        fontSize: 16,
        fontWeight: 500
    }
})

export default BrowsePropertyCard