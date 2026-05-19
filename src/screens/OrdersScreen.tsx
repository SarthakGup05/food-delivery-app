import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const mockOrders = [
  {
    id: "ord-102",
    restaurant: "Pizza Hub",
    date: "19 May 2026, 09:12 PM",
    items: "1x Double Cheese Supreme Pizza, 1x Choco Lava Molten Cake",
    price: 569,
    status: "On the Way",
    statusColor: "#FFC107",
    statusIcon: "bicycle-outline",
  },
  {
    id: "ord-101",
    restaurant: "Burger Palace",
    date: "18 May 2026, 02:30 PM",
    items: "2x Chef's Special Combo",
    price: 598,
    status: "Delivered",
    statusColor: "#2E7D32",
    statusIcon: "checkmark-circle-outline",
  },
];

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 15) }]}>
        <Text style={styles.pageTitle}>Your Orders</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {mockOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.cardHeader}>
              <View style={styles.headerLeft}>
                <Text style={styles.restaurantName}>{order.restaurant}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: order.statusColor + "15" }]}>
                <Ionicons name={order.statusIcon as any} size={15} color={order.statusColor} style={{ marginRight: 4 }} />
                <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.itemsText} numberOfLines={2}>
                {order.items}
              </Text>
            </View>

            <View style={styles.cardFooter}>
              <Text style={styles.priceText}>Total: ₹{order.price}</Text>
              <TouchableOpacity style={styles.reorderButton} activeOpacity={0.8}>
                <Text style={styles.reorderText}>Reorder</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
    paddingBottom: 12,
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    marginRight: 10,
  },
  restaurantName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 13,
    color: "#6C757D",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardBody: {
    marginBottom: 16,
  },
  itemsText: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
    paddingTop: 12,
  },
  priceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
  },
  reorderButton: {
    borderColor: "#E23E3E",
    borderWidth: 1.5,
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  reorderText: {
    color: "#E23E3E",
    fontSize: 13,
    fontWeight: "bold",
  },
});
