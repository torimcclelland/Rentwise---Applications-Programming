import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { useTheme } from '../ThemeContext'
import PrimaryButton from './PrimaryButton'


const BrowsePropertyCard = ({address, price, onPress, image}) =>{

    const theme = useTheme()

    return(
        <View style={[theme.textField, browseProps.container]}>
            <Image style={browseProps.image} source={{uri: image}} /> 
            <View style={browseProps.allInfo}>
                <View style={browseProps.info}>
                    <Text style={[browseProps.text, theme.textColor]}>{address}</Text>
                    <View style={browseProps.price}>
                        <Text style={[browseProps.text, theme.textColor, {fontSize: 20}]}>${price}</Text>
                        <Text style={[browseProps.month, theme.textColor]}>/ month</Text>
                    </View>
                </View>
                <View style={browseProps.next}>
                    <Text style={[browseProps.text, theme.textColor]}>stars</Text>
                    <PrimaryButton
                    title="View"
                    size="small"
                    fontSize={14}
                    customStyle={{height: 30, width: 91}}
                    onPress={onPress}
                    />
                </View>
            </View>
        </View>
    )
}

const browseProps = StyleSheet.create({
    container:{
        borderRadius: 14,
        paddingTop: 10,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingBottom: 5
    },
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
    price:{
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    month:{
        fontSize: 12,
        marginLeft: 5,
        fontStyle: 'Inter',
        fontWeight: 600
    },
    text:{
        fontStyle: 'Inter',
        fontSize: 16,
        fontWeight: 500,
    }
})

export default BrowsePropertyCard