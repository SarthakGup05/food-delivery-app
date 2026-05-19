import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CartScreen({ navigation }: { navigation: any }) {
  const { cart } = useContext(CartContext);
  const insets = useSafeAreaInsets();

  const calculateSubtotal = () => {
    return cart.reduce((sum: number, item: any) => sum + item.price, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 300 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + deliveryFee + taxes;

  if (cart.length === 0) {
    return (
      <View style={[styles.emptyContainer, { paddingTop: Math.max(insets.top, 20) }]}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="cart-outline" size={80} color="#6C757D" />
        </View>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Add items from your favorite restaurants to satisfy your cravings.
        </Text>
        <TouchableOpacity
          style={styles.emptyButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.emptyButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: Math.max(insets.top, 20) }]} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Your Cart</Text>

        {/* Item List */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Selected Items</Text>
          {cart.map((item: any, index: number) => (
            <View key={index} style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <View style={styles.itemDot} />
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
          ))}
        </View>

        {/* Bill Summary */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Item Subtotal</Text>
            <Text style={styles.billValue}>₹{subtotal}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Delivery Fee</Text>
            <Text style={styles.billValue}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billLabel}>Taxes & Charges (5%)</Text>
            <Text style={styles.billValue}>₹{taxes}</Text>
          </View>
          <View style={[styles.billRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalValue}>₹{grandTotal}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Footer */}
      <View style={[styles.footer, { bottom: Math.max(insets.bottom, 20) }]}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          activeOpacity={0.9}
          onPress={() => {
            alert("Order placed successfully! 🍕🎉");
            navigation.reset({
              index: 0,
              routes: [{ name: "Home" }],
            });
          }}
        >
          <Text style={styles.placeOrderText}>Place Order • ₹{grandTotal}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#495057",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
    paddingBottom: 12,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2E7D32",
    marginRight: 10,
  },
  itemName: {
    fontSize: 15,
    color: "#212529",
    fontWeight: "500",
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#212529",
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  billLabel: {
    fontSize: 14,
    color: "#6C757D",
  },
  billValue: {
    fontSize: 14,
    color: "#212529",
    fontWeight: "500",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
    paddingTop: 12,
    marginTop: 4,
    marginBottom: 0,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E23E3E",
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
  },
  placeOrderButton: {
    backgroundColor: "#E23E3E",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E23E3E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  placeOrderText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  emptyIconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 15,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  emptyButton: {
    backgroundColor: "#E23E3E",
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 25,
    shadowColor: "#E23E3E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});