import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import styles from '../styles/FixitStyle';
import DropDown from '../components/DropDown';
import PrimaryButton from '../components/PrimaryButton';
import { createFixitRequest } from '../database_calls/fixitrequests/CreateFixitRequest';
import { FixitRequest } from '../models/FixitRequest';
import { useRoute } from '@react-navigation/native';
import { GlobalValues } from '../GlobalValues';

const Fixit = () => {
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [submittedAt, setSubmittedAt] = useState(null);
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
    try {
      const timestamp = new Date().toISOString();
      setSubmittedAt(timestamp);


      const newRequest = new FixitRequest({
        fixitID: "",
        userID: renterID,
        category,
        explanation: details,
        submissiontime: timestamp,
        landlordID,
        propertyID
      });

      // Call backend to create request
      const result = await createFixitRequest(newRequest);

      if (result.success) {
        Alert.alert(
          'Request Submitted',
          `Category: ${category}\nDetails: ${details}\nSubmitted At: ${timestamp}`
        );
        setCategory('');
        setDetails('');
      } else {
        Alert.alert('Submission Failed', result.message);
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'Unexpected error occurred.');
    }
  };

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
