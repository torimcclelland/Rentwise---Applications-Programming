import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { GlobalValues } from '../GlobalValues';
import InfoCard from '../components/InfoCard';
import { getNotifListByUserID } from '../database_calls/notifications/GetNotifListByUserID';
import PrimaryButton from '../components/PrimaryButton';
import NotificationModal from '../components/NotificationModal';
import { AddPropertyToRenter } from '../database_calls/user/AddPropertyToRenter';
import { Property } from '../models/Property';
import { getPropertyByID } from '../database_calls/property/GetPropertyByID';
import {updateProperty} from '../database_calls/property/UpdateProperty';

const Notifications = () => {

    const [notifList, setNotifList] = useState([])
    const [property, setProperty] = useState(new Property({}))
    useEffect(()=>{
        getNotifications();

    }, [])

    const getNotifications = async() => {
        const result = await getNotifListByUserID(GlobalValues.currentUser)
        setNotifList(result.resultData.notifications)

        await setAllToSeen()
    }

    const setAllToSeen = async() => {
        console.log('pretend we set all our notifcations to seen')
    }

    const declineInvite = async(notificationID) => {
        

    }

    const acceptInvite = async(propertyID) => {
        if (!propertyID || propertyID.trim() === ""){
            console.log("error: no propertyID found");
            return;
        }

        const result = await AddPropertyToRenter(propertyID);
        const property_response = await getPropertyByID(propertyID);
        setProperty(property_response.resultData);

        property.renterID = GlobalValues.currentUser.userID;
        const update_response = await updateProperty(property);

        console.log(update_response);
    }
   
    return (
        <View style={notifs.container}>
            <ScrollView>
            <View>

                { notifList.length > 0 ? (
                    notifList.map(item => (
                        <View>
                        <InfoCard
                        key={item.notificationID?.toString()}
                        title = {item.message.split("ID:")[0]}
                        subtitle = {item.datetime}
                        />

                        {item.message.includes("You have been invited to rent the property at") && (
                            <View style={notifs.buttonRow}>
                                <PrimaryButton
                                title="Accept"
                                onPress={() => acceptInvite(item.message.split("ID:")[1].trim())}
                                customStyle={{flex: 0.5}}
                                />
                                <PrimaryButton
                                title="Decline"
                                onPress={() => declineInvite(item.notificationID)}
                                customStyle={{ marginLeft: 10, flex: 0.5}}
                                />
                            </View>
                        )}

                        </View>


                    ))
 
                ) : (
                    <Text> No notification</Text>
                )}

                </View>

            {/* Bottom Navigation Bar */}
            <BottomNavBar selectedTab="notifications" />
            </ScrollView>
        </View>
    );
}
export default Notifications;

const notifs = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    buttonRow:{
        flexDirection: 'row',
        alignItems: 'center'
        
    }
})