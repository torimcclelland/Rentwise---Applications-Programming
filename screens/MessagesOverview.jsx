import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import userImage from '../components/profileexample.png';
import styles from '../styles/MessagesOverviewStyle';
import { useTheme } from '../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { GlobalValues } from '../GlobalValues';
import { getConversationsByUser } from '../database_calls/conversation/GetConversationsByUser';

const filters = ['All Messages', 'Newest', 'Oldest', 'Active'];

const MessagesOverview = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [conversations, setConversations] = useState([])
  const [isLandlord, setIsLandlord] = useState(false);// just for easy access

  // grab all the conversations of this user
  useEffect(()=>{
    setIsLandlord(GlobalValues.currentUser.isLandlord)
    // fetch user messages
    fetchUserMessages();
  }, [])


  const fetchUserMessages = async () => {
    
    const result = await getConversationsByUser(GlobalValues.currentUser.userID)

    if(!result.success){
      console.log("error happened here (surely there's a better way to do error handling :| )")
      console.log(result.errorMsg)
      return;
    }

    setConversations(result.resultList)
  }


  const handlePress = (conversation) => {
    GlobalValues.conversationData = conversation
    navigation.navigate('Specific Message');
  };

  return (
    <View style={[styles.container, theme.container]}>
      {/* Header */}
      <Text style={[styles.header, theme.textColor]}>Messages (Landlord)</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={index} style={styles.filterButton}>
            <Text style={styles.filterText}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Message List */}
      <ScrollView contentContainerStyle={styles.messageList}>
        {conversations.map((convo, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.messageCard, theme.textField]}
            onPress={() => handlePress(convo)}
          >

            { isLandlord && 
              <View>
                  <Image source={convo.renterData.profilePicture} style={styles.profileImage} />
                  <View style={styles.messageTextContainer}>
                    <Text style={[styles.username, theme.textColor]}>{convo.renterData.firstName}</Text>
                  </View>
              </View>
            }

            { !isLandlord &&
            
              <View>
                <Image source={convo.landlordData.profilePicture} style={styles.profileImage} />
                <View style={styles.messageTextContainer}>
                  <Text style={[styles.username, theme.textColor]}>{convo.landlordData.firstName}</Text>
                </View>
              </View>
            }
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        <BottomNavBar selectedTab="messages" />
      </View>
    </View>
  );
};

export default MessagesOverview;

