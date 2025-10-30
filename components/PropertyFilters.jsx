import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { useTheme } from '../ThemeContext'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


const Filter = ({text, iconName}) =>{

    const theme = useTheme()

    return(
        <TouchableOpacity style={[filter.container]}>
            <View style={filter.content}>
                <Icon name={iconName} size={10} color={theme.textColor.color} style={filter.icon}/>
                <Text style={theme.textColor}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

const filter = StyleSheet.create({
    container:{
        borderRadius: 6,
        borderColor: '#E6E6E6',
        borderStyle: 'solid',
        borderWidth: 1,
    },
    content:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    icon:{
        paddingRight: 5,
    }

})

export default Filter