import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/Feather';
import { GlobalValues } from '../GlobalValues'
import { createProperty } from '../database_calls/property/CreateProperty'
import {View, Text, Pressable, Modal, Image, StyleSheet, ScrollView} from 'react-native'
import DropDown from '../components/DropDown'
import TextField from '../components/TextField'
import PrimaryButton from '../components/PrimaryButton'
import CustomDivider from '../components/divider'
import { useTheme } from '../ThemeContext';
import TextFieldLong from '../components/TextFieldLong';
import { User } from '../models/User';
import { updateUser } from '../database_calls/user/UpdateUser';
import { stylesModal } from '../styles/ModalStyle';
import Profile from '../components/profile';
import { uploadImage } from '../database_calls/uploadImages';

export const EditUserModal = ({visible, onClose}) =>{
    
  // declare variables
    const theme = useTheme()

    const [email, setEmail] = useState(GlobalValues.currentUser.email)
    const [password, setPassword] = useState(GlobalValues.currentUser.password)
    const [firstName, setFirstName] = useState(GlobalValues.currentUser.firstName)
    const [lastName, setLastName] = useState(GlobalValues.currentUser.lastName)
    const [profilePicture, setProfilePicture] = useState(GlobalValues.currentUser.profilePicture)
    const [membership, setMembership] = useState('Free Tier')

    const memberships = ['Free Tier', 'Premium Tier']
    // function to create the property and push to database
    const editUser = async() =>{
      const user = new User({
          userID: GlobalValues.currentUser.userID,
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          isLandlord:GlobalValues.currentUser.isLandlord,
          isPremUser:membership === 'Premium Tier',
          properties: GlobalValues.currentUser.properties,
          profilePicture: profilePicture
      })

      try{
          const result = await updateUser(user)

          if(!result.success){
            console.log("Error: " + result.errorMsg)
            return
          }
          // update global value
          GlobalValues.currentUser = result.userData
          // close the modal after submission
          onClose() 
      }catch(e){
          console.log("Error updating user:", e)
      }

    }

    const updateProfilePicture = async() => {
        const result = await uploadImage()
        setProfilePicture(result[0])

        GlobalValues.currentUser.profilePicture = profilePicture
    }
    
    return (
            <Modal
            visible={visible}
            transparent={true}
            onRequestClose={onClose} // for Android hardware back button
            animationType= 'slide' // pop-up slides up on the screen
            >
                <View style={stylesModal.centeredView}>
                        <View style={[stylesModal.contentView, {height: '55%'}]}>
                            <View style={stylesModal.banner}>
                                <View style={stylesModal.back}>
                                    <Pressable
                                    onPress={onClose}>
                                        <Icon name='arrow-left' size={24} color={theme.textColor.color}/>
                                    </Pressable>
                                    <Text style={[stylesModal.text, theme.textColor]}>Edit Personal Information</Text>
                                </View>
                                <CustomDivider/>
                            </View>

                            {/* This is the content--from profile picture to submit button--that will be scrollable */}
                            <ScrollView>
                                <View style={{alignSelf: 'center', alignItems: 'center', marginBottom: 10, flexDirection: 'column', gap: 10}}>
                                    <Profile src={profilePicture}/>
                                    <Pressable
                                    onPress={updateProfilePicture}>
                                        <Text style={{textDecorationLine: 'underline'}}>Edit Profile Picture</Text>
                                    </Pressable>
                                </View>
                            
                                <View style={stylesModal.spacing}>
                                    <TextField
                                    placeholder="First Name"
                                    value={firstName}
                                    onChangeText={setFirstName}
                                    />
                                    <TextField
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChangeText={setLastName}
                                    />
                                    <TextField
                                    placeholder="Email Address"
                                    value={email}
                                    onChangeText={setEmail}
                                    />
                                    <TextField
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    />
                                    <DropDown
                                    placeholder="Select Membership Type"
                                    options={memberships}
                                    value={membership}
                                    onSelect={setMembership}
                                    />
                                    <PrimaryButton
                                    onPress={editUser}
                                    title="Save"
                                    size="small"
                                    fontSize={12}
                                    />
                                </View>
                            </ScrollView>

                        </View>
                    </View>
            </Modal>
    )
}
