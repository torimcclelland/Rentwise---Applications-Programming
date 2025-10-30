import React, {useEffect, useState} from 'react'
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from '../ThemeContext'
import CustomDivider from '../components/divider'
import { Property } from '../models/Property'
import { User } from '../models/User'
import { getPropertyByID } from '../database_calls/property/GetPropertyByID'
import { getUserByID } from '../database_calls/user/GetUserByID'
import Profile from '../components/profile'
import RatingStars from '../components/RatingStars'
import PrimaryButton from '../components/PrimaryButton'

export const PropertyInfo = () =>{

    const [property, setProperty] = useState(new Property({}))
    const [landlord, setLandlord] = useState(new User({}))
    const navigation = useNavigation()
    const theme = useTheme()
    const route = useRoute()
    const {propertyID} = route.params

    useEffect(()=>{
        const fetchData = async() => {
            const property = await getPropertyInfo();
            await getLandlordInfo(property.landlordID)
        };
        fetchData()
    }, [])

    const getPropertyInfo = async() => {
        const property = await getPropertyByID(propertyID)
        setProperty(property.propertyData)
        return property.propertyData

    }

    const getLandlordInfo = async(landlordID) => {
        const landlord = await getUserByID(landlordID)
        setLandlord(landlord.userData)
    }

    const applyForProperty = () => {
        navigation.navigate('Apply Property', {landlordID: 'landlord.UserID'})
    }

    return(
        <View style={[propertyInfo.container, theme.container]}>
            <ScrollView>
                <View style={propertyInfo.content}>
                    <Image style={propertyInfo.image} source={require('./image.png')} />

                    <View style={propertyInfo.info}>
                        <View>
                            <Text style={{fontWeight: 600, fontSize: 16}}>{property.address}</Text>
                            <Text>{property.city}, {property.state} {property.zipcode}</Text>
                        </View>
                        <View style={propertyInfo.pricing}>
                            <Text style={[propertyInfo.price, theme.textColor]}>{property.monthlyPrice}</Text>
                            <Text style={[propertyInfo.month, theme.textColor]}>/ month</Text>
                        </View>
                    </View>

                    <CustomDivider/>
                    
                    <View style={propertyInfo.landlordInfo}>
                        <Profile
                        size={40}
                        />
                        <View>
                            <Text style={[theme.textColor, {marginRight: 80}]}>Listed by {landlord.displayName}</Text>
                        </View>
                    </View>

                    <CustomDivider/>

                    <View style={[propertyInfo.description, theme.textColor]}>
                        <Text>{property.description}</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={propertyInfo.buttons}>
                <PrimaryButton
                title="Shedule Visit"
                src='./profileexample.png'
                />
                <PrimaryButton
                title="Apply Now"
                onPress={() => applyForProperty()}
                />
            </View>
        </View>
    )
}

export default PropertyInfo

const propertyInfo = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    content:{
        alignItems: 'center'
    },
    image:{
        height: 342,
        width: 276,
        marginTop: 10
    },
    info:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 25,
        fontFamily: 'Inter',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10
    },
    pricing:{
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    price:{
        fontSize: 25
    },
    month:{
        fontSize: 10,
        marginLeft: 5
    },
    landlordInfo:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 25,
        marginTop: 10,
        marginBottom: 10
    },
    description:{
        fontFamily: 'Inter',
        marginTop: 10
    },
    buttons:{
        flexDirection: 'row',
        gap: 10
    }
})