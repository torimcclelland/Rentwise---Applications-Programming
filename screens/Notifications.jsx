import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import BottomNavBar from "../components/BottomNavBar";
import { GlobalValues } from '../GlobalValues';
import InfoCard from '../components/InfoCard';
import { getNotifListByUserID } from '../database_calls/notifications/GetNotifListByUserID';
import styles from '../styles/Notifications';
import { useTheme } from '../ThemeContext';

const Notifications = () => {
    const theme = useTheme();

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
        <View style={[styles.container, theme.container]}>
            <ScrollView contentContainerStyle={styles.messageList}>

                { notifList.length > 0 ? (
                    notifList.map((item, index) => (
                        <InfoCard
                            key={index}
                            title = {item.message}
                            subtitle = {item.datetime}
                        />
                    ))

                    
                ) : (
                    <Text> No notifications</Text>
                )}

                </ScrollView>

            {/* Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <BottomNavBar selectedTab="notifications" />
            </View>
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