import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const categories = [
  { id: "all", name: "All", image: "https://cdn-icons-png.flaticon.com/512/5787/5787016.png" },
  { id: "biryani", name: "Biryani", image: "https://cdn-icons-png.flaticon.com/512/2515/2515183.png" },
  { id: "south_indian", name: "South Indian", image: "https://cdn-icons-png.flaticon.com/512/5787/5787016.png" },
  { id: "street_food", name: "Street Food", image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
];

const offers = [
  {
    id: 1,
    title: "FLAT 50% OFF",
    subtitle: "On your first order",
    code: "WELCOME50",
    gradient: ["#FF416C", "#FF4B2B"],
    illustration: "🔥",
  },
  {
    id: 2,
    title: "FREE DELIVERY",
    subtitle: "Over ₹199 orders",
    code: "FREEDEL",
    gradient: ["#11998e", "#38ef7d"],
    illustration: "🛵",
  },
  {
    id: 3,
    title: "FESTIVAL SPECIAL",
    subtitle: "Deals up to ₹150 cashback",
    code: "FESTIVE",
    gradient: ["#8A2387", "#E94057"],
    illustration: "🎉",
  },
];

const foods = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Creamy spicy North Indian curry",
    price: 349,
    oldPrice: 499,
    image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  },
  {
    id: 2,
    name: "Hyderabadi Biryani",
    description: "Authentic dum biryani with spices",
    price: 299,
    oldPrice: 399,
    image: "https://cdn-icons-png.flaticon.com/512/2515/2515183.png",
  },
  {
    id: 3,
    name: "Masala Dosa",
    description: "Crispy dosa with potato masala",
    price: 149,
    oldPrice: 229,
    image: "https://cdn-icons-png.flaticon.com/512/5787/5787016.png",
  },
];

const restaurants = [
  {
    id: 1,
    name: "Biryani Blues",
    price: 300,
    rating: "4.5",
    time: "25 mins",
    tags: "Biryani • Mughlai",
    image: "https://images.unsplash.com/photo-1563379091339-03246963d29c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Haldiram's",
    price: 200,
    rating: "4.3",
    time: "20 mins",
    tags: "North Indian • Snacks",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "The Dosa Factory",
    price: 180,
    rating: "4.7",
    time: "15 mins",
    tags: "South Indian",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
  },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* HEADER */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 15) }]}>
        <View>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color="#E23E3E" />
            <Text style={styles.locationText}>New Delhi, India</Text>
            <Ionicons name="chevron-down" size={14} color="#6C757D" style={{ marginLeft: 4 }} />
          </View>
          <Text style={styles.title}>What would you like{"\n"}to eat today?</Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Search")}
        style={styles.searchContainer}
      >
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 10 }} />
        <Text style={styles.searchInputPlaceholder}>Search restaurants, biryani, cakes...</Text>
        <Ionicons name="mic-outline" size={20} color="#E23E3E" />
      </TouchableOpacity>

      {/* OFFER CAROUSEL */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.offerScroll}
        snapToInterval={width * 0.82 + 16}
        decelerationRate="fast"
      >
        {offers.map((offer, index) => (
          <Animated.View
            key={offer.id}
            entering={FadeInRight.delay(index * 150).springify()}
          >
            <LinearGradient
              colors={offer.gradient as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.offerCard}
            >
              <View style={styles.offerTextCol}>
                <Text style={styles.offerTitle}>{offer.title}</Text>
                <Text style={styles.offerSubtitle}>{offer.subtitle}</Text>
                <View style={styles.offerBadge}>
                  <Text style={styles.offerBadgeText}>USE CODE: {offer.code}</Text>
                </View>
              </View>
              <Text style={styles.offerIllustration}>{offer.illustration}</Text>
            </LinearGradient>
          </Animated.View>
        ))}
      </ScrollView>

      {/* CATEGORY SECTION */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Cuisines</Text>
        <Text style={styles.seeMore}>See all</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryItem,
              selectedCategory === item.id && styles.activeCategory,
            ]}
            onPress={() => setSelectedCategory(item.id)}
          >
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item.id && { color: "#FFFFFF" },
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TRENDING FOOD SECTION */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Trending Dishes</Text>
        <Text style={styles.seeMore}>Top rated</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.foodScroll}
      >
        {foods.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInRight.delay(index * 120).springify()}
            style={styles.foodCard}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <Text style={styles.foodName}>{item.name}</Text>
              <Text numberOfLines={1} style={styles.foodDesc}>
                {item.description}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹{item.price}</Text>
                <Text style={styles.oldPrice}>₹{item.oldPrice}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      {/* POPULAR RESTAURANTS SECTION */}
      <Text style={styles.sectionTitle}>Popular Restaurants</Text>
      <View style={styles.restaurantContainer}>
        {restaurants.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(index * 150).springify()}
          >
            <TouchableOpacity
              style={styles.restaurantCard}
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("RestaurantDetail", {
                  id: item.id,
                  name: item.name,
                  price: item.price,
                })
              }
            >
              <Image source={{ uri: item.image }} style={styles.restaurantImage} />

              <View style={styles.restaurantInfo}>
                <View style={styles.restaurantTop}>
                  <Text style={styles.restaurantName}>{item.name}</Text>
                  <View style={styles.ratingBox}>
                    <Ionicons name="star" size={12} color="#FFFFFF" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>

                <Text style={styles.cuisine}>{item.tags}</Text>

                <View style={styles.bottomRow}>
                  <Text style={styles.delivery}>⏱ {item.time}</Text>
                  <Text style={styles.restaurantPriceText}>₹{item.price} for one</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
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
    paddingHorizontal: 20,
    alignItems: "center",
    paddingBottom: 15,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#212529",
    marginLeft: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#212529",
    lineHeight: 34,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#E23E3E",
  },
  searchContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInputPlaceholder: {
    flex: 1,
    fontSize: 14,
    color: "#8E8E93",
  },
  offerScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    marginTop: 20,
    paddingBottom: 10,
  },
  offerCard: {
    width: width * 0.82,
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  offerTextCol: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  offerSubtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
    fontWeight: "500",
  },
  offerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginTop: 12,
  },
  offerBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  offerIllustration: {
    fontSize: 48,
    marginLeft: 10,
  },
  sectionRow: {
    marginTop: 24,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#212529",
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 4,
  },
  seeMore: {
    color: "#E23E3E",
    fontWeight: "700",
    fontSize: 14,
    marginTop: 24,
  },
  categoryScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    marginTop: 12,
  },
  categoryItem: {
    marginRight: 12,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
  },
  activeCategory: {
    backgroundColor: "#E23E3E",
    borderColor: "#E23E3E",
  },
  categoryImage: {
    width: 24,
    height: 24,
    marginRight: 8,
    resizeMode: "contain",
  },
  categoryText: {
    fontWeight: "700",
    color: "#495057",
    fontSize: 14,
  },
  foodScroll: {
    paddingLeft: 20,
    paddingRight: 8,
    marginTop: 14,
    paddingBottom: 10,
  },
  foodCard: {
    width: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  foodImage: {
    width: 120,
    height: 120,
    alignSelf: "center",
    resizeMode: "contain",
  },
  foodName: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: "800",
    color: "#212529",
  },
  foodDesc: {
    marginTop: 4,
    color: "#6C757D",
    fontSize: 12,
    lineHeight: 16,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E23E3E",
  },
  oldPrice: {
    marginLeft: 8,
    textDecorationLine: "line-through",
    color: "#ADB5BD",
    fontSize: 13,
  },
  restaurantContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  restaurantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    overflow: "hidden",
    marginTop: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  restaurantImage: {
    width: "100%",
    height: 180,
  },
  restaurantInfo: {
    padding: 18,
  },
  restaurantTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#212529",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00B894",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    color: "#FFFFFF",
    marginLeft: 4,
    fontWeight: "700",
    fontSize: 12,
  },
  cuisine: {
    color: "#6C757D",
    marginTop: 6,
    fontSize: 13,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
    paddingTop: 12,
  },
  delivery: {
    color: "#495057",
    fontWeight: "700",
    fontSize: 13,
  },
  restaurantPriceText: {
    fontWeight: "700",
    color: "#212529",
    fontSize: 13,
  },
});