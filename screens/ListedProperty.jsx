import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { useRoute } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import CustomDivider from '../components/divider'
import PrimaryButton from '../components/PrimaryButton'




export const ListedProperty = () => {

    const [applicationList, setApplicationList] = useState(['application 1', 'application 2'])
    const route = useRoute() // need to grab the landlord id as well from useRoute 
    const {propertyID} = route.params

    useEffect(()=>{
    getApplications();
  }, []) 

    const getApplications = async() => {
        // here we call the function to get all of the applications by Landlord 
    }

    const seeApplication = async() => {

    }

    return (
        <View style={listedProp.container}>

            <View style={listedProp.topSections}>
                <View style={listedProp.appBox}>
                <Text>{applicationList.length}</Text>
                    <Text> Applications</Text>
                </View>
                {/*This view should be blurred for non-premium landlords */}
                <View style={listedProp.appBox}>
                    <Text>10</Text>
                    <Text>Views</Text>
                </View>
            </View>

            <View style={listedProp.applicationList}>
                {/* Here we render the list of applications */}
                {applicationList.length > 0 ? (
                    <FlatList
                    data={applicationList}
                    style={{flex: 1}}
                    keyExtractor={item => item}
                    renderItem={({item}) =>
                        <View style={listedProp.applicationCard}>
                            <Text>{item}</Text>
                            <PrimaryButton
                            title="View Application"
                            size="small"
                            onPress={seeApplication}
                            />
                            <CustomDivider />
                        </View>
                    }
                    />
                ) : (

                    <Text>No Applications</Text>
                )}
            </View>
        </View>
    )
}

export default ListedProperty

const listedProp = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        width: '100%'
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
        backgroundColor: '#FFF'
    },
    topSections: {
        flexDirection: 'row', 
        gap: 16,
        marginTop: 10,
        alignSelf: 'center'
    },
    applicationList: {
        paddingHorizontal: 10,
        marginTop: 20,
        width: '100%',
        flex: 1
    },
    applicationCard: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


})