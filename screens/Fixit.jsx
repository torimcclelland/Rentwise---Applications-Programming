import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './FixitStyle';

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

    // Simulate form submission
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
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Choose Category --" value="" />
          {maintenanceCategories.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
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
