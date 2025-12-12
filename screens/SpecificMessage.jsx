import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BottomNavBar from '../components/BottomNavBar';
import MessageBubble from '../components/MessageBubble';
import styles from '../styles/SpecificMessageStyle';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../components/PrimaryButton';
import TextFieldLong from '../components/TextFieldLong';
import { GlobalValues } from '../GlobalValues';
import { Conversation, Message } from '../models/Conversation';
import { User } from '../models/User';
import { getUserByID } from '../database_calls/user/GetUserByID';
import NotificationModal from '../components/NotificationModal';
import { addMessageToConveration } from '../database_calls/conversation/AddMessageToConversation';
import { useNavigation } from '@react-navigation/native';
import { snapshotToConversation } from '../models/ConversionFunctions';


const SpecificMessage = () => {

  const theme = useTheme();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [thisUser, setThisUser] = useState({})
  const [otherUser, setOtherUser] = useState({})
  const [conversation, setConversation] = useState({})

  const navigation = useNavigation();

  // error handling
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toggleErrorModal = () => setModalErrorVisible(!errorModalVisible);

// make values for landlord and for conversation, then set them all in the useEffect below vvv
  // called when this page is navigated to
  useEffect(()=>{

    // grab the convesation data object from global values (first make sure data isn't null)
    if(GlobalValues.conversationData == null){
      setConversation(new Conversation())
      setThisUser(new User())
      setOtherUser(new User())

      // show error
      setErrorMessage("Error loading conversation");
      toggleErrorModal()
      // should probably navigate away, but we can figure that out later.
      return;
    }

    const convoData = GlobalValues.conversationData
    // otherwise we have success!
    setConversation(convoData)
    setMessages(convoData.messages)

    // fetch user data of both users
    setUserData();
    

    let unsubscribe = null
    // We can await in here
    async function fetchData() {
      
      const tempDoc = doc(db, 'Conversations', GlobalValues.conversationData.conversationID);
  
      // this sets up our "listener" to the current user's notifications
      unsubscribe = onSnapshot(tempDoc, (snapshot) => {
        
          if (snapshot.exists) {
            
            const convo = snapshotToConversation(snapshot)
            
            if(!convo.success){
              console.error("Error fetching conversation: ", convo.errorMsg)
              return
            }

            setConversation(convo.resultData)
            setMessages(convo.resultData.messages)
          }
        }, error => {
          console.error("Error fetching notifications: ", error);
        }
      );
    }
    fetchData();

    // This is for clean up after
    return () => {
      unsubscribe();
    };

  }, [])

//*****************************************


//*****************************************

  const setUserData = async () => {
    let fetchingRenter = await getUserByID(GlobalValues.conversationData.renterID)

    if(!fetchingRenter.success){
      // show error
      setErrorMessage("Error fetching renter user data");
      toggleErrorModal()
      return;
    }

    let fetchingLandlord = await getUserByID(GlobalValues.conversationData.landlordID)

    if(!fetchingLandlord.success){
      // show error
      setErrorMessage("Error fetching landlord user data");
      toggleErrorModal()
      return;
    }
    
    // set users based on whether current user is landlord or not
    if(GlobalValues.currentUser.isLandlord){
      setThisUser(fetchingLandlord.resultData)
      setOtherUser(fetchingRenter.resultData)
    } else {
      setThisUser(fetchingRenter.resultData)
      setOtherUser(fetchingLandlord.resultData)
    }

  }

  useEffect(()=>{
    // set screen title
    navigation.setOptions({
      title: otherUser.firstName || 'Conversation', // Set dynamic title
    });
  }, [otherUser])


  // send message (add to conversation)
  const handleSend = async () => {
    if (inputText.trim()) {
      const newMessage = new Message({
        messageText: inputText,
        senderID: thisUser.userID,
        datetime: new Date().toISOString(),
      });

      // send to backend before showing on frontend
      const result = await addMessageToConveration(newMessage, conversation.conversationID)

      if(!result.success){
        // show error
        setErrorMessage(result.errorMsg);
        toggleErrorModal()
        return;
      }

      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, theme.container]}>
        {/* Header
        <View style={styles.headerContainer}>
          <Icon name="account-circle-outline" size={24} color={theme.textColor?.color || '#333'} />
          <Text style={[styles.header, theme.textColor || { color: '#333' }]}>
            Conversation with Mrs. Landlord
          </Text>
        </View> */}

        {/* Message Thread */}
        <View style={styles.messageContainer}>
          <ScrollView contentContainerStyle={styles.messageList}>
            {messages.map((msg, index) => (
              <MessageBubble
                key={index}
                text={msg.messageText}
                fromUser={msg.senderID === GlobalValues.currentUser.userID}
                timestamp={msg.datetime}
              />
            ))}
          </ScrollView>
          <NotificationModal 
            visible={errorModalVisible} 
            onClose={toggleErrorModal} 
            message={errorMessage} 
          />
        </View>

        {/* Input and Bottom Navigation */}
        <View style={styles.bottomContainer}>
          <View style={styles.inputBar}>
            <TextFieldLong
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message..."
              customStyle={styles.textField}
            />
            <PrimaryButton
              title="Send"
              size="small"
              onPress={handleSend}
              disabled={!inputText.trim()}
              customStyle={styles.sendButton}
            />
          </View>
          <BottomNavBar selectedTab="messages" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SpecificMessage;
