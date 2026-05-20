import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInRight, useAnimatedStyle, withTiming, interpolateColor } from "react-native-reanimated";
import { useAppTheme, lightTheme, darkTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

// Mock Delicious Food Categories (What's on your mind?)
const mindCategories = [
  { id: "c1", name: "Biryani", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=300&auto=format&fit=crop" },
  { id: "c2", name: "Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop" },
  { id: "c3", name: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop" },
  { id: "c4", name: "Cake", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&auto=format&fit=crop" },
  { id: "c5", name: "Rolls", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=300&auto=format&fit=crop" },
  { id: "c6", name: "Dosa", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=300&auto=format&fit=crop" },
  { id: "c7", name: "Noodles", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=300&auto=format&fit=crop" },
  { id: "c8", name: "Ice Cream", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=300&auto=format&fit=crop" },
];

// Mock Banners
const offerBanners = [
  {
    id: "b1",
    title: "Flat 60% OFF",
    subtitle: "On your first order",
    tag: "WELCOME60",
    color: "#FF6B35",
    textColor: "#FFFFFF",
    btnColor: "#FFFFFF",
    btnTextColor: "#FF6B35",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "b2",
    title: "Free Delivery",
    subtitle: "On orders above ₹199",
    tag: "FREEDEL",
    color: "#3F51B5",
    textColor: "#FFFFFF",
    btnColor: "#E4F831",
    btnTextColor: "#1C1C1E",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: "b3",
    title: "Buy 1 Get 1 FREE",
    subtitle: "On select desserts",
    tag: "SWEETBOGO",
    color: "#009688",
    textColor: "#FFFFFF",
    btnColor: "#FFFFFF",
    btnTextColor: "#009688",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=400&auto=format&fit=crop",
  },
];

// Detailed Mock Restaurants
const initialRestaurants = [
  {
    id: "r1",
    name: "Hyderabadi Dum Biryani Palace",
    cuisines: "Biryani • North Indian • Mughlai",
    rating: "4.8",
    deliveryTime: "25 mins",
    distance: "2.4 km",
    costForTwo: "₹300 for two",
    discount: "60% OFF up to ₹120",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=500&auto=format&fit=crop",
    isVeg: false,
    isPromoted: true,
  },
  {
    id: "r2",
    name: "The Pizza Crust",
    cuisines: "Pizza • Italian • Fast Food",
    rating: "4.5",
    deliveryTime: "20 mins",
    distance: "1.8 km",
    costForTwo: "₹400 for two",
    discount: "Flat ₹100 Off | RuPay Card",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=500&auto=format&fit=crop",
    isVeg: true,
    isPromoted: false,
  },
  {
    id: "r3",
    name: "Burger Hub",
    cuisines: "Burger • Fast Food • Beverages",
    rating: "4.2",
    deliveryTime: "15 mins",
    distance: "1.2 km",
    costForTwo: "₹250 for two",
    discount: "Buy 1 Get 1 Free",
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=500&auto=format&fit=crop",
    isVeg: false,
    isPromoted: false,
  },
  {
    id: "r4",
    name: "Healthy Salad Bowl",
    cuisines: "Salads • Healthy Food • Juices",
    rating: "4.6",
    deliveryTime: "22 mins",
    distance: "3.1 km",
    costForTwo: "₹350 for two",
    discount: "Flat 20% OFF | Above ₹400",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop",
    isVeg: true,
    isPromoted: true,
  },
  {
    id: "r5",
    name: "Royal Mughlai Kitchen",
    cuisines: "North Indian • Kebab • Tandoori",
    rating: "4.4",
    deliveryTime: "30 mins",
    distance: "2.8 km",
    costForTwo: "₹500 for two",
    discount: "Flat 15% OFF",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=500&auto=format&fit=crop",
    isVeg: false,
    isPromoted: false,
  },
  {
    id: "r6",
    name: "Sweet Treats Bakery",
    cuisines: "Desserts • Cakes • Ice Cream",
    rating: "4.7",
    deliveryTime: "18 mins",
    distance: "0.8 km",
    costForTwo: "₹200 for two",
    discount: "Free Delivery | Above ₹199",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500&auto=format&fit=crop",
    isVeg: true,
    isPromoted: false,
  },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { isDark, toggleTheme, colors, themeProgress } = useAppTheme();

  // Animated background theme transition
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      themeProgress.value,
      [0, 1],
      [lightTheme.colors.background, darkTheme.colors.background]
    );
    return { backgroundColor };
  });

  // Theme switch sun/moon spinning rotation transition
  const animatedIconStyle = useAnimatedStyle(() => {
    const rotate = withTiming(isDark ? "180deg" : "0deg", { duration: 350 });
    return {
      transform: [{ rotate }],
    };
  });

  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter States
  const [sortByRating, setSortByRating] = useState(false);
  const [fastDelivery, setFastDelivery] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [hasOffers, setHasOffers] = useState(false);

  // Handle click on categories
  const handleCategoryPress = (categoryName: string) => {
    if (activeCategory === categoryName) {
      setActiveCategory(null);
      setSearchText("");
    } else {
      setActiveCategory(categoryName);
      setSearchText(categoryName);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveCategory(null);
    setSearchText("");
    setSortByRating(false);
    setFastDelivery(false);
    setVegOnly(false);
    setHasOffers(false);
  };

  // Filter and Sort Logic
  let filteredRestaurants = [...initialRestaurants];

  // Search Filter
  if (searchText.trim() !== "") {
    filteredRestaurants = filteredRestaurants.filter(
      (r) =>
        r.name.toLowerCase().includes(searchText.toLowerCase()) ||
        r.cuisines.toLowerCase().includes(searchText.toLowerCase())
    );
  }

  // Veg Only Filter
  if (vegOnly) {
    filteredRestaurants = filteredRestaurants.filter((r) => r.isVeg);
  }

  // Fast Delivery Filter (Time <= 20 mins)
  if (fastDelivery) {
    filteredRestaurants = filteredRestaurants.filter((r) => {
      const timeVal = parseInt(r.deliveryTime);
      return timeVal <= 20;
    });
  }

  // Sort by Rating (highest first)
  if (sortByRating) {
    filteredRestaurants.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  }

  return (
    <Animated.View style={[styles.container, animatedContainerStyle, { paddingTop: Math.max(insets.top, 8) }]}>
      
      {/* Location and Profile Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <Ionicons name="location" size={20} color="#FF6B35" />
            <Text style={[styles.locationTitle, { color: colors.text }]}>Home</Text>
            <Ionicons name="chevron-down" size={16} color={colors.text} style={{ marginLeft: 2 }} />
          </View>
          <Text style={[styles.locationText, { color: colors.textSecondary }]} numberOfLines={1}>
            Sector 6, HSR Layout, Bengaluru, India
          </Text>
        </View>

        <View style={styles.headerRightActions}>
          <TouchableOpacity 
            style={[styles.themeToggleBtn, { backgroundColor: isDark ? "#1C1E26" : "#F4F6F8", borderColor: colors.border }]}
            onPress={toggleTheme}
            activeOpacity={0.7}
          >
            <Animated.View style={animatedIconStyle}>
              <Ionicons 
                name={isDark ? "sunny" : "moon"} 
                size={18} 
                color={isDark ? "#FFB800" : "#5A5D75"} 
              />
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.profileBtn}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" }} 
              style={styles.profileImg} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Orange Bite Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
          <View style={[styles.searchBar, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
            <Ionicons name="search" size={20} color="#FF6B35" style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search for restaurants, cuisines or dishes..."
              placeholderTextColor={isDark ? "#8E8EAE" : "#8E8E93"}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText !== "" && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            )}
            <View style={[styles.verticalLine, { backgroundColor: colors.border }]} />
            <TouchableOpacity style={styles.micBtn}>
              <Ionicons name="mic-outline" size={20} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Promo and Bank Banners Carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannersScroll}
        >
          {offerBanners.map((banner, index) => (
            <Animated.View
              entering={FadeInRight.delay(index * 100).springify()}
              key={banner.id}
              style={[styles.bannerContainer, { backgroundColor: banner.color }]}
            >
              <View style={styles.bannerContent}>
                <View style={styles.bannerTagBadge}>
                  <Text style={styles.bannerTagBadgeText}>USE CODE: {banner.tag}</Text>
                </View>
                <Text style={[styles.bannerTitle, { color: banner.textColor }]}>{banner.title}</Text>
                <Text style={[styles.bannerSubtitle, { color: banner.textColor }]}>{banner.subtitle}</Text>
                
                <TouchableOpacity 
                  style={[styles.orderBtn, { backgroundColor: banner.btnColor }]}
                  onPress={() => navigation.navigate("RestaurantDetail", { name: "Restaurant Palace" })}
                >
                  <Text style={[styles.orderBtnText, { color: banner.btnTextColor }]}>Claim Offer</Text>
                </TouchableOpacity>
              </View>
              
              <Image 
                source={{ uri: banner.image }} 
                style={styles.bannerImage} 
              />
            </Animated.View>
          ))}
        </ScrollView>

        {/* "What's on your mind?" circular categories grid */}
        <View style={styles.mindSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>What's on your mind?</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mindScroll}
          >
            {mindCategories.map((item, index) => {
              const isActive = activeCategory === item.name;
              return (
                <Animated.View key={item.id} entering={FadeInRight.delay(index * 80).springify()}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleCategoryPress(item.name)}
                    style={styles.mindCard}
                  >
                    <View style={[styles.mindImgContainer, isActive && styles.mindActiveImgContainer]}>
                      <Image source={{ uri: item.image }} style={styles.mindImg} />
                    </View>
                    <Text style={[styles.mindName, { color: colors.textSecondary }, isActive && styles.mindActiveName]}>{item.name}</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </ScrollView>
        </View>

        {/* Top Brands for you Section */}
        <View style={styles.topBrandsSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Brands For You</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.brandsScroll}
          >
            {initialRestaurants.slice(0, 4).map((brand, index) => (
              <TouchableOpacity
                key={brand.id}
                activeOpacity={0.9}
                style={[styles.brandCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => navigation.navigate("RestaurantDetail", { id: brand.id, name: brand.name, rating: brand.rating, deliveryTime: brand.deliveryTime })}
              >
                <View style={styles.brandImageWrapper}>
                  <Image source={{ uri: brand.image }} style={styles.brandImage} />
                  <View style={styles.brandDiscountOverlay}>
                    <Text style={styles.brandDiscountText}>{brand.discount}</Text>
                  </View>
                </View>
                <View style={styles.brandInfo}>
                  <Text style={[styles.brandName, { color: colors.text }]} numberOfLines={1}>{brand.name}</Text>
                  <View style={styles.brandMetaRow}>
                    <View style={styles.brandRatingBadge}>
                      <Text style={styles.brandRatingText}>{brand.rating}</Text>
                      <Ionicons name="star" size={10} color="#FFFFFF" />
                    </View>
                    <Text style={[styles.brandTimeText, { color: colors.textSecondary }]}>{brand.deliveryTime}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter and Sorting Options Row */}
        <View style={[styles.filtersSection, { backgroundColor: colors.background }]}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {/* Sort by Rating */}
            <TouchableOpacity 
              style={[styles.filterTagBtn, { backgroundColor: colors.card, borderColor: colors.border }, sortByRating && styles.filterTagBtnActive]}
              onPress={() => setSortByRating(!sortByRating)}
            >
              <Text style={[styles.filterTagText, { color: colors.textSecondary }, sortByRating && styles.filterTagTextActive]}>
                Ratings 4.5+
              </Text>
              <Ionicons name="star" size={12} color={sortByRating ? "#FFFFFF" : colors.textSecondary} style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            {/* Fast Delivery */}
            <TouchableOpacity 
              style={[styles.filterTagBtn, { backgroundColor: colors.card, borderColor: colors.border }, fastDelivery && styles.filterTagBtnActive]}
              onPress={() => setFastDelivery(!fastDelivery)}
            >
              <Text style={[styles.filterTagText, { color: colors.textSecondary }, fastDelivery && styles.filterTagTextActive]}>
                Fast Delivery
              </Text>
              <Ionicons name="time" size={12} color={fastDelivery ? "#FFFFFF" : colors.textSecondary} style={{ marginLeft: 4 }} />
            </TouchableOpacity>

            {/* Pure Veg */}
            <TouchableOpacity 
              style={[styles.filterTagBtn, { backgroundColor: colors.card, borderColor: colors.border }, vegOnly && styles.filterTagBtnActive]}
              onPress={() => setVegOnly(!vegOnly)}
            >
              <View style={[styles.vegBadgeCircle, { borderColor: vegOnly ? "#FFFFFF" : "#388E3C" }]}>
                <View style={[styles.vegDotSmall, { backgroundColor: vegOnly ? "#FFFFFF" : "#388E3C" }]} />
              </View>
              <Text style={[styles.filterTagText, { color: colors.textSecondary }, vegOnly && styles.filterTagTextActive]}>
                Pure Veg
              </Text>
            </TouchableOpacity>

            {/* Clear All Filters Button */}
            {(sortByRating || fastDelivery || vegOnly || searchText !== "") && (
              <TouchableOpacity style={styles.clearFiltersBtn} onPress={clearAllFilters}>
                <Text style={styles.clearFiltersText}>Reset</Text>
                <Ionicons name="refresh-outline" size={12} color="#E23E3E" style={{ marginLeft: 4 }} />
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>

        {/* All Restaurants Title */}
        <View style={styles.allRestaurantsTitleRow}>
          <Text style={[styles.allRestaurantsTitle, { color: colors.text }]}>
            {filteredRestaurants.length} Restaurants Near You
          </Text>
          <Text style={[styles.allRestaurantsSubtitle, { color: colors.textSecondary }]}>central area</Text>
        </View>

        {/* All Restaurants List */}
        <View style={styles.restaurantContainer}>
          {filteredRestaurants.length === 0 ? (
            <View style={[styles.noResultsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="search-outline" size={50} color={colors.textSecondary} style={{ marginBottom: 12 }} />
              <Text style={[styles.noResultsTitle, { color: colors.text }]}>No Restaurants Found</Text>
              <Text style={[styles.noResultsSubtitle, { color: colors.textSecondary }]}>Try searching for something else or reset filters.</Text>
              <TouchableOpacity style={styles.noResultsBtn} onPress={clearAllFilters}>
                <Text style={styles.noResultsBtnText}>Reset All Filters</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredRestaurants.map((item, index) => (
              <Animated.View 
                key={item.id} 
                entering={FadeInDown.delay(index * 100).springify()}
              >
                <TouchableOpacity
                  activeOpacity={0.95}
                  style={[styles.restaurantCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => navigation.navigate("RestaurantDetail", { id: item.id, name: item.name, rating: item.rating, deliveryTime: item.deliveryTime })}
                >
                  {/* Restaurant Cover Image */}
                  <View style={styles.cardImageWrapper}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    
                    {/* Promoted Tag */}
                    {item.isPromoted && (
                      <View style={styles.promotedBadge}>
                        <Text style={styles.promotedText}>AD</Text>
                      </View>
                    )}

                    {/* Discount Overlay Badge */}
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountBadgeText}>{item.discount}</Text>
                    </View>
                  </View>

                  {/* Restaurant Details */}
                  <View style={styles.cardInfo}>
                    <View style={styles.nameRow}>
                      <Text style={[styles.nameText, { color: colors.text }]} numberOfLines={1}>{item.name}</Text>
                      
                      <View style={[styles.ratingContainer, { backgroundColor: parseFloat(item.rating) >= 4.5 ? "#2E7D32" : "#388E3C" }]}>
                        <Text style={styles.ratingLabelText}>{item.rating}</Text>
                        <Ionicons name="star" size={10} color="#FFFFFF" />
                      </View>
                    </View>

                    <View style={styles.cuisinesRow}>
                      <Text style={[styles.cuisinesText, { color: colors.textSecondary }]} numberOfLines={1}>
                        {item.cuisines}
                      </Text>
                      <Text style={[styles.costText, { color: colors.text }]}>{item.costForTwo}</Text>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.divider }]} />

                    <View style={styles.footerRow}>
                      <View style={styles.footerLeftBadge}>
                        <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>{item.deliveryTime}</Text>
                      </View>
                      <View style={styles.footerLeftBadge}>
                        <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                        <Text style={[styles.footerText, { color: colors.textSecondary }]}>{item.distance}</Text>
                      </View>
                      
                      {item.isVeg && (
                        <View style={styles.vegLabelBadge}>
                          <View style={styles.vegBadgeCircleSmall}>
                            <View style={styles.vegDotSmallGreen} />
                          </View>
                          <Text style={styles.vegLabelText}>PURE VEG</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  scrollContent: {
    paddingBottom: 90,
  },
  
  /* Header Styles */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F2",
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  themeToggleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  locationContainer: {
    flex: 1,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1F1F1F",
    marginLeft: 4,
    letterSpacing: -0.3,
  },
  locationText: {
    fontSize: 12,
    color: "#6C757D",
    marginTop: 2,
    marginLeft: 4,
    fontWeight: "500",
  },
  profileBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#FFCDD2",
  },
  profileImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  /* Search Container Styles */
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F6F8",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  searchInput: {
    flex: 1,
    color: "#1F1F1F",
    fontSize: 13,
    fontWeight: "600",
  },
  verticalLine: {
    width: 1,
    height: 20,
    backgroundColor: "#DEE2E6",
    marginHorizontal: 10,
  },
  micBtn: {
    padding: 2,
  },

  /* Promo Banners Carousel Styles */
  bannersScroll: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 18,
  },
  bannerContainer: {
    width: width * 0.8,
    borderRadius: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    height: 156,
    marginRight: 12,
    shadowColor: "#1C1C1E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  bannerContent: {
    flex: 1.2,
    zIndex: 2,
  },
  bannerTagBadge: {
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  bannerTagBadgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  bannerSubtitle: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
    opacity: 0.9,
  },
  orderBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: "flex-start",
    marginTop: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  orderBtnText: {
    fontSize: 11,
    fontWeight: "800",
  },
  bannerImage: {
    position: "absolute",
    right: -25,
    bottom: -20,
    width: 140,
    height: 140,
    resizeMode: "cover",
    borderRadius: 70,
  },

  /* Mind Section Categories Styles */
  mindSection: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F2",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1F1F1F",
    paddingHorizontal: 16,
    marginBottom: 14,
    letterSpacing: -0.3,
  },
  mindScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  mindCard: {
    alignItems: "center",
    width: 68,
  },
  mindImgContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#F8F9FA",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 8,
    overflow: "hidden",
  },
  mindActiveImgContainer: {
    borderColor: "#E23E3E",
    borderWidth: 2,
    backgroundColor: "#FFF5F5",
  },
  mindImg: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  mindName: {
    fontSize: 11,
    color: "#495057",
    fontWeight: "700",
    textAlign: "center",
  },
  mindActiveName: {
    color: "#E23E3E",
    fontWeight: "900",
  },

  /* Top Brands Section */
  topBrandsSection: {
    marginTop: 14,
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F2",
  },
  brandsScroll: {
    paddingHorizontal: 16,
    gap: 12,
  },
  brandCard: {
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EEF0F2",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  brandImageWrapper: {
    height: 90,
    position: "relative",
  },
  brandImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  brandDiscountOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  brandDiscountText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
    textAlign: "center",
  },
  brandInfo: {
    padding: 10,
  },
  brandName: {
    fontSize: 13,
    fontWeight: "800",
    color: "#212529",
  },
  brandMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  brandRatingBadge: {
    backgroundColor: "#388E3C",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    gap: 2,
  },
  brandRatingText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  brandTimeText: {
    fontSize: 9,
    color: "#6C757D",
    fontWeight: "600",
  },

  /* Filters Section Styles */
  filtersSection: {
    paddingVertical: 14,
    backgroundColor: "#F4F6F8",
  },
  filtersScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterTagBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  filterTagBtnActive: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },
  filterTagText: {
    fontSize: 11,
    color: "#495057",
    fontWeight: "700",
  },
  filterTagTextActive: {
    color: "#FFFFFF",
  },
  vegBadgeCircle: {
    width: 10,
    height: 10,
    borderWidth: 1.2,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  vegDotSmall: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  clearFiltersBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFE0D3",
    backgroundColor: "#FFF5F1",
  },
  clearFiltersText: {
    fontSize: 11,
    color: "#FF6B35",
    fontWeight: "800",
  },

  /* All Restaurants Section Title */
  allRestaurantsTitleRow: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 12,
  },
  allRestaurantsTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#1F1F1F",
    letterSpacing: -0.3,
  },
  allRestaurantsSubtitle: {
    fontSize: 10,
    color: "#8E8E93",
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 0.5,
    marginTop: 2,
  },

  /* Restaurant Cards Container Styles */
  restaurantContainer: {
    paddingHorizontal: 16,
  },
  restaurantCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: "#1C1C1E",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#EEF0F2",
  },
  cardImageWrapper: {
    height: 170,
    position: "relative",
    backgroundColor: "#DEE2E6",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  promotedBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  promotedText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "#3F51B5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  discountBadgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "900",
  },
  cardInfo: {
    padding: 16,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameText: {
    fontSize: 17,
    fontWeight: "900",
    color: "#1F1F1F",
    flex: 1,
    marginRight: 10,
    letterSpacing: -0.3,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  ratingLabelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  cuisinesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  cuisinesText: {
    fontSize: 12,
    color: "#6C757D",
    flex: 1.3,
    marginRight: 10,
    fontWeight: "500",
  },
  costText: {
    fontSize: 12,
    color: "#1F1F1F",
    fontWeight: "700",
    textAlign: "right",
    flex: 0.7,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F3F5",
    marginVertical: 12,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  footerLeftBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontSize: 11,
    color: "#495057",
    fontWeight: "700",
  },
  vegLabelBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginLeft: "auto",
  },
  vegBadgeCircleSmall: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: "#388E3C",
    borderRadius: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  vegDotSmallGreen: {
    width: 3,
    height: 3,
    backgroundColor: "#388E3C",
    borderRadius: 1.5,
  },
  vegLabelText: {
    fontSize: 8,
    color: "#388E3C",
    fontWeight: "800",
  },

  /* No Results Card Styles */
  noResultsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.02,
    shadowRadius: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF0F2",
    marginTop: 20,
  },
  noResultsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#212529",
    marginBottom: 6,
  },
  noResultsSubtitle: {
    fontSize: 12,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 20,
  },
  noResultsBtn: {
    backgroundColor: "#FFF5F1",
    borderColor: "#FFE0D3",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  noResultsBtnText: {
    color: "#FF6B35",
    fontSize: 12,
    fontWeight: "800",
  },
});