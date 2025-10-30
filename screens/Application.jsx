import React, {useState} from 'react'
import {View, Text, ScrollView} from 'react-native'
import TextField from '../components/TextField'
import PrimaryButton from '../components/PrimaryButton'
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDivider from '../components/divider';
import DropDown from '../components/DropDown';
import TextFieldLong from '../components/TextFieldLong';
import { GlobalValues } from '../GlobalValues';


export const Application = () => {

    const currentUser = GlobalValues.currentUser

    // personal info
    const [firstName, setFirstName] = useState(currentUser.firstName)
    const [lastName, setLastName] = useState(currentUser.lastName)
    const [email, setEmail] = useState(currentUser.email)
    const [dob, setDob] = useState(new Date()) // date of birth
    const [phoneNumber, setPhoneNumber] = useState("")
    const [DLNumber, setDLNumber] = ("") // driver's license number
    const [maritialStatus, setMaritialStatus] = useState("")

    // rental history
    const [prevAddress, setPrevAddress] = useState("")
    const [startDate, setStartDate] = useState(new Date()) // start date for previous home
    const [endDate, setEndDate] = useState(new Date()) // end date for previous home
    const [presentLandlord, setPresentLandlord] = useState("")
    const [landlordPhone, setLandlordPhone] = useState("")
    const [leaveReason, setLeaveReason] = useState("")
    const [rentAmount, setRentAmount] = useState("")

    // proposed occupants

    const submitApplication = () => {

    }



    return (
        <View>
            <View style={{marginBottom: 10}}>
                <Text>Personal Information</Text>
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

                <Text>Date of birth:</Text>
                <DateTimePicker
                testID="dateTimePicker"
                value={dob}
                mode="date" // Can also be "time" or "datetime"
                is24Hour={true}
                display="default" // "spinner" or "calendar" on Android
                />

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
                value={maritialStatus}
                onSelect={setMaritialStatus}
                />
            </View>

            <CustomDivider/>

            <View>
                <Text>Rental History</Text>

                <TextField
                placeholder="Previous Address"
                value={prevAddress}
                onChangeText={setPrevAddress}
                />
                
                <Text>Length of Time at Previous Home</Text>
                <Text>From</Text>
                <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode="date" // Can also be "time" or "datetime"
                is24Hour={true}
                display="default" // "spinner" or "calendar" on Android
                />
                <Text>To</Text>
                <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode="date" // Can also be "time" or "datetime"
                is24Hour={true}
                display="default" // "spinner" or "calendar" on Android
                />

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
                onChangeText={rentAmount}
                textType="numeric"
                />
            </View>

            <PrimaryButton
            title="Submit"
            />
                
        </View>
    )
}

export default Application