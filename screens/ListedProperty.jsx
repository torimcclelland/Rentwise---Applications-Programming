import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient';
import CustomDivider from '../components/divider'
import PrimaryButton from '../components/PrimaryButton'
import { getApplicationByProperty } from '../database_calls/application/GetApplicationByProperty'
import { GlobalValues } from '../GlobalValues'
import { getUserByID } from '../database_calls/user/GetUserByID'
import Profile from '../components/profile'




export const ListedProperty = () => {

    const [applicationList, setApplicationList] = useState([])
    const [rentersList, setRenterList] = useState([])
    const route = useRoute() // need to grab the landlord id as well from useRoute 
    const navigation = useNavigation()
    const {propertyID} = route.params
    console.log(propertyID)
    const landlord = GlobalValues.currentUser

    useEffect(()=>{
        const fetchData = async() => {
            const applications = await getApplications()
            console.log(applications)

            const renters = await Promise.all(
                applications.map(app => getUserByID(app.renterID))
            );

            const combined = applications.map((app, i) => ({
                ...app,
                renter: renters[i]?.resultData
            }))

            setApplicationList(combined)
            console.log(combined)
        };
        fetchData()
  }, []) 

    const getApplications = async() => {
        const result = await getApplicationByProperty(propertyID)

        return result.resultList
    }

    const seeApplication = async(applicationID) => {
        navigation.navigate('View Application', {'applicationID': applicationID})
    }


    return (
        <View style={listedProp.container}>

            <View style={listedProp.topSections}>
                <View style={listedProp.appBox}>
                    <LinearGradient
                    colors={['#EFF6FF', '#FFFFFF']} // light blue → white gradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={listedProp.appBox}
                    >
                        <Text style={listedProp.numberings}>{applicationList.length}</Text>
                        <Text> Applications</Text>
                    </LinearGradient>
                </View>
                {/*This view should be blurred for non-premium landlords */}
                <View style={listedProp.appBox}>
                    <LinearGradient
                        colors={['#EFF6FF', '#FFFFFF']} // light blue → white gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={listedProp.appBox}
                    >
                        <Text style={listedProp.numberings}>10</Text>
                        <Text>Views</Text>
                    </LinearGradient>
                </View>
            </View>

                {/* Here we render the list of applications */}
                {applicationList.length > 0 || applicationList == null ? (
                    <FlatList
                    data={applicationList}
                    style={{ flex: 1, width: '100%', paddingHorizontal: 16, marginTop: 20 }}
                    keyExtractor={item => item.applicationID.toString()}
                    renderItem={({item}) =>
                        <View style={listedProp.applicationList}>
                            <View style={listedProp.applicationCard}>
                                <View style={listedProp.nameProfilePic}>
                                    <Profile src={item.renter.profilePicture} size={40}/>
                                    <Text>{item.renter.firstName} {item.renter.lastName}</Text>
                                </View>
                                <PrimaryButton
                                title="View Application"
                                size="small"
                                onPress={() => seeApplication(item.applicationID)}
                                />
                            </View>
                            <CustomDivider />
                        </View>
                    }
                    />
                ) : (

                    <Text>No Applications</Text>
                )}
        </View>
    )
}

export default ListedProperty

const listedProp = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    appBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 10,
        height: 100,
        width: 100,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: 'white'
    },
    topSections: {
        flexDirection: 'row', 
        gap: 16,
        marginTop: 10,
        alignSelf: 'center'
    },
    applicationList: {
        width: '100%',
        flex: 1,
        marginBottom: 20
    },
    applicationCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    nameProfilePic:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    numberings:{
        fontSize: 30,
        fontWeight: 600,
        fontFamily: 'system-ui',
        color: '#034974'
    }

})