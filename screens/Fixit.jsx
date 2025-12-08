import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import styles from '../styles/FixitStyle';
import DropDown from '../components/DropDown';
import PrimaryButton from '../components/PrimaryButton';
import { createFixitRequest } from '../database_calls/fixitrequests/CreateFixitRequest'
import { FixitRequest } from '../models/FixitRequest';
import { GlobalValues } from '../GlobalValues';
import { useNavigation, useRoute } from '@react-navigation/native'
import { addNotifToList } from '../database_calls/notifications/AddNotifToList';
import { Notification } from '../models/Notification';
import { createFixitRequest } from '../database_calls/fixitrequests/CreateFixitRequest';
import { FixitRequest } from '../models/FixitRequest';
import { useRoute } from '@react-navigation/native';
import { GlobalValues } from '../GlobalValues';

const Fixit = () => {
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [submittedAt, setSubmittedAt] = useState(null);
  const user = GlobalValues.currentUser;
  const route = useRoute();
  const { landlordID } = route.params 
  const currentUser = GlobalValues.currentUser
  const renterID = currentUser.userID
  const route = useRoute()
  const { landlordID = "", propertyID = "" } = route.params || {};

  const maintenanceCategories = [
    'Plumbing',
    'Electrical',
    'Heating/Cooling',
    'Appliance Repair',
    'Pest Control',
    'General Repairs',
    'Other',
  ];

  const handleSubmit = async () => {

    const timestamp = new Date().toISOString();

    const request = new FixitRequest({
      userID: user.userID,
      explanation: details,
      category: category,
      submissontime: timestamp,
      landlordID: landlordID,
      propertyID: user.propertyId
    })

    const result = await createFixitRequest(request)
    console.log(result)

    await sendNotification();

    setSubmittedAt(timestamp);

    Alert.alert('Request Submitted', `Category: ${category}\nDetails: ${details}\nSubmitted At: ${timestamp}`);
    
    // Reset form
    setCategory('');
    setDetails('');
  };

  const sendNotification = async () => {
    const notif = new Notification({
      datetime: new Date().toISOString(),
      message: `New fixit request submitted by ${user.firstName} ${user.lastName}: ${category}`,
      isNew: true
    })

    const result = await addNotifToList(notif, landlordID);
    console.log(result)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fixit Request Form</Text>

      <Text style={styles.label}>Select Maintenance Category:</Text>
      <View style={styles.pickerContainer}>
        <DropDown
          options={maintenanceCategories}
          value={category}
          onSelect={setCategory}
          placeholder="Select an issue category"
        />
      </View>

      <Text style={styles.label}>Describe the issue:</Text>
      <TextInput
        style={styles.textFieldLong}
        multiline
        numberOfLines={6}
        placeholder="Please describe what’s wrong in detail..."
        value={details}
        onChangeText={setDetails}
      />

      <PrimaryButton
        title="Submit Request"
        style={styles.submitButton}
        onPress={handleSubmit}
      >
        <Text style={styles.submitText}>Submit Request</Text>
      </PrimaryButton>

      {submittedAt && (
        <Text style={styles.timestamp}>
          Last submitted: {new Date(submittedAt).toLocaleString()}
        </Text>
      )}
    </View>
  );
};

export default Fixit;
