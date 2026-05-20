import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Switch,
} from "react-native";
import { CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

// Mock Detailed Menu Items categorized
const menuCategories = [
  {
    categoryName: "Recommended",
    items: [
      {
        id: "m1",
        name: "Hyderabadi Dum Biryani",
        description: "Fragrant long grain basmati rice layered with spiced tender chicken, fried onions, and saffron.",
        price: 299,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=400&auto=format&fit=crop",
        isVeg: false,
        isBestseller: true,
      },
      {
        id: "m2",
        name: "Butter Chicken Combo",
        description: "Creamy, rich tomato gravy with tandoori chicken, served with 2 pieces of fresh butter naan.",
        price: 349,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=400&auto=format&fit=crop",
        isVeg: false,
        isBestseller: true,
      },
      {
        id: "m3",
        name: "Paneer Tikka Roll",
        description: "Succulent paneer cubes marinated in spices, grilled, and wrapped in a fresh flatbread with mint chutney.",
        price: 189,
        image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400&auto=format&fit=crop",
        isVeg: true,
        isBestseller: true,
      },
    ],
  },
  {
    categoryName: "Main Course",
    items: [
      {
        id: "m4",
        name: "Dal Makhani Palace",
        description: "Black lentils slow-cooked overnight with cream and butter, flavored with rich spices.",
        price: 249,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400&auto=format&fit=crop",
        isVeg: true,
        isBestseller: false,
      },
      {
        id: "m5",
        name: "Kadhai Paneer Special",
        description: "Paneer cooked with bell peppers, tomatoes, and freshly ground kadhai spices in a rich gravy.",
        price: 279,
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=400&auto=format&fit=crop",
        isVeg: true,
        isBestseller: false,
      },
      {
        id: "m6",
        name: "Garlic Butter Naan",
        description: "Soft leavened flatbread topped with chopped garlic and coriander, glazed with rich butter.",
        price: 59,
        image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop",
        isVeg: true,
        isBestseller: false,
      },
    ],
  },
  {
    categoryName: "Snacks & Starters",
    items: [
      {
        id: "m7",
        name: "Crispy Chilli Potato",
        description: "Crispy fried potatoes tossed in a sweet, spicy, and tangy chilli sauce, sprinkled with sesame seeds.",
        price: 159,
        image: "https://images.unsplash.com/photo-1518013002798-20885957515f?q=80&w=400&auto=format&fit=crop",
        isVeg: true,
        isBestseller: false,
      },
      {
        id: "m8",
        name: "Tandoori Chicken Wing (4 Pcs)",
        description: "Spicy chicken wings marinated in tandoori spices and yoghurt, charred in our authentic clay oven.",
        price: 219,
        image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400&auto=format&fit=crop",
        isVeg: false,
        isBestseller: false,
      },
    ],
  },
  {
    categoryName: "Desserts & Drinks",
    items: [
      {
        id: "m9",
        name: "Gulab Jamun Duo",
        description: "Two warm, soft milk-solid dumplings dipped in cardamom scented rose water sugar syrup.",
        price: 99,
        image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=400&auto=format&fit=crop",
        isVeg: true,
        isBestseller: false,
      },
      {
        id: "m10",
        name: "Fudge Brownie with Ice Cream",
        description: "Warm, gooey chocolate fudge brownie topped with a scoop of premium vanilla ice cream.",
        price: 149,
        image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop",
        isVeg: true,
        isBestseller: true,
      },
    ],
  },
];

const bankOffers = [
  { id: "o1", title: "Flat 15% OFF", code: "WELCOME15", desc: "For orders above ₹300" },
  { id: "o2", title: "Free Delivery", code: "FREEDEL", desc: "For orders above ₹400" },
  { id: "o3", title: "Flat ₹100 OFF", code: "RUPAY100", desc: "On RuPay Credit Cards" },
];

export default function RestaurantDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { addToCart, removeFromCart, getItemQuantity, cart } = useContext(CartContext);
  const { id, name = "Restaurant Palace", rating = "4.8", deliveryTime = "25 mins" } = route.params || {};
  const insets = useSafeAreaInsets();
  const { isDark, colors } = useAppTheme();

  const [searchText, setSearchText] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const calculateSubtotal = () => {
    return cart.reduce((sum: number, item: any) => sum + item.price * (item.quantity || 1), 0);
  };

  const totalItems = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
  const subtotal = calculateSubtotal();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Banner Cover Photo */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=800&auto=format&fit=crop" }}
            style={styles.bannerImage}
          />
          <View style={styles.darkOverlay} />
          
          {/* Header Controls inside image */}
          <View style={[styles.headerControlsRow, { top: Math.max(insets.top, 15) }]}>
            <TouchableOpacity
              style={styles.backButtonCircle}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={22} color="#1F1F1F" />
            </TouchableOpacity>
            
            <View style={styles.rightHeaderControls}>
              <TouchableOpacity style={styles.backButtonCircle}>
                <Ionicons name="share-social-outline" size={20} color="#1F1F1F" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButtonCircle}>
                <Ionicons name="heart-outline" size={20} color="#1F1F1F" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Floating Restaurant Detail Card */}
        <View style={styles.infoCardWrapper}>
          <View style={[styles.restaurantInfoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.mainInfoRow}>
              <View>
                <Text style={[styles.restaurantName, { color: colors.text }]}>{name}</Text>
                <Text style={[styles.cuisines, { color: colors.textSecondary }]}>North Indian • Mughlai • Biryani • Desserts</Text>
                <Text style={[styles.address, { color: colors.textSecondary }]}>Sector 6, HSR Layout, Bengaluru</Text>
              </View>
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>{rating}</Text>
                <Ionicons name="star" size={12} color="#FFFFFF" />
              </View>
            </View>

            <View style={[styles.horizontalDivider, { backgroundColor: colors.divider }]} />

            <View style={styles.metricsRow}>
              <View style={styles.metricItem}>
                <View style={styles.metricIconCircle}>
                  <Ionicons name="time" size={16} color="#FF6B35" />
                </View>
                <Text style={[styles.metricValue, { color: colors.text }]}>{deliveryTime}</Text>
                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Delivery</Text>
              </View>

              <View style={[styles.verticalSeparator, { backgroundColor: colors.divider }]} />

              <View style={styles.metricItem}>
                <View style={styles.metricIconCircle}>
                  <Ionicons name="location" size={16} color="#3F51B5" />
                </View>
                <Text style={[styles.metricValue, { color: colors.text }]}>2.4 km</Text>
                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Distance</Text>
              </View>

              <View style={[styles.verticalSeparator, { backgroundColor: colors.divider }]} />

              <View style={styles.metricItem}>
                <View style={styles.metricIconCircle}>
                  <Ionicons name="wallet" size={16} color="#388E3C" />
                </View>
                <Text style={[styles.metricValue, { color: colors.text }]}>₹300</Text>
                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>For Two</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bank & Coupon Offers (Horizontal scroll) */}
        <View style={styles.offersSection}>
          <Text style={[styles.sectionHeaderTitle, { color: colors.text }]}>Offers for you</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offersScroll}
          >
            {bankOffers.map((offer) => (
              <View key={offer.id} style={[styles.offerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.offerTagRow}>
                  <Ionicons name="bookmark" size={16} color="#FF6B35" style={{ marginRight: 6 }} />
                  <Text style={[styles.offerTitle, { color: colors.text }]}>{offer.title}</Text>
                </View>
                <Text style={styles.offerCode}>Use {offer.code}</Text>
                <Text style={[styles.offerDesc, { color: colors.textSecondary }]}>{offer.desc}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Search and Filters inside Menu */}
        <View style={[styles.menuControlsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={[styles.searchBarContainer, { backgroundColor: colors.inputBg }]}>
            <Ionicons name="search" size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Search dishes, courses..."
              placeholderTextColor={isDark ? "#8E8EAE" : "#8E8E93"}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          
          <View style={styles.filterRow}>
            <TouchableOpacity 
              style={[styles.vegFilterButton, { backgroundColor: colors.card, borderColor: isDark ? "#242630" : "#C8E6C9" }, vegOnly && styles.vegFilterActive]}
              onPress={() => setVegOnly(!vegOnly)}
            >
              <View style={[styles.vegIndicatorCircle, { borderColor: "#388E3C" }]}>
                <View style={[styles.vegDotSmall, { backgroundColor: "#388E3C" }]} />
              </View>
              <Text style={[styles.filterLabel, { color: colors.textSecondary }, vegOnly && { color: "#388E3C", fontWeight: "800" }]}>
                Veg Only
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.filterButtonOutline, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Ionicons name="funnel-outline" size={14} color={colors.text} />
              <Text style={[styles.filterLabel, { color: colors.text }]}>Bestsellers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Items by Categories */}
        {menuCategories.map((category, catIndex) => {
          // Filter items based on search text and vegOnly switch
          const filteredItems = category.items.filter((dish) => {
            const matchesSearch = dish.name.toLowerCase().includes(searchText.toLowerCase()) ||
              dish.description.toLowerCase().includes(searchText.toLowerCase());
            const matchesVeg = !vegOnly || dish.isVeg;
            return matchesSearch && matchesVeg;
          });

          if (filteredItems.length === 0) return null;

          return (
            <View key={category.categoryName} style={styles.categoryBlock}>
              <View style={styles.categoryTitleRow}>
                <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.categoryName}</Text>
                <View style={[styles.categoryCountBadge, { backgroundColor: colors.border }]}>
                  <Text style={[styles.categoryCountText, { color: colors.text }]}>{filteredItems.length}</Text>
                </View>
              </View>

              {filteredItems.map((dish, index) => {
                const quantity = getItemQuantity(dish.name);

                return (
                  <Animated.View
                    entering={FadeInDown.delay(index * 100).springify()}
                    key={dish.id}
                    style={[styles.menuItemCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  >
                    {/* Item Information (Left) */}
                    <View style={styles.menuItemLeft}>
                      {/* Veg / Non-Veg badge */}
                      <View style={[styles.vegBadge, { borderColor: dish.isVeg ? "#388E3C" : "#D32F2F" }]}>
                        <View style={[styles.vegDot, { backgroundColor: dish.isVeg ? "#388E3C" : "#D32F2F", borderRadius: dish.isVeg ? 4 : 0 }]} />
                      </View>

                      {dish.isBestseller && (
                        <View style={styles.bestsellerBadge}>
                          <Ionicons name="star" size={10} color="#FFC107" style={{ marginRight: 2 }} />
                          <Text style={styles.bestsellerText}>Bestseller</Text>
                        </View>
                      )}

                      <Text style={[styles.dishName, { color: colors.text }]}>{dish.name}</Text>
                      <Text style={[styles.dishPrice, { color: colors.text }]}>₹{dish.price}</Text>
                      <Text style={[styles.dishDescription, { color: colors.textSecondary }]} numberOfLines={3}>
                        {dish.description}
                      </Text>
                    </View>

                    {/* Item Image and ADD Stepper (Right) */}
                    <View style={styles.menuItemRight}>
                      <Image source={{ uri: dish.image }} style={styles.dishImage} />
                      
                      {/* Floating Stepper Button */}
                      <View style={styles.addButtonOverlay}>
                        {quantity === 0 ? (
                          <TouchableOpacity
                            style={[styles.addButton, { backgroundColor: colors.card, borderColor: colors.border }]}
                            activeOpacity={0.95}
                            onPress={() => addToCart({ name: dish.name, price: dish.price, image: dish.image })}
                          >
                            <Text style={styles.addButtonText}>ADD</Text>
                            <Ionicons name="add" size={13} color="#FF6B35" style={{ marginLeft: 2 }} />
                          </TouchableOpacity>
                        ) : (
                          <View style={styles.stepperButton}>
                            <TouchableOpacity
                              style={styles.stepperAction}
                              onPress={() => removeFromCart(dish.name)}
                            >
                              <Ionicons name="remove" size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                            
                            <Text style={styles.stepperText}>{quantity}</Text>
                            
                            <TouchableOpacity
                              style={styles.stepperAction}
                              onPress={() => addToCart({ name: dish.name, price: dish.price, image: dish.image })}
                            >
                              <Ionicons name="add" size={16} color="#FFFFFF" />
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
                    </View>
                  </Animated.View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>

      {/* Floating Checkout Footer */}
      {totalItems > 0 && (
        <View style={[styles.cartFooter, { bottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity
            style={styles.viewCartButton}
            activeOpacity={0.95}
            onPress={() => navigation.navigate("Cart")}
          >
            <View style={styles.footerLeft}>
              <View style={styles.footerBadge}>
                <Text style={styles.footerBadgeText}>{totalItems}</Text>
              </View>
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.viewCartText}>₹{subtotal}</Text>
                <Text style={styles.viewCartSubText}>Plus taxes & charges</Text>
              </View>
            </View>
            <View style={styles.footerRight}>
              <Text style={styles.viewCartBtnLabel}>View Cart</Text>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" style={{ marginLeft: 4 }} />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  scrollContent: {
    paddingBottom: 110,
  },
  bannerContainer: {
    height: 220,
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  headerControlsRow: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButtonCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  rightHeaderControls: {
    flexDirection: "row",
    gap: 10,
  },
  infoCardWrapper: {
    marginTop: -40,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  restaurantInfoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#1C1C1E",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#EEF0F2",
  },
  mainInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1F1F1F",
    letterSpacing: -0.3,
  },
  cuisines: {
    fontSize: 13,
    color: "#6C757D",
    marginTop: 4,
    fontWeight: "500",
  },
  address: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
  },
  ratingBadge: {
    backgroundColor: "#388E3C",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: "#F1F3F5",
    marginVertical: 16,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  metricItem: {
    alignItems: "center",
    flex: 1,
  },
  metricIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#1F1F1F",
  },
  metricLabel: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 2,
    fontWeight: "600",
  },
  verticalSeparator: {
    width: 1,
    height: 30,
    backgroundColor: "#E9ECEF",
  },
  offersSection: {
    marginTop: 20,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F1F1F",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  offersScroll: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 4,
  },
  offerCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E23E3E",
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 14,
    width: 180,
    height: 90,
    justifyContent: "center",
  },
  offerTagRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  offerTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#E23E3E",
  },
  offerCode: {
    fontSize: 11,
    fontWeight: "700",
    color: "#212529",
  },
  offerDesc: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 2,
  },
  menuControlsCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 20,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F3F5",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F6F8",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    color: "#1F1F1F",
    fontSize: 14,
    fontWeight: "500",
  },
  filterRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  vegFilterButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C8E6C9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  vegFilterActive: {
    backgroundColor: "#E8F5E9",
    borderColor: "#388E3C",
  },
  vegIndicatorCircle: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  vegDotSmall: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  filterButtonOutline: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    gap: 4,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#495057",
  },
  categoryBlock: {
    marginTop: 24,
  },
  categoryTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#1F1F1F",
  },
  categoryCountBadge: {
    backgroundColor: "#E9ECEF",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  categoryCountText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#495057",
  },
  menuItemCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF0F2",
  },
  menuItemLeft: {
    flex: 1,
    marginRight: 16,
  },
  vegBadge: {
    width: 14,
    height: 14,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
    borderRadius: 2,
  },
  vegDot: {
    width: 6,
    height: 6,
  },
  bestsellerBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF9C4",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  bestsellerText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#F57F17",
  },
  dishName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#212529",
  },
  dishPrice: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F1F1F",
    marginTop: 4,
  },
  dishDescription: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 8,
    lineHeight: 18,
    fontWeight: "500",
  },
  menuItemRight: {
    position: "relative",
    width: 110,
    height: 110,
    alignItems: "center",
  },
  dishImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    resizeMode: "cover",
  },
  addButtonOverlay: {
    position: "absolute",
    bottom: -8,
    alignSelf: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  addButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "#FFE0D3",
    borderWidth: 1,
    borderRadius: 10,
    width: 80,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  addButtonText: {
    color: "#FF6B35",
    fontWeight: "900",
    fontSize: 13,
  },
  addPlusIcon: {
    position: "absolute",
    right: 6,
    top: 4,
  },
  stepperButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 10,
    width: 88,
    height: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  stepperAction: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  stepperText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },
  cartFooter: {
    position: "absolute",
    left: 16,
    right: 16,
    zIndex: 99,
  },
  viewCartButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 18,
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  footerBadgeText: {
    color: "#FF6B35",
    fontWeight: "900",
    fontSize: 13,
  },
  viewCartText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },
  viewCartSubText: {
    color: "#FFE0D3",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 1,
  },
  footerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewCartBtnLabel: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },
});