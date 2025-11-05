import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import TextField from '../components/TextField'
import PrimaryButton from '../components/PrimaryButton'
import DateTimePicker from '@react-native-community/datetimepicker'; // is not supported on web
import CustomDivider from '../components/divider';
import DropDown from '../components/DropDown';
import TextFieldLong from '../components/TextFieldLong';
import { GlobalValues } from '../GlobalValues';
import { Application } from '../models/Application';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../ThemeContext';
import Icon from 'react-native-vector-icons/Feather'
import { createApplication } from '../database_calls/application/CreateApplication';
import { Notification } from '../models/Notification';
import { createNotification } from '../database_calls/notifications/CreateNotification';
import NotificationModal from '../components/NotificationModal';

export const ApplicationPage = () => {

    const currentUser = GlobalValues.currentUser
    const renterID = currentUser.userID
    const route = useRoute()
    const {landlordID} = route.params
    const theme = useTheme()
    const applicationID = "setLater"

    // personal info
    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [email, setEmail] = useState(currentUser.email)
    const [dob, setDob] = useState(new Date()) // date of birth
    const [phoneNumber, setPhoneNumber] = useState("")
    const [DLNumber, setDLNumber] = useState("") // driver's license number
    const [maritalStatus, setMaritalStatus] = useState("")

    // rental history
    const [prevAddress, setPrevAddress] = useState("")
    const [startDate, setStartDate] = useState(new Date()) // start date for previous home
    const [endDate, setEndDate] = useState(new Date()) // end date for previous home
    const [presentLandlord, setPresentLandlord] = useState("")
    const [landlordPhone, setLandlordPhone] = useState("")
    const [leaveReason, setLeaveReason] = useState("")
    const [rentAmount, setRentAmount] = useState(0)

    // proposed occupants

    const submitApplication = async() => {

        const application = new Application({
            applicationID,
            landlordID,
            renterID,
            firstName,
            lastName,
            email,
            dob, 
            phoneNumber,
            DLNumber,
            maritalStatus,
            prevAddress,
            startDate,
            endDate,
            presentLandlord,
            landlordPhone,
            leaveReason,
            rentAmount
        })

        const result = await createApplication(application)
        console.log(result)

        toggleModal()

        const notificationID = "setLater"
        const userID = landlordID
        const message = "Application submitted for property by " + firstName + " " + lastName

        const notif = new Notification({
            notificationID,
            userID,
            message
        })

        const notifResult = await createNotification(notif)
        console.log(notifResult)
    }

    const [modalVisible, setModalVisible] = useState(false)
    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <View style={[application_style.container, theme.container]}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            >
            <View style={[application_style.infoCard, theme.textField]}>
                <Text style={[application_style.headers, theme.textColor]}>Personal Information</Text>
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
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                />
                <View style={application_style.times}>
                    <Icon name="calendar" size={15} color={theme.textColor.color}/>
                    <Text style={[theme.textColor, {marginLeft: 5}]}>Date of birth:</Text>

                    {/* This datetime picker only works in ExpoGo, not supported on web */}

                    <DateTimePicker 
                    testID="dateTimePicker"
                    value={dob}
                    mode="date" // Can also be "time" or "datetime"
                    is24Hour={true}
                    display="default" // "spinner" or "calendar" on Android
                    />
                </View>

                <TextField
                placeholder="Phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                />

                <TextField
                placeholder="Drivers License Number"
                value={DLNumber}
                onChangeText={setDLNumber}
                />

                <DropDown
                placeholder="Maritial Status"
                options={["Single", "Married"]}
                value={maritalStatus}
                onSelect={setMaritalStatus}
                />
            </View>

            <CustomDivider/>

            <View style={[application_style.infoCard, theme.textField]}>
                <Text style={[application_style.headers, theme.textColor]}>Rental History</Text>

                <TextField
                placeholder="Previous Address"
                value={prevAddress}
                onChangeText={setPrevAddress}
                />
                
                <View style={application_style.lengthOfTime}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
                        <Icon name="clock" size={15} color={theme.textColor.color}></Icon>
                        <Text style={[theme.textColor, {marginLeft: 8, fontSize: 16}]}>Length of Time at Previous Home</Text>
                    </View>
                    <View style={application_style.dates}>
                            <Text style={[theme.textColor]}>From</Text>
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={startDate}
                            mode="date" // Can also be "time" or "datetime"
                            is24Hour={true}
                            display="default" // "spinner" or "calendar" on Android
                            />
                            <Text style={[theme.textColor, {marginLeft: 5}]}>To</Text>
                            <DateTimePicker
                            testID="dateTimePicker"
                            value={endDate}
                            mode="date" // Can also be "time" or "datetime"
                            is24Hour={true}
                            display="default" // "spinner" or "calendar" on Android
                            />
                    </View>
                </View>

                <TextField
                placeholder="Present Landlord Name"
                value={presentLandlord}
                onChangeText={setPresentLandlord}
                />

                <TextField
                placeholder="Present Landlord Phone"
                value={landlordPhone}
                onChangeText={setLandlordPhone}
                />

                <TextFieldLong
                placeholder="Reason for Leaving"
                value={leaveReason}
                onChangeText={setLeaveReason}
                maxLength={200}
                />

                <TextField
                placeholder="Rent Amount"
                value={rentAmount}
                onChangeText={setRentAmount}
                textType="numeric"
                />

            </View>

            <PrimaryButton
            title="Submit"
            onPress={()=>submitApplication()}
            />
            </ScrollView>


            <NotificationModal visible={modalVisible} 
            onClose={toggleModal} 
            message="Application submitted!" />

                    
        </View>
    )
}

export default ApplicationPage

const application_style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    },
    headers:{
        alignSelf: 'center',
        fontWeight: 700,
        fontSize: 20,
    },
    times:{
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: "#E0E0E0", 
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    dates:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    infoCard:{
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'column',
        gap: 15,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 12
    },
    lengthOfTime:{
        borderColor: "#E0E0E0", 
        borderWidth: 1,
        borderRadius: 6,
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
})