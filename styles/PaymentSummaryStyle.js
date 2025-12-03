import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 40,
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    boxShadowColor: "#000",
    boxShadowOpacity: 0.05,
    boxShadowRadius: 6,
    boxShadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB", //blue
  },
  date: {
    fontSize: 14,
    color: "#6B7280",
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  paid: {
    color: "#10B981",//green
  },
  pending: {
    color: "#F59E0B", //amber
  },
});

export default styles;
