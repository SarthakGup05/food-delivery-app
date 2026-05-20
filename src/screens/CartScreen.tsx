import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../context/ThemeContext";

export default function CartScreen({ navigation }: { navigation: any }) {
  const { cart, addToCart, removeFromCart, clearCart, placeOrder } = useContext(CartContext);
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();

  const calculateSubtotal = () => {
    return cart.reduce((sum: number, item: any) => sum + item.price * (item.quantity || 1), 0);
  };

  const subtotal = calculateSubtotal();
  const discount = subtotal > 300 ? Math.round(subtotal * 0.15) : 0; // 15% discount for orders above 300
  const deliveryFee = subtotal > 400 ? 0 : 39;
  const taxes = Math.round((subtotal - discount) * 0.05); // 5% GST
  const grandTotal = subtotal - discount + deliveryFee + taxes;

  if (cart.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background, paddingTop: Math.max(insets.top, 20) }]}>
        <View style={[styles.emptyIconCircle, { backgroundColor: colors.border }]}>
          <Ionicons name="cart-outline" size={80} color="#FF6B35" />
        </View>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Your Cart is Empty</Text>
        <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
          Add items from your favorite restaurants to start a new order now!
        </Text>
        <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.browseBtnText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border, paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Checkout</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Ordering from Restaurant Palace</Text>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
          <Text style={styles.clearBtnText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Delivery Details */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.deliveryRow}>
            <View style={styles.deliveryIconCircle}>
              <Ionicons name="location" size={20} color="#FF6B35" />
            </View>
            <View style={styles.deliveryInfo}>
              <Text style={[styles.deliveryTitle, { color: colors.text }]}>Deliver to Home</Text>
              <Text style={[styles.deliveryAddress, { color: colors.textSecondary }]} numberOfLines={1}>
                Sector 6, HSR Layout, Bengaluru, India
              </Text>
            </View>
            <View style={[styles.deliveryTimeBadge, { backgroundColor: isDark ? "#1C2E26" : "#E6F4EA" }]}>
              <Ionicons name="time" size={12} color="#10B981" />
              <Text style={styles.deliveryTimeText}>25 mins</Text>
            </View>
          </View>
        </View>

        {/* Item List */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.cardHeaderRow}>
            <Text style={[styles.cardHeader, { color: colors.text }]}>Selected Items</Text>
            <Text style={[styles.itemCountText, { color: colors.textSecondary }]}>{cart.length} unique items</Text>
          </View>

          {cart.map((item: any, index: number) => {
            // Determine if Veg or NonVeg based on item name (quick heuristic)
            const isVeg = !item.name.toLowerCase().includes("chicken") && 
                          !item.name.toLowerCase().includes("beef") && 
                          !item.name.toLowerCase().includes("pork") &&
                          !item.name.toLowerCase().includes("dumplings") &&
                          !item.name.toLowerCase().includes("spicy");

            return (
              <View key={item.name + index} style={[styles.itemRow, { borderBottomColor: colors.border }]}>
                {/* Veg/Nonveg Badge */}
                <View style={[styles.vegBadge, { borderColor: isVeg ? "#10B981" : "#EF4444" }]}>
                  <View style={[styles.vegDot, { backgroundColor: isVeg ? "#10B981" : "#EF4444", borderRadius: isVeg ? 4 : 0 }]} />
                </View>

                {/* Item Info */}
                <View style={styles.itemDetails}>
                  <Text style={[styles.itemName, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                  <Text style={[styles.itemPriceSingle, { color: colors.textSecondary }]}>₹{item.price}</Text>
                </View>

                {/* Quantity Stepper */}
                <View style={[styles.stepperContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => removeFromCart(item.name)}
                  >
                    <Ionicons name="remove" size={14} color="#FF6B35" />
                  </TouchableOpacity>
                  <Text style={[styles.stepText, { color: colors.text }]}>{item.quantity || 1}</Text>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => addToCart(item)}
                  >
                    <Ionicons name="add" size={14} color="#FF6B35" />
                  </TouchableOpacity>
                </View>

                {/* Item Total Price */}
                <Text style={[styles.itemTotalPrice, { color: colors.text }]}>₹{item.price * (item.quantity || 1)}</Text>
              </View>
            );
          })}

          {/* Cooking Instructions Request */}
          <TouchableOpacity style={[styles.instructionRow, { borderTopColor: colors.border }]}>
            <Ionicons name="document-text-outline" size={18} color={colors.textSecondary} />
            <Text style={[styles.instructionText, { color: colors.textSecondary }]}>Add cooking instructions (e.g. Make it spicy)</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Promo Codes */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TouchableOpacity style={styles.promoRow}>
            <View style={styles.promoLeft}>
              <Ionicons name="pricetag" size={20} color="#FF6B35" />
              <View style={styles.promoInfo}>
                <Text style={[styles.promoTitle, { color: colors.text }]}>
                  {subtotal > 300 ? "WELCOME15 Applied!" : "Use Coupons / Offers"}
                </Text>
                <Text style={[styles.promoDesc, { color: colors.textSecondary }]}>
                  {subtotal > 300 ? "Flat 15% discount applied successfully!" : "Save up to ₹150 on your order"}
                </Text>
              </View>
            </View>
            <View style={styles.promoAction}>
              <Text style={[styles.promoActionText, subtotal > 300 && { color: "#10B981" }]}>
                {subtotal > 300 ? "SAVED ₹" + discount : "VIEW OFFERS"}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={subtotal > 300 ? "#10B981" : "#FF6B35"} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Bill Summary */}
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardHeader, { color: colors.text }]}>Detailed Bill Details</Text>
          
          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: colors.textSecondary }]}>Item Subtotal</Text>
            <Text style={[styles.billValue, { color: colors.text }]}>₹{subtotal}</Text>
          </View>
          
          {discount > 0 && (
            <View style={styles.billRow}>
              <Text style={[styles.billLabel, { color: "#10B981" }]}>Promo Discount (WELCOME15)</Text>
              <Text style={[styles.billValue, { color: "#10B981" }]}>-₹{discount}</Text>
            </View>
          )}

          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: colors.textSecondary }]}>Delivery Partner Fee</Text>
            <Text style={[styles.billValue, { color: colors.text }, deliveryFee === 0 && { color: "#10B981", fontWeight: "bold" }]}>
              {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
            </Text>
          </View>

          <View style={styles.billRow}>
            <Text style={[styles.billLabel, { color: colors.textSecondary }]}>Taxes and Restaurant Charges (5%)</Text>
            <Text style={[styles.billValue, { color: colors.text }]}>₹{taxes}</Text>
          </View>

          <View style={[styles.separator, { backgroundColor: colors.divider }]} />

          <View style={[styles.billRow, { marginBottom: 0 }]}>
            <Text style={[styles.totalLabel, { color: colors.text }]}>Grand Total</Text>
            <Text style={[styles.totalValue, { color: colors.text }]}>₹{grandTotal}</Text>
          </View>
        </View>

        {/* Feeding India / Safety Instructions */}
        <View style={[styles.safetyCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="shield-checkmark" size={24} color="#10B981" style={{ marginRight: 12 }} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.safetyTitle, { color: colors.text }]}>Orange Bite Safe & Hygienic Delivery</Text>
            <Text style={[styles.safetyText, { color: colors.textSecondary }]}>
              Our delivery partners are fully vaccinated and wear protective masks. Opt for no-contact delivery at checkout.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Footer */}
      <View style={[styles.footer, { backgroundColor: colors.card, borderTopColor: colors.border, paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          activeOpacity={0.9}
          onPress={() => {
            const newOrder = placeOrder("Restaurant Palace", cart, grandTotal);
            navigation.navigate("ActiveOrder", { orderId: newOrder.id });
          }}
        >
          <View style={styles.footerPriceCol}>
            <Text style={styles.footerPrice}>₹{grandTotal}</Text>
            <Text style={styles.footerPriceSub}>TOTAL BILL</Text>
          </View>
          <View style={styles.footerBtnCol}>
            <Text style={styles.placeOrderText}>Place Order</Text>
            <Ionicons name="arrow-forward" size={20} color="#FFFFFF" style={{ marginLeft: 6 }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#181A20",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#6C757D",
    marginTop: 1,
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  clearBtnText: {
    color: "#FF6B35",
    fontWeight: "800",
    fontSize: 13,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9FA",
    paddingBottom: 12,
    marginBottom: 12,
  },
  cardHeader: {
    fontSize: 15,
    fontWeight: "900",
    color: "#181A20",
    letterSpacing: -0.2,
  },
  itemCountText: {
    fontSize: 11,
    color: "#8E8E93",
    fontWeight: "600",
  },
  deliveryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF5F1",
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  deliveryTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#181A20",
  },
  deliveryAddress: {
    fontSize: 11,
    color: "#6C757D",
    marginTop: 2,
    fontWeight: "500",
  },
  deliveryTimeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 4,
  },
  deliveryTimeText: {
    fontSize: 10,
    color: "#10B981",
    fontWeight: "800",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9FA",
  },
  vegBadge: {
    width: 14,
    height: 14,
    borderWidth: 1.2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 2,
  },
  vegDot: {
    width: 6,
    height: 6,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#181A20",
  },
  itemPriceSingle: {
    fontSize: 11,
    color: "#6C757D",
    marginTop: 2,
    fontWeight: "600",
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F1",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFE0D3",
    marginRight: 12,
  },
  stepBtn: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  stepText: {
    fontSize: 13,
    fontWeight: "900",
    color: "#FF6B35",
    minWidth: 18,
    textAlign: "center",
  },
  itemTotalPrice: {
    fontSize: 14,
    fontWeight: "900",
    color: "#181A20",
    minWidth: 50,
    textAlign: "right",
  },
  instructionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  instructionText: {
    flex: 1,
    fontSize: 11,
    color: "#6C757D",
    marginLeft: 8,
    fontWeight: "600",
  },
  promoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  promoInfo: {
    marginLeft: 12,
    flex: 1,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#181A20",
  },
  promoDesc: {
    fontSize: 11,
    color: "#6C757D",
    marginTop: 2,
  },
  promoAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  promoActionText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#FF6B35",
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  billLabel: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "600",
  },
  billValue: {
    fontSize: 12,
    color: "#181A20",
    fontWeight: "800",
  },
  separator: {
    height: 1,
    backgroundColor: "#F8F9FA",
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "900",
    color: "#181A20",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FF6B35",
  },
  safetyCard: {
    backgroundColor: "#E8F5E9",
    borderRadius: 20,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#C8E6C9",
  },
  safetyTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#10B981",
    marginBottom: 2,
  },
  safetyText: {
    fontSize: 11,
    color: "#4E7B50",
    lineHeight: 16,
    fontWeight: "500",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEF2F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 10,
  },
  placeOrderButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  footerPriceCol: {
    justifyContent: "center",
  },
  footerPrice: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
  },
  footerPriceSub: {
    color: "#FFE0D3",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 1,
  },
  footerBtnCol: {
    flexDirection: "row",
    alignItems: "center",
  },
  placeOrderText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyIconCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFF5F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#181A20",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  emptyButton: {
    backgroundColor: "#FF6B35",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});