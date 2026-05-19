import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const categories = [
  { id: "all", name: "All Foods", icon: "restaurant-outline" },
  { id: "burger", name: "Burgers", icon: "fast-food-outline" },
  { id: "pizza", name: "Pizza", icon: "pizza-outline" },
  { id: "asian", name: "Asian", icon: "leaf-outline" },
  { id: "drinks", name: "Drinks", icon: "beer-outline" },
];

const restaurants = [
  {
    id: 1,
    name: "Burger Palace",
    price: 250,
    rating: "4.8",
    time: "15-20 mins",
    tags: "Fast Food • American",
    icon: "fast-food",
    iconColor: "#FFC107",
  },
  {
    id: 2,
    name: "Pizza Hub",
    price: 450,
    rating: "4.6",
    time: "25-30 mins",
    tags: "Italian • Cheesy",
    icon: "pizza",
    iconColor: "#E23E3E",
  },
  {
    id: 3,
    name: "Healthy Salad Bar",
    price: 180,
    rating: "4.9",
    time: "10-15 mins",
    tags: "Salads • Healthy • Vegan",
    icon: "nutrition",
    iconColor: "#2E7D32",
  },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 15) }]}>
        <View>
          <Text style={styles.welcomeText}>Deliver to</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={18} color="#E23E3E" />
            <Text style={styles.locationText}>New Delhi, India</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-outline" size={24} color="#212529" />
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#888888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search for restaurants, dishes..."
            style={styles.searchInput}
            placeholderTextColor="#AAAAAA"
            editable={false}
            onTouchStart={() => navigation.navigate("Search")}
          />
        </View>
      </View>

      {/* Category List */}
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryCard,
              selectedCategory === cat.id && styles.activeCategoryCard,
            ]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <View style={[
              styles.categoryIconCircle,
              selectedCategory === cat.id && styles.activeCategoryIconCircle,
            ]}>
              <Ionicons
                name={cat.icon as any}
                size={22}
                color={selectedCategory === cat.id ? "#E23E3E" : "#495057"}
              />
            </View>
            <Text style={[
              styles.categoryName,
              selectedCategory === cat.id && styles.activeCategoryName,
            ]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Restaurant List */}
      <Text style={styles.sectionTitle}>Popular Near You</Text>
      <View style={styles.listContainer}>
        {restaurants.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("RestaurantDetail", {
                id: item.id,
                name: item.name,
                price: item.price,
              })
            }
          >
            <View style={styles.cardHeader}>
              <View style={[styles.cardIconCircle, { backgroundColor: item.iconColor + "15" }]}>
                <Ionicons name={item.icon as any} size={32} color={item.iconColor} />
              </View>
              <View style={styles.badge}>
                <Ionicons name="star" size={14} color="#FFC107" style={{ marginRight: 3 }} />
                <Text style={styles.badgeText}>{item.rating}</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantTags}>{item.tags}</Text>
              <View style={styles.cardFooter}>
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={14} color="#6C757D" style={{ marginRight: 4 }} />
                  <Text style={styles.infoText}>{item.time}</Text>
                </View>
                <Text style={styles.restaurantPrice}>Min. ₹{item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  welcomeText: {
    fontSize: 14,
    color: "#6C757D",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
    marginLeft: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    color: "#212529",
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  categoryScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 25,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  activeCategoryCard: {
    backgroundColor: "#E23E3E",
    borderColor: "#E23E3E",
  },
  categoryIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F1F3F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  activeCategoryIconCircle: {
    backgroundColor: "#FFFFFF",
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#495057",
  },
  activeCategoryName: {
    color: "#FFFFFF",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  cardHeader: {
    height: 140,
    backgroundColor: "#FFF8F8",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  cardIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#212529",
  },
  cardBody: {
    padding: 18,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  restaurantTags: {
    fontSize: 13,
    color: "#6C757D",
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
    paddingTop: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 13,
    color: "#6C757D",
  },
  restaurantPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#E23E3E",
  },
});