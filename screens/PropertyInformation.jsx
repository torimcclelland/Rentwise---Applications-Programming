import React, {useEffect, useState, useRef} from 'react'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from '../ThemeContext'
import CustomDivider from '../components/divider'
import { Property } from '../models/Property'
import { User } from '../models/User'
import { getPropertyByID } from '../database_calls/property/GetPropertyByID'
import { getUserByID } from '../database_calls/user/GetUserByID'
import Profile from '../components/profile'
import PrimaryButton from '../components/PrimaryButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import ImageCarousel from '../components/ImageCarousel'
// import MapView, {Marker, AnimatedRegion} from 'react-native-maps'
import getAddressCoordinates from '../database_calls/api/GetAddressCoordinates'
import { Platform, Animated } from 'react-native'
import { GlobalValues } from '../GlobalValues'

// let MapView, Marker;
// if (Platform.OS !== "web") {
//   MapView = require("react-native-maps").default;
//   Marker = require("react-native-maps").Marker;
// }

export const PropertyInfo = () =>{

    const [property, setProperty] = useState(new Property({}))
    const [landlord, setLandlord] = useState(new User({}))
    const navigation = useNavigation()
    const theme = useTheme()
    const route = useRoute()
    const {propertyID} = route.params
    const mapRef = useRef(null)
    const [houseCoordinates, setHouseCoordinates] = useState(null)
    const isLandlord = GlobalValues.currentUser.isLandlord
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(()=>{
        const fetchData = async() => {
            const property = await getPropertyInfo();   // 1. Grab the property information
            await getLandlordInfo(property.landlordID)  // 2. After grabbing the property info, use it to grab the landlord's information
            await getAddress(property);
            console.log("coords: ", coords)
        };
        fetchData()
    }, [])

    const getPropertyInfo = async() => {
        const property = await getPropertyByID(propertyID)
        setProperty(property.resultData)
        return property.resultData

    }

    const getLandlordInfo = async(landlordID) => {
        const landlord = await getUserByID(landlordID)
        setLandlord(landlord.resultData)
    }

    const getAddress = async(property) => {

        const address = `${property.address}, ${property.city} ${property.state}`
        console.log(address)

        const houseCoordinates = await getAddressCoordinates(address)
        setHouseCoordinates(houseCoordinates)

        if (mapRef.current) {
        mapRef.current.animateToRegion({
            ...houseCoordinates,
            latitudeDelta: 0.005,   // Smaller = closer zoom
            longitudeDelta: 0.005,
        }, 1000); // duration in ms
        }
    }

    const applyForProperty = async() => {
        navigation.navigate('Apply Property', {'landlordID': landlord.userID, 'propertyID': propertyID}) // navigate to the property information page
    }

    return(
        <View style={[propertyInfo.container]}>
            
            {Platform.OS === 'web' ? (
                <Text></Text>
            ) : (
                <MapView 
            style={propertyInfo.maps}
            ref={mapRef}
            initialRegion={{
                ...houseCoordinates,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
            <Marker
                coordinate={houseCoordinates}
                title="House Location"
                description="This is where the house is"
                />
            </MapView>

            )}

            <Animated.View
                style={[
                    propertyInfo.bottomPortion,
                    {
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '60%',
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, 300],
                                outputRange: [0, -100],
                                extrapolate: "clamp",
                            }),
                        },
                    ],
                },
                ]}
            >
                <Animated.ScrollView
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                >

                    <View>
                        <Icon 
                        name="chevron-up" 
                        size={30} color={theme.logoColor.color} 
                        style={{alignSelf: 'center', marginTop: 10, marginBottom: 10}}
                        />

                        <View style={{paddingHorizontal: 10}}>

                            {property.images.length > 0 ? (
                                <ImageCarousel images={property.images} imageStyle={{borderRadius: 8, height: 300}}/>
                            ) : (
                                <Text></Text> // empty tag to display nothing
                            )}

                        </View>

                        <View style={propertyInfo.content}>

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
                                src={landlord.profilePicture}
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
                    </View>

            </Animated.ScrollView>
        </Animated.View>
            
            
            {isLandlord == false && (
                <View style={propertyInfo.buttonContainer}>
                // Schedule and Apply buttons at the bottom of the page only if you are renter
                <View style={propertyInfo.buttons}>
                    <PrimaryButton
                    title="Shedule Visit"
                    // Need to implement the schedule visit functionality 
                    />
                    <PrimaryButton
                    title="Apply Now"
                    onPress={() => applyForProperty()}
                    />
                </View>
                </View>
            )}
            


        </View>
    )
}

export default PropertyInfo

const propertyInfo = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
    },
    content:{
        alignItems: 'center',
        paddingHorizontal: 30
    },
    image:{
        height: 274,
        width: 400,
        marginTop: 10,
        borderRadius: 8
    },
    info:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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

        boxShadowColor: '#000',
        boxShadowOffset: { width: 0, height: 4 },
        boxShadowOpacity: 0.2,
        boxShadowRadius: 4,
    },
    buttons:{
        flexDirection: 'row',
        gap: 10,
        alignSelf: 'center',
        marginBottom: 10,
    },
    buttonContainer:{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f0efef',
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

        boxShadowColor: '#000',
        boxShadowOffset: { width: 0, height: 4 },
        boxShadowOpacity: 0.2,
        boxShadowRadius: 4,
        // marginBottom: 20,
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
    },
    bottomPortion:{
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        backgroundColor: '#f0efef',
    },
    maps:{
        width: '100%',
        height: '40%',
    }
})