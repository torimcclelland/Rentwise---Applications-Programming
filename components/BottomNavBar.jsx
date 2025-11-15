import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/BottomNavBarStyle';
import Profile from './profile';
import exampleImage from './profileexample.png';
import { GlobalValues } from '../GlobalValues';
import { useTheme } from '../ThemeContext';
import { Badge } from 'react-native-elements';
import { db } from '../firebaseConfig';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { getNotifListByUserID } from '../database_calls/notifications/GetNotifListByUserID';
import { snapshotToNotifUserList } from '../models/ConversionFunctions';

const BottomNavBar = ({ selectedTab }) => {
  
  const navigation = useNavigation();
  const currentUser = GlobalValues.currentUser
  const userType = currentUser.isLandlord // check if the user is a landlord 
  const [hasNewNotifs, setNewNotifs] = useState(false)

  const theme = useTheme()
  
  const tabs = [
    { name: 'search', icon: 'compass-outline', route: 'Browse Properties' },
    { name: 'messages', icon: 'chat-outline', route: 'Messages' },
    { name: 'home', 
      icon: 'home-outline', 
      route: userType === true ? 'Landlord Dashboard' : 'Renter Dashboard'},
    { name: 'notifications', icon: 'bell-outline', route: 'Notifications' },
    { name: 'profile', icon: null, route: 'User Profile' }, // Profile uses custom component
  ];

  // runs when first "mounted", return runs when we're done I guess
  useEffect(() => {
    let unsubscribe = null
    // We can await in here
    async function fetchData() {
      // need the notification id (could be improved! (MARSH))
      const tempNotif = await getNotifListByUserID(currentUser)

      if(!tempNotif.success){
        console.log("ERROR!")
        console.log(tempNotif.errorMsg)
        return;
      }
      
      const tempDoc = doc(db, 'Notifications', tempNotif.resultData.notifID);
  
      // this sets up our "listener" to the current user's notifications
      unsubscribe = onSnapshot(tempDoc, (snapshot) => {
        
          if (snapshot.exists) {
            
            const notifList = snapshotToNotifUserList(snapshot)
            
            // only check for unread notifications if we have 
            if(notifList.length > 0){
              notifList.forEach(notif => {
                if(notif.isNew){
                  setNewNotifs(true)
                }
              });
            }
          }
        }, error => {
          console.error("Error fetching notifications: ", error);
        });
    }
    fetchData();

    // This is for clean up after
    return () => {
      unsubscribe();
    };
  }, []);


  const handleTabPress = (tab) => {
    if (tab.route) {
      navigation.navigate(tab.route);
    }
  };

  return (
    <View style={[styles.container, theme.container]}>
      {tabs.map((tab) => (
        <TouchableOpacity key={tab.name} onPress={() => handleTabPress(tab)}>
          {tab.name === 'profile' ?
            // Is the profile?
            (
            <Profile
              src={currentUser.profilePicture}
              size={28}
              style={{
                borderWidth: selectedTab === 'profile' ? 2 : 0,
                borderColor: '#007AFF',
              }}
            />
          ) : ( // is not the profile (SAM: try to get the styling working here)
            <View>
            {tab.name === 'notifications' && hasNewNotifs ? (
              <View styling={styles.elementwithchildren}>
                <Icon
                  name={tab.icon}
                  size={28}
                  color={selectedTab === tab.name ? '#007AFF' : '#999'}
                />
                <View styling={styles.rightaligned}>
                  <Badge status="success"/>
                </View>
              </View>
              //<Text>Look for this!</Text>
            ) : (
              // if other, just show it's icon
              <Icon
                name={tab.icon}
                size={28}
                color={selectedTab === tab.name ? '#007AFF' : '#999'}
              />
            )}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavBar;
