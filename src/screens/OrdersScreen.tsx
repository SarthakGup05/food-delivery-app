import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CartContext } from "../context/CartContext";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "../context/ThemeContext";

export default function OrdersScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const { activeOrders, pastOrders, addToCart } = useContext(CartContext);
  
  const [activeSubTab, setActiveSubTab] = useState<"active" | "past">("active");

  const handleReorder = (order: any) => {
    // Parse order items (e.g. "1x Hyderabadi Dum Biryani, 1x Double Chocolate Pastry")
    const itemsRaw = order.items.split(", ");
    
    itemsRaw.forEach((itemStr: string) => {
      const match = itemStr.match(/^(\d+)x\s+(.+)$/);
      if (match) {
        const qty = parseInt(match[1]);
        const dishName = match[2];
        
        // Approximate a menu item structure for addToCart
        const mockedItem = {
          name: dishName,
          price: Math.round(order.price / itemsRaw.length / qty), // Approximate single item price
          quantity: qty,
        };

        // Add to cart matching quantity
        for (let i = 0; i < qty; i++) {
          addToCart(mockedItem);
        }
      }
    });

    navigation.navigate("Cart");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }, { paddingTop: Math.max(insets.top, 12) }]}>
        <Text style={[styles.pageTitle, { color: colors.text }]}>My Orders</Text>
        <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>Track active deliveries & billing receipts</Text>
      </View>

      {/* Sub-Tabs Indicator */}
      <View style={[styles.subTabsContainer, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.subTab, activeSubTab === "active" && { backgroundColor: isDark ? "#242630" : "#FFF0EA" }] as any}
          onPress={() => setActiveSubTab("active")}
        >
          <Text style={[styles.subTabText, { color: colors.textSecondary }, activeSubTab === "active" && { color: "#FF6B35", fontWeight: "900" }] as any}>
            Active Deliveries ({activeOrders.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTab, activeSubTab === "past" && { backgroundColor: isDark ? "#242630" : "#FFF0EA" }] as any}
          onPress={() => setActiveSubTab("past")}
        >
          <Text style={[styles.subTabText, { color: colors.textSecondary }, activeSubTab === "past" && { color: "#FF6B35", fontWeight: "900" }] as any}>
            Past Receipts ({pastOrders.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Orders List Container */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {activeSubTab === "active" ? (
          /* Active Deliveries Flow */
          activeOrders.length === 0 ? (
            <Animated.View entering={FadeInDown.delay(100).springify()} style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
              <View style={[styles.emptyIconWrapper, { backgroundColor: colors.border }]}>
                <Ionicons name="bicycle-outline" size={70} color="#FF6B35" />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No Active Orders</Text>
              <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
                You don't have any pending food deliveries right now. Hungering for something delicious?
              </Text>
              <TouchableOpacity 
                style={styles.exploreBtn} 
                onPress={() => navigation.navigate("Home")}
              >
                <Text style={styles.exploreBtnText}>Browse Restaurants</Text>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            activeOrders.map((order: any, idx: number) => (
              <Animated.View 
                key={order.id} 
                entering={FadeInUp.delay(idx * 100).springify()}
              >
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={[styles.activeOrderCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                  onPress={() => navigation.navigate("HomeTab", { screen: "ActiveOrder", params: { orderId: order.id } })}
                >
                  <View style={styles.activeCardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.activeRestName, { color: colors.text }]} numberOfLines={1}>{order.restaurant}</Text>
                      <Text style={[styles.activeDate, { color: colors.textSecondary }]}>{order.date}</Text>
                    </View>
                    
                    <View style={styles.pulsingBadge}>
                      <View style={styles.pulsingDot} />
                      <Text style={styles.pulsingBadgeText}>Live Status</Text>
                    </View>
                  </View>

                  <View style={styles.activeCardBody}>
                    <View style={styles.trackingProgressRow}>
                      <Ionicons name={order.statusIcon as any} size={16} color="#FF6B35" />
                      <Text style={[styles.liveStatusTitle, { color: colors.textSecondary }]}>
                        Current Stage: <Text style={[styles.liveStatusBold, { color: colors.text }]}>{order.status}</Text>
                      </Text>
                    </View>
                    
                    <View style={styles.liveProgressBarBg}>
                      <View style={[styles.liveProgressBarFill, { width: `${order.progress * 100}%` }]} />
                    </View>

                    <Text style={[styles.activeItemsText, { color: colors.textSecondary }]} numberOfLines={1}>
                      {order.items}
                    </Text>
                  </View>

                  <View style={styles.activeCardFooter}>
                    <Text style={[styles.activePriceText, { color: colors.text }]}>Total: ₹{order.price}</Text>
                    
                    <View style={styles.activeTrackBtn}>
                      <Text style={styles.activeTrackBtnText}>Live Track</Text>
                      <Ionicons name="chevron-forward" size={14} color="#FFFFFF" style={{ marginLeft: 2 }} />
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))
          )
        ) : (
          /* Past Receipts History List */
          pastOrders.length === 0 ? (
            <Animated.View entering={FadeInDown.delay(100).springify()} style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
              <View style={[styles.emptyIconWrapper, { backgroundColor: colors.border }]}>
                <Ionicons name="receipt-outline" size={70} color={colors.textSecondary} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No Order History</Text>
              <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
                You haven't ordered any food yet. Treat yourself today!
              </Text>
            </Animated.View>
          ) : (
            pastOrders.map((order: any, idx: number) => (
              <Animated.View 
                key={order.id} 
                entering={FadeInUp.delay(idx * 80).springify()}
                style={[styles.pastCard, { backgroundColor: colors.card, borderColor: colors.border }]}
              >
                <View style={styles.pastCardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.pastRestName, { color: colors.text }]} numberOfLines={1}>{order.restaurant}</Text>
                    <Text style={[styles.pastDate, { color: colors.textSecondary }]}>{order.date}</Text>
                  </View>
                  <View style={styles.deliveredBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#10B981" style={{ marginRight: 4 }} />
                    <Text style={styles.deliveredText}>Delivered</Text>
                  </View>
                </View>

                <View style={styles.pastCardBody}>
                  <Text style={[styles.pastItemsText, { color: colors.textSecondary }]} numberOfLines={2}>
                    {order.items}
                  </Text>
                </View>

                <View style={styles.pastCardFooter}>
                  <Text style={[styles.pastPriceText, { color: colors.text }]}>₹{order.price}</Text>
                  
                  <TouchableOpacity 
                    style={[styles.reorderBtn, { borderColor: colors.border }]} 
                    activeOpacity={0.8}
                    onPress={() => handleReorder(order)}
                  >
                    <Ionicons name="refresh-outline" size={14} color="#FF6B35" style={{ marginRight: 4 }} />
                    <Text style={[styles.reorderText, { color: colors.text }]}>Reorder Items</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ))
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#181A20",
    letterSpacing: -0.3,
  },
  pageSubtitle: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "600",
    marginTop: 2,
  },
  
  /* Sub Tabs Styles */
  subTabsContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
  },
  subTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
  },
  subTabActive: {
    backgroundColor: "#FFF5F1",
  },
  subTabText: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "700",
  },
  subTabTextActive: {
    color: "#FF6B35",
    fontWeight: "900",
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 110,
  },

  /* Active Order Card */
  activeOrderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#FFE0D3",
  },
  activeCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9FA",
    paddingBottom: 12,
    marginBottom: 12,
  },
  activeRestName: {
    fontSize: 15,
    fontWeight: "900",
    color: "#181A20",
    letterSpacing: -0.2,
  },
  activeDate: {
    fontSize: 11,
    color: "#8E8E93",
    marginTop: 2,
    fontWeight: "500",
  },
  pulsingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF5F1",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#FFCDD2",
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF6B35",
    marginRight: 6,
  },
  pulsingBadgeText: {
    fontSize: 9,
    color: "#FF6B35",
    fontWeight: "900",
  },
  activeCardBody: {
    marginBottom: 14,
  },
  trackingProgressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  liveStatusTitle: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "600",
  },
  liveStatusBold: {
    color: "#FF6B35",
    fontWeight: "800",
  },
  liveProgressBarBg: {
    height: 5,
    backgroundColor: "#F1F5F9",
    borderRadius: 2.5,
    marginTop: 8,
    marginBottom: 10,
    overflow: "hidden",
  },
  liveProgressBarFill: {
    height: "100%",
    backgroundColor: "#FF6B35",
    borderRadius: 2.5,
  },
  activeItemsText: {
    fontSize: 12,
    color: "#8E8E93",
    fontWeight: "500",
  },
  activeCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F8F9FA",
    paddingTop: 12,
  },
  activePriceText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#181A20",
  },
  activeTrackBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  activeTrackBtnText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  /* Past Orders Cards */
  pastCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  pastCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9FA",
    paddingBottom: 10,
    marginBottom: 10,
  },
  pastRestName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#181A20",
    letterSpacing: -0.2,
  },
  pastDate: {
    fontSize: 11,
    color: "#8E8E93",
    marginTop: 2,
    fontWeight: "500",
  },
  deliveredBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  deliveredText: {
    fontSize: 10,
    color: "#10B981",
    fontWeight: "800",
  },
  pastCardBody: {
    marginBottom: 12,
  },
  pastItemsText: {
    fontSize: 12,
    color: "#6C757D",
    lineHeight: 18,
    fontWeight: "500",
  },
  pastCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F8F9FA",
    paddingTop: 10,
  },
  pastPriceText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#181A20",
  },
  reorderBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FF6B35",
    borderWidth: 1.2,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  reorderText: {
    color: "#FF6B35",
    fontSize: 11,
    fontWeight: "800",
  },

  /* Empty States */
  emptyContainer: {
    alignItems: "center",
    padding: 32,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  emptyIconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF5F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#181A20",
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 12,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  exploreBtn: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  exploreBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});
