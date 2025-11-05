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
import Icon from 'react-native-vector-icons/FontAwesome'
import ImageCarousel from '../components/ImageCarousel'

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
        setLandlord(landlord.resultData)
    }

    const applyForProperty = () => {
        navigation.navigate('Apply Property', {'landlordID': landlord.userID})
    }

    return(
        <View style={[propertyInfo.container, theme.dashboardContainer]}>
            <ScrollView
            showsVerticalScrollIndicator={false}>
                <View style={propertyInfo.content}>
                    <ImageCarousel images={property.images} imageStyle={propertyInfo.image}/>

                    <View style={propertyInfo.info}>
                        <View>
                            <Text style={[theme.logoColor, {fontWeight: 600, fontSize: 20}]}>{property.address}</Text>
                            <Text style={[theme.textColor]}>{property.city}, {property.state} {property.zipcode}</Text>
                        </View>
                        <View style={propertyInfo.pricing}>
                            <Text style={[propertyInfo.price, theme.logoColor]}>${property.monthlyPrice}</Text>
                            <Text style={[propertyInfo.month, theme.textColor]}>/ month</Text>
                        </View>
                    </View>

                    <CustomDivider/>
                    
                    <View style={[propertyInfo.features, propertyInfo.landlordInfo, theme.textField]}>
                        <Profile
                        size={40}
                        />
                        <View style={{marginRight: 140}}>
                            <Text style={[theme.textColor, {fontSize: 17, fontWeight: 600}]}>Listed by {landlord.firstName}</Text>
                            {/* <RatingStars/> */}
                        </View>
                    </View>

                    <CustomDivider/>
                    
                    <View style={propertyInfo.map}>
                        <Icon name="map-pin" size={20} color={theme.logoColor.color}/>
                        <Text style={[propertyInfo.featuresText, theme.logoColor, {marginLeft: 10}]}>Property Info</Text>
                    </View>

                    <View style={[propertyInfo.description, theme.textField]}>
                        <Text style={[theme.textColor, {textAlign: 'center'}]}>{property.description}</Text>
                    </View>

                    <CustomDivider/>
                    
                    <View style={propertyInfo.map}>
                        <Icon name="key" size={20} color={theme.logoColor.color}/>
                        <Text style={[propertyInfo.featuresText, theme.logoColor, {marginLeft: 10}]}>Features</Text>
                    </View>

                    <View style={[propertyInfo.features, theme.textField, theme.textField]}>
                        <View style={propertyInfo.list}>
                            <Icon name="bed" size={30} color={theme.logoColor.color}/>
                            <Text style={propertyInfo.listText}>{property.numBeds} Beds</Text>
                        </View>

                        <View style={propertyInfo.list}>
                            <Icon name="bath" size={30} color={theme.logoColor.color}/>
                            <Text style={propertyInfo.listText}>{property.numBath} Bath</Text>
                        </View>

                        <View style={propertyInfo.list}>
                            <Icon name="car" size={29} color={theme.logoColor.color}/>
                            <Text style={propertyInfo.listText}>{property.parking}</Text>
                        </View>

                        <View style={propertyInfo.list}>
                            <Icon name="paw" size={30} color={theme.logoColor.color}/>
                            {property.petsAllowed == "Yes" ? (
                                <Text style={propertyInfo.listText}>Pets Allowed</Text>
                            ) : (
                                <Text style={propertyInfo.listText}>Pets Not Allowed</Text>
                            )}
                        </View>
                        
                        <View style={propertyInfo.list}>
                            <Icon name="home" size={30} color={theme.logoColor.color}/>
                            <Text style={propertyInfo.listText}>{property.typeOfHome}</Text>
                        </View>
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
        paddingHorizontal: 10,
        alignItems: 'center',
        paddingHorizontal: 20
    },
    image:{
        height: 274,
        width: '90%',
        marginTop: 10,
        borderRadius: 8
    },
    info:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        fontFamily: 'Inter',
        fontSize: 16,
        marginBottom: 5,
        marginTop: 5,
        padding: 10
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
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 10,
        marginBottom: 10
    },
    description:{
        fontFamily: 'Inter',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 8,
        width: '100%',
        paddingTop: 20,
        paddingBottom: 20,
        paddingHorizontal: 5,
        marginBottom: 20,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttons:{
        flexDirection: 'row',
        gap: 10
    },
    featuresText:{
        fontSize: 20,
        fontWeight: 600,
        alignSelf: 'flex-start',
        marginBottom: 10,
        marginTop: 10
    },
    features:{
        borderRadius: 8,
        backgroundColor: 'gray',
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'column',
        gap: 20,
        paddingVertical: 20,
        paddingLeft: 30,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 20,
        marginTop: 10
    },
    list:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    listText:{
        fontSize: 14,
        fontWeight: 500
    },
    map:{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginTop: 10,
        alignItems: 'center'
    }
})