import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { getNotificationByUser } from "../database_calls/notifications/GetNotificationByUser";
import { GlobalValues } from '../GlobalValues';
import InfoCard from '../components/InfoCard';

const Notifications = () => {

    const userID = GlobalValues.currentUser.userID
    const [notifList, setNotifList] = useState([])

    useEffect(()=>{
        getNotifications();
      }, [])

      const getNotifications = async() => {

        const result = await getNotificationByUser(userID)
        setNotifList(result.resultList)

      }
    return (
        <View style={notifs.container}>
            <View>

                { notifList.length > 0 ? (
                    notifList.map(item => (
                        <InfoCard
                        key={item.notificationID?.toString()}
                        title = "New notification"
                        subtitle = {item.message}
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