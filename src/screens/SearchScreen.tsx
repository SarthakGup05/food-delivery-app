import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../context/ThemeContext";

const popularSearches = ["Biryani", "Butter Chicken", "Paneer Tikka", "Momos", "Samosa", "Masala Dosa"];

const mockFoodItems = [
  { id: "1", name: "Hyderabadi Dum Biryani", restaurant: "Biryani Blues", price: 299, rating: "4.5" },
  { id: "2", name: "Butter Chicken", restaurant: "Haldiram's", price: 349, rating: "4.3" },
  { id: "3", name: "Paneer Tikka Roll", restaurant: "Haldiram's", price: 189, rating: "4.3" },
  { id: "4", name: "Masala Dosa Classic", restaurant: "The Dosa Factory", price: 149, rating: "4.7" },
];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();

  const filteredItems = mockFoodItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.restaurant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border, paddingTop: Math.max(insets.top, 15) }]}>
        <View style={[styles.searchBar, { backgroundColor: colors.inputBg }]}>
          <Ionicons name="search" size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Search food or restaurant..."
            style={[styles.input, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={isDark ? "#8E8EAE" : "#AAAAAA"}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {searchQuery === "" ? (
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Searches</Text>
            <View style={styles.tagsContainer}>
              {popularSearches.map((tag, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={[styles.tag, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => setSearchQuery(tag)}
                >
                  <Text style={[styles.tagText, { color: colors.textSecondary }]}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.recentTitleRow}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Featured Items</Text>
            </View>
            {mockFoodItems.map((item) => (
              <View key={item.id} style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.resultLeft}>
                  <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                  <Text style={[styles.restaurantName, { color: colors.textSecondary }]}>{item.restaurant}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
                <View style={[styles.resultRight, { backgroundColor: isDark ? "#242630" : "#FFF8F8" }]}>
                  <Ionicons name="star" size={14} color="#FFC107" style={{ marginRight: 3 }} />
                  <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating}</Text>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Search Results ({filteredItems.length})</Text>
            {filteredItems.length === 0 ? (
              <View style={styles.noResultsContainer}>
                <Ionicons name="search-outline" size={60} color={colors.textSecondary} style={{ marginBottom: 12 }} />
                <Text style={[styles.noResultsText, { color: colors.textSecondary }]}>No results found for "{searchQuery}"</Text>
              </View>
            ) : (
              filteredItems.map((item) => (
                <View key={item.id} style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <View style={styles.resultLeft}>
                    <Text style={[styles.itemName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.restaurantName, { color: colors.textSecondary }]}>{item.restaurant}</Text>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                  </View>
                  <View style={[styles.resultRight, { backgroundColor: isDark ? "#242630" : "#FFF8F8" }]}>
                    <Ionicons name="star" size={14} color="#FFC107" style={{ marginRight: 3 }} />
                    <Text style={[styles.ratingText, { color: colors.text }]}>{item.rating}</Text>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
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
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#212529",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 16,
    marginTop: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  tagText: {
    color: "#495057",
    fontSize: 14,
    fontWeight: "500",
  },
  recentTitleRow: {
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  resultLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 13,
    color: "#6C757D",
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#E23E3E",
  },
  resultRight: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8F8",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#212529",
  },
  noResultsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  noResultsText: {
    fontSize: 16,
    color: "#6C757D",
    textAlign: "center",
  },
});
