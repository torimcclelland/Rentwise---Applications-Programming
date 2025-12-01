import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Pressable, ScrollView} from 'react-native'
import { getApplicationByID } from '../database_calls/application/GetApplicationByID'
import { getUserByID } from '../database_calls/user/GetUserByID'
import { useRoute } from '@react-navigation/native'
import { Application } from '../models/Application'
import { User } from '../models/User'
import Profile from '../components/profile'
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalValues } from '../GlobalValues'
import PrimaryButton from '../components/PrimaryButton'
import CustomDivider from '../components/divider'
import NotificationModal from '../components/NotificationModal'
import { createConversation } from '../database_calls/conversation/CreateConversation'

const ViewApplication = () => {

    const route = useRoute()
    const {applicationID} = route.params

    const [application, setApplication] = useState(new Application({}))
    const [renter, setRenter] = useState(new User({}))
    const [modalVisible, setModalVisible] = useState(false)
    const landlord = GlobalValues.currentUser

    // error handling stuff
    
    const [errModalVisible, setErrModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const toggleErrorModal = () => setErrModalVisible(!errModalVisible);

    useEffect(() => {
        const fetchData = async() => {
            const application = await getApplication()
            await getRenter(application.renterID)

        };
        fetchData();
    }, [])

    const getApplication = async() => {
        let application = await getApplicationByID(applicationID)
        // copying the data into a new variable so we can manipulate the date
        let appData = application.resultData;

        // firestore stores dates as a timestep in the form {seconds: x, nanoseconds: y}

        appData.dob = await formatDate(appData.dob)
        appData.startDate = await formatDate(appData.startDate)
        appData.endDate = await formatDate(appData.endDate)
    
        setApplication(appData);
        return application.resultData

    }

    const formatDate = async(data) => {

        let formattedDate

        if (data.seconds) {
            const date = new Date(data.seconds * 1000); 

            formattedDate = date.toLocaleDateString('en-US', {
            month: 'long',   // "November"
            day: 'numeric',  // "8"
            year: 'numeric', // "2025"
            });
        }

        return formattedDate

    }

    const getRenter = async(renterID) => {
        const renter = await getUserByID(renterID)
        console.log(renter.resultData)
        setRenter(renter.resultData)
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    const showReviews = async() => {
        if(!landlord.isPremUser){
            toggleModal()
        }
        console.log(landlord.isPremUser)

    }

    const onPressMessage = async() => {
        console.log("starting conversation...")

        const result = await createConversation(renter.userID, landlord.userID)

        if(!result.success){
            
            console.log("Error:" + result.errorMsg);
            setErrorMessage("Error:" + result.errorMsg);
            toggleErrorModal();
            return;
        }

        // if success, navigate to conversation
    }

    return (
        <View style={application_styles.container}>
            <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            >

                <View style={application_styles.basicInfo}>
                    <Profile src={renter.profilePicture} size={90}/>
                    <View style={{flexDirection: 'column', gap: 8}}>
                        <Text style={application_styles.name}>{renter.firstName} {renter.lastName}</Text>
                        <Text style={{fontWeight: 500, fontSize: 15}}>{renter.email}</Text>
                        <Text style={application_styles.otherInfo}>{application.phoneNumber}</Text>
                        <Text style={application_styles.otherInfo}>{application.maritalStatus}</Text>
                    </View>
                </View>

                <View style={application_styles.ratings_dob}>

                    <Pressable style={application_styles.ratings} onPress={showReviews}>

                        <LinearGradient
                        colors={['#d9e5f6ff', '#FFFFFF']}
                        start={{x: 0, y: 0}}
                        end={{x:1, y: 1}}
                        style={[application_styles.ratings, {width: 180}]} // setting the width for the gradient manually to fit hte outer view 
                        >
                            <Icon name="star" size={40} color='#034974'/>
                            <Text style={{marginTop: 8, fontSize: 15, font: 'Inter', fontWeight: 500}}>View Ratings</Text>
                        </LinearGradient>

                    </Pressable>

                    <NotificationModal message="Only Premium Users can see reviews!" visible={modalVisible} onClose={toggleModal} />

                    <View style={application_styles.ratings}>
                            <Icon name="calendar-o" size={40} color='#034974' />
                            <Text style={{marginTop: 8, fontSize: 15, font: 'Inter', fontWeight: 500}}>{application.dob}</Text>
                    </View>

                </View>

                <View style={[application_styles.basicInfo, {marginBottom: 20}]}>
                    <Icon name="drivers-license" size={40} color='#034974' />
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontWeight: 500}}>Drivers License Number</Text>
                        <Text style={{fontSize: 20}}>{application.DLNumber}</Text>
                    </View>
                </View>

                <View style={{height: 1, width: '100%', backgroundColor: '#8f8e8eff'}}></View>

                <View style={[application_styles.basicInfo, {marginTop: 20}]}>
                    <Icon name="home" size={40} color='#034974' />
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontWeight: 500}}>Previous Address</Text>
                        <Text style={{fontSize: 20}}>{application.prevAddress}</Text>
                    </View>
                </View>

                <View style={[application_styles.history, {flexDirection: 'row', width: '100%', justifyContent: 'space-between'}]}>

                    <View style={application_styles.lengthoftime}>
                        <Text style={{fontWeight: 600}}>Time at Previous address</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                            <Icon name="dot-circle-o" size={30} color='#034974'/>
                            <Text style={{fontWeight: 600}}>{application.startDate}</Text>
                        </View>
                        <View style={{width: 1, height: 100, backgroundColor: '#034974', marginLeft: 12}}></View>
                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                            <Icon name="dot-circle-o" size={30} color='#034974'/>
                            <Text style={{fontWeight: 600}}>{application.endDate}</Text>
                        </View>
                    </View>

                    <View style={application_styles.lengthoftime}>
                        <Text style={{fontWeight: 600}}>Previous Landlord Info</Text>
                        <Text style={application_styles.header}>Landlord Name</Text>
                        <Text style={{fontWeight: 600}}>{application.presentLandlord}</Text>
                        <Text style={application_styles.header}>Landlord Phone Number</Text>
                        <Text style={{fontWeight: 600}}>{application.landlordPhone}</Text>
                        <Text style={application_styles.header}>Rent Amount</Text>
                        <Text style={{fontWeight: 600}}>${application.rentAmount}</Text>
                    </View>
                </View>

                <View style={[application_styles.basicInfo, {marginBottom: 160}]}>
                    <View style={{flexDirection: 'column', gap: 16}}>
                        <View>
                            <Text style={application_styles.leaveReason}>Reason for Leaving</Text>
                        </View>
                        <View>
                            <Text>{application.leaveReason}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={application_styles.bottomBar}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                    <Profile src={renter.profilePicture} size={60} />
                    <Text style={{fontSize: 18, fontWeight: 500}}>{renter.firstName} {renter.lastName}</Text>
                </View>
                <PrimaryButton
                    title="Message"
                    iconName="message-text-outline"
                    size="large"
                    onPress={onPressMessage}
                />
            </View>

            <NotificationModal 
                visible={modalVisible} 
                onClose={toggleErrorModal} 
                message={errorMessage} 
            />

        </View>
    )
}

export default ViewApplication

const application_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 16,
    },
    basicInfo:{
        backgroundColor: 'white',
        width: '100%',
        padding: 20,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        alignSelf: 'center',
        marginTop: 10,
        boxShadowColor: '#000',
        boxShadowOffset: {width: 0, height: 4},
        boxShadowOpacity: 0.2,
        boxShadowRadius: 4
    },
    name: {
        fontSize: 30
    },
    otherInfo:{
        fontWeight: 500,
        fontSize: 15
    },
    ratings:{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '45%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadowColor: '#000',
        boxShadowOffset: {width: 0, height: 4},
        boxShadowOpacity: 0.2,
        boxShadowRadius: 4,

    },
    ratings_dob:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'space-between',
        width: '100%'
    },
    history:{
        marginTop: 20
    },
    lengthoftime: {
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        gap: 10,
        width: '49%',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        boxShadowColor: '#000',
        boxShadowOffset: {width: 0, height: 4},
        boxShadowOpacity: 0.2,
        boxShadowRadius: 4,
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },
    leaveReason:{
        color: '#034974',
        fontSize: 20,
        fontWeight: 600
    },
    header:{
        color: '#034974',
        fontSize: 15,
        fontWeight: 600
    }


})