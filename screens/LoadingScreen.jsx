import React from "react";
import { View, Text } from "react-native";
import Loader from "../components/Loader";
import styles from "../styles/LoadingScreenStyle";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Loader />
      <Text style={styles.text}>Loading, please wait...</Text>
    </View>
  );
};

export default LoadingScreen;
