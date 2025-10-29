import React, {useEffect, useState} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from '../ThemeContext'
import CustomDivider from '../components/divider'
import { Property } from '../models/Property'
import { getPropertyByID } from '../database_calls/property/GetPropertyByID'

export const PropertyInfo = ({propertyID}) =>{

    const [property, setProperty] = useState(new Property)
    const route = useRoute()
    const {propertyID} = route.params

    useEffect(()=>{
        getPropertyInfo();
    }, [])

    const getPropertyInfo= async() =>{
        const property = await getPropertyByID(propertyID)
        setProperty(property.propertyData)
    }

    return(
        <View>
            <Image style={PropertyInfo.image} source={require('./image.png')} />
            <Text>{property.address}</Text>
            <Text>{property.monthlyPrice}</Text>
        </View>
    )
}

export default PropertyInfo