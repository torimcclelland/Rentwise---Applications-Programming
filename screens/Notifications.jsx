import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { GlobalValues } from '../GlobalValues';
import InfoCard from '../components/InfoCard';
import { getNotifListByUserID } from '../database_calls/notifications/GetNotifListByUserID';

const Notifications = () => {

    const [notifList, setNotifList] = useState([])

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
   
    return (
        <View style={notifs.container}>
            <View>

                { notifList.length > 0 ? (
                    notifList.map(item => (
                        <InfoCard
                        key={item.notificationID?.toString()}
                        title = {item.message}
                        subtitle = {item.datetime}
                        />
                    ))

                    
                ) : (
                    <Text> No notification</Text>
                )}

                </View>

            {/* Bottom Navigation Bar */}
            <BottomNavBar selectedTab="notifications" />
        </View>
    );
}
export default Notifications;

const notifs = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    }
})