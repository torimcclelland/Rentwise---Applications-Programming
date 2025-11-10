import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/FixitStyle';
import DropDown from '../components/DropDown';

const Fixit = () => {
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState('');
  const [submittedAt, setSubmittedAt] = useState(null);

  const maintenanceCategories = [
    'Plumbing',
    'Electrical',
    'Heating/Cooling',
    'Appliance Repair',
    'Pest Control',
    'General Repairs',
    'Other',
  ];

  const handleSubmit = () => {
    const timestamp = new Date().toISOString();
    setSubmittedAt(timestamp);

    Alert.alert('Request Submitted', `Category: ${category}\nDetails: ${details}\nSubmitted At: ${timestamp}`);
    
    // Reset form
    setCategory('');
    setDetails('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fixit Request Form</Text>

      <Text style={styles.label}>Select Maintenance Category:</Text>
      <View style={styles.pickerContainer}>
      <DropDown
              options={maintenanceCategories}
              value={selectedMethod}
              onSelect={setSelectedMethod}
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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Request</Text>
      </TouchableOpacity>

      {submittedAt && (
        <Text style={styles.timestamp}>Last submitted: {new Date(submittedAt).toLocaleString()}</Text>
      )}
    </View>
  );
};

export default Fixit;
