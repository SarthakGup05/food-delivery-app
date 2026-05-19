import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const menuItems = [
  { id: "m1", name: "Hyderabadi Dum Biryani", description: "Fragrant long grain basmati rice layered with spiced chicken, fried onions, and saffron.", price: 299 },
  { id: "m2", name: "Butter Chicken Combo", description: "Creamy, rich tomato gravy with tender pieces of tandoori chicken, served with fresh butter naan.", price: 349 },
  { id: "m3", name: "Paneer Tikka Roll", description: "Succulent paneer cubes marinated in spices, grilled to perfection, and wrapped in a fresh flatbread.", price: 189 },
  { id: "m4", name: "Gulab Jamun Duo", description: "Two warm soft milk-solid dumplings dipped in cardamom scented rose water sugar syrup.", price: 99 },
];

export default function RestaurantDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { addToCart, cart } = useContext(CartContext);
  const { id, name = "Restaurant Palace", price = 250 } = route.params || {};
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Banner Section */}
        <View style={[styles.banner, { height: 180 + insets.top }]}>
          <TouchableOpacity
            style={[styles.backButton, { top: Math.max(insets.top, 15) }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.bannerIconCircle}>
            <Ionicons name="restaurant" size={60} color="#E23E3E" />
          </View>
        </View>

        {/* Restaurant Header */}
        <View style={styles.headerInfo}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.tags}>North Indian • Mughlai • Authentic Biryani • Pure Desi Ghee</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="star" size={16} color="#FFC107" style={{ marginRight: 4 }} />
              <Text style={styles.metaText}>4.8 (120+ ratings)</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="time-outline" size={16} color="#6C757D" style={{ marginRight: 4 }} />
              <Text style={styles.metaText}>20-25 mins</Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <Text style={styles.menuTitle}>Today's Featured Menu</Text>

        {menuItems.map((dish) => (
          <View key={dish.id} style={styles.menuItemCard}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text style={styles.dishDescription} numberOfLines={2}>
                {dish.description}
              </Text>
              <Text style={styles.dishPrice}>₹{dish.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.8}
              onPress={() => addToCart({ name: dish.name, price: dish.price })}
            >
              <Ionicons name="add" size={20} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Floating Checkout Button */}
      {cart.length > 0 && (
        <View style={[styles.cartFooter, { bottom: Math.max(insets.bottom, 20) }]}>
          <TouchableOpacity
            style={styles.viewCartButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Cart")}
          >
            <View style={styles.cartBadgeContainer}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
            <Text style={styles.viewCartText}>View Cart & Checkout</Text>
            <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  banner: {
    height: 180,
    backgroundColor: "#E23E3E",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    bottom: -30,
    position: "absolute",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerInfo: {
    marginTop: 45,
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#212529",
    textAlign: "center",
    marginBottom: 6,
  },
  tags: {
    fontSize: 14,
    color: "#6C757D",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 14,
    color: "#495057",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  menuItemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  menuItemLeft: {
    flex: 1,
    marginRight: 16,
  },
  dishName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  dishDescription: {
    fontSize: 13,
    color: "#6C757D",
    marginBottom: 8,
    lineHeight: 18,
  },
  dishPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#E23E3E",
  },
  addButton: {
    backgroundColor: "#E23E3E",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#E23E3E",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 3,
  },
  cartFooter: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
  },
  viewCartButton: {
    backgroundColor: "#E23E3E",
    borderRadius: 30,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    shadowColor: "#E23E3E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  cartBadgeContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#E23E3E",
    fontWeight: "bold",
    fontSize: 14,
  },
  viewCartText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});