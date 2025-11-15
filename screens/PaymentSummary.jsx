import React from "react";
import { View, Text, FlatList } from "react-native";
import styles from "../styles/PaymentSummaryStyle";

const transactions = [
  {
    id: "1",
    date: "Nov 1, 2025",
    description: "Monthly Rent",
    amount: "$1,200.00",
    status: "Paid",
  },
  {
    id: "2",
    date: "Oct 15, 2025",
    description: "Maintenance Fee",
    amount: "$75.00",
    status: "Paid",
  },
  {
    id: "3",
    date: "Oct 1, 2025",
    description: "Monthly Rent",
    amount: "$1,200.00",
    status: "Paid",
  },
];

const PaymentSummary = () => {
  const renderItem = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.row}>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>{item.date}</Text>
        <Text
          style={[
            styles.status,
            item.status === "Paid" ? styles.paid : styles.pending,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default PaymentSummary;
