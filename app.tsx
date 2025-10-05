import React, { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet } from "react-native";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function App() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  const addUser = async () => {
    console.log(name);
    try {
      await addDoc(collection(db, "landlordusers"), {
        name: name,
        createdAt: new Date()
      });
      setStatus("✅ User added!");
      setName("");
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("❌ Failed to add user.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add User to Firebase</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Add User" onPress={addUser} />
      {status ? <Text style={styles.status}>{status}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, width: "100%", padding: 10, marginBottom: 10 },
  status: { marginTop: 10 }
});

