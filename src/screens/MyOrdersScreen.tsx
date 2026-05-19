import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function MyOrdersScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="receipt-outline" size={80} color="#E23E3E" style={{ marginBottom: 16 }} />
        <Text style={styles.subtitle}>No Active Orders</Text>
        <Text style={styles.description}>You don't have any pending or active food delivery orders right now.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212529",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 20,
  },
});
