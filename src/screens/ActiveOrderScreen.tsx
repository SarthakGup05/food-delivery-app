import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CartContext } from "../context/CartContext";
import { useAppTheme } from "../context/ThemeContext";
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function ActiveOrderScreen({ route, navigation }: { route: any; navigation: any }) {
  const insets = useSafeAreaInsets();
  const { activeOrders, cancelOrder, moveToPast } = useContext(CartContext);
  const { orderId } = route.params || {};
  const { colors, isDark } = useAppTheme();

  // Find active order in context
  const order = activeOrders.find((o: any) => o.id === orderId) || activeOrders[0];

  // Live simulated stats state
  const [liveDistance, setLiveDistance] = useState(2.4);
  const [liveSpeed, setLiveSpeed] = useState(32);
  const [liveTime, setLiveTime] = useState(order?.timeLeft ?? 15);

  // Animation values
  const pulseVal = useSharedValue(1);
  const riderProgress = useSharedValue(0);

  useEffect(() => {
    // Start pulsing green glow on active milestone
    pulseVal.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 1000, easing: Easing.ease }),
        withTiming(1.0, { duration: 1000, easing: Easing.ease })
      ),
      -1,
      true
    );

    // Ride path dot translation
    riderProgress.value = withRepeat(
      withTiming(1, { duration: 8000, easing: Easing.linear }),
      -1,
      false
    );

    // Live dashboard status simulations
    const interval = setInterval(() => {
      if (order && order.status !== "Delivered") {
        setLiveDistance((prev: number) => {
          const next = prev - 0.04;
          return next <= 0.1 ? 0.1 : parseFloat(next.toFixed(2));
        });
        setLiveSpeed(() => Math.floor(Math.random() * (38 - 25 + 1)) + 25);
        setLiveTime((prev: number) => (prev <= 1 ? 1 : prev));
      } else {
        setLiveDistance(0.0);
        setLiveSpeed(0);
        setLiveTime(0);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [order?.id, order?.status]);

  // Relocated early return to comply with React Rules of Hooks

  // Stepper Milestones Configuration
  const milestones = [
    { key: "Confirmed", title: "Order Accepted", desc: "Restaurant accepted your order", icon: "receipt" },
    { key: "Preparing", title: "Preparing Food", desc: "Chef is packing your delicious meal", icon: "flame" },
    { key: "Driver Arrived", title: "Driver at Restaurant", desc: "Partner is picking up the food parcel", icon: "storefront" },
    { key: "Out for Delivery", title: "In Transit", desc: "Rider is speeding towards your house", icon: "bicycle" },
    { key: "Delivered", title: "Arrived Safely", desc: "Order delivered! Enjoy your meal!", icon: "checkmark-circle" },
  ];

  // Helper to determine milestone index
  const getMilestoneIndex = (status: string) => {
    const idx = milestones.findIndex((m) => m.key === status);
    return idx === -1 ? 0 : idx;
  };

  const activeIndex = getMilestoneIndex(order?.status ?? "Confirmed");

  // Reanimated style for pulsing milestone ring
  const pulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseVal.value }],
      opacity: 2 - pulseVal.value,
    };
  });

  // Rider animated style along simulated path with steering rotation
  const riderStyle = useAnimatedStyle(() => {
    // Animate dot along a curved visual path
    const translationX = riderProgress.value * (width - 100);
    const yVal = Math.sin(riderProgress.value * Math.PI * 2) * 15;
    
    // Slop steering calculation (derivative of sine wave path)
    const dx = width - 100;
    const dy = Math.cos(riderProgress.value * Math.PI * 2) * (Math.PI * 2 * 15);
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI;

    return {
      transform: [
        { translateX: translationX },
        { translateY: yVal },
        { rotate: `${angleDeg}deg` }
      ],
    };
  });

  if (!order) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: colors.background, paddingTop: insets.top }]}>
        <Ionicons name="receipt-outline" size={80} color="#FF6B35" />
        <Text style={[styles.emptyTitle, { color: colors.text }]}>Order Not Found</Text>
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No active order is being tracked right now.</Text>
        <TouchableOpacity style={styles.backHomeBtn} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backHomeText}>Return to Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCancelOrder = () => {
    Alert.alert(
      "Cancel Order?",
      "Are you sure you want to cancel this order? This cannot be undone.",
      [
        { text: "Keep Order", style: "cancel" },
        {
          text: "Cancel Now",
          style: "destructive",
          onPress: () => {
            cancelOrder(order.id);
            navigation.navigate("Home");
          },
        },
      ]
    );
  };

  const handleMockDeliver = () => {
    moveToPast(order.id);
    Alert.alert(
      "Delivered! 🎉",
      "Order has been marked as completed and moved to your past orders summary.",
      [{ text: "Awesome", onPress: () => navigation.navigate("Orders") }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: Math.max(insets.top, 12) }]}>
      
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        <TouchableOpacity style={[styles.backBtn, { backgroundColor: colors.inputBg }]} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleCol}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Live Tracking</Text>
          <Text style={styles.headerSubtitle}>Order ID: {order.id}</Text>
        </View>
        <TouchableOpacity style={styles.helpBtn} onPress={() => navigation.navigate("Help")}>
          <Text style={[styles.helpText, { color: colors.textSecondary }]}>Help</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Estimated Timer card */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.timerCard}>
          <View style={styles.timerRow}>
            <View>
              <Text style={styles.etaText}>Estimated Delivery</Text>
              <Text style={styles.timeCounter}>
                {order.status === "Delivered" ? "Delivered!" : `${order.timeLeft} - ${order.timeLeft + 5} mins`}
              </Text>
            </View>
            <View style={styles.lottieMock}>
              <Ionicons 
                name={order.status === "Delivered" ? "checkmark-done" : "hourglass-outline"} 
                size={38} 
                color="#FFFFFF" 
              />
            </View>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${order.progress * 100}%` }]} />
          </View>
          <Text style={styles.orderSummaryText}>{order.restaurant} • {order.items}</Text>
        </Animated.View>

        {/* Simulated Vector Map Tracking */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={[styles.mapCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.mapTitle, { color: colors.text }]}>Live Delivery Route</Text>
          
          <View style={styles.mapContainer}>
            {/* Draw abstract grid lines */}
            <View style={[styles.mapGridLineH1, { opacity: isDark ? 0.08 : 0.03 }]} />
            <View style={[styles.mapGridLineH2, { opacity: isDark ? 0.08 : 0.03 }]} />
            <View style={[styles.mapGridLineV1, { opacity: isDark ? 0.08 : 0.03 }]} />
            <View style={[styles.mapGridLineV2, { opacity: isDark ? 0.08 : 0.03 }]} />

            {/* Dotted Tracking Route Line */}
            <View style={styles.routePathContainer}>
              <View style={styles.routePathLine} />
              
              {/* Restaurant Marker */}
              <View style={styles.restaurantMarker}>
                <Animated.View style={[styles.restRadarPulse, pulseStyle]} />
                <Ionicons name="restaurant" size={12} color="#FFFFFF" />
              </View>

              {/* Rider animated marker with radar pulsing glow */}
              <Animated.View style={[styles.riderMarker, riderStyle]}>
                <Animated.View style={[styles.riderRadarPulse, pulseStyle]} />
                <Ionicons name="bicycle" size={16} color="#FFFFFF" />
              </Animated.View>

              {/* Home destination marker */}
              <View style={styles.homeMarker}>
                <Animated.View style={[styles.homeRadarPulse, pulseStyle]} />
                <Ionicons name="home" size={12} color="#FFFFFF" />
              </View>
            </View>
          </View>
          
          {/* Live Dynamic Dashboard Stats Row */}
          <View style={styles.liveDashboardRow}>
            <View style={styles.liveStatCol}>
              <Ionicons name="speedometer-outline" size={16} color="#FF6B35" />
              <View style={{ marginLeft: 6 }}>
                <Text style={[styles.liveStatLabel, { color: colors.textSecondary }]}>RIDER SPEED</Text>
                <Text style={[styles.liveStatValue, { color: colors.text }]}>{liveSpeed} km/h</Text>
              </View>
            </View>
            <View style={[styles.liveStatCol, styles.liveStatColBorder, { borderLeftColor: colors.border }]}>
              <Ionicons name="map-outline" size={16} color="#FF6B35" />
              <View style={{ marginLeft: 6 }}>
                <Text style={[styles.liveStatLabel, { color: colors.textSecondary }]}>DISTANCE LEFT</Text>
                <Text style={[styles.liveStatValue, { color: colors.text }]}>{liveDistance} km</Text>
              </View>
            </View>
            <View style={styles.liveStatCol}>
              <Ionicons name="time-outline" size={16} color="#FF6B35" />
              <View style={{ marginLeft: 6 }}>
                <Text style={[styles.liveStatLabel, { color: colors.textSecondary }]}>LIVE TIMER</Text>
                <Text style={[styles.liveStatValue, { color: colors.text }]}>{liveTime} mins</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Rider Profile Card */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={[styles.riderCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.riderRow}>
            <Image 
              source={{ uri: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop" }} 
              style={styles.riderImg} 
            />
            <View style={styles.riderInfo}>
              <Text style={[styles.riderName, { color: colors.text }]}>Rohan Sharma</Text>
              <View style={styles.riderRatingRow}>
                <Ionicons name="star" size={12} color="#FFB800" />
                <Text style={[styles.riderRatingText, { color: colors.textSecondary }]}>4.9 (Vaccinated Partner)</Text>
              </View>
            </View>
            
            <View style={styles.actionBtns}>
              <TouchableOpacity 
                style={[styles.phoneCircle, { backgroundColor: colors.inputBg }]} 
                onPress={() => Alert.alert("Dialer Mock", "Calling delivery partner Rohan Sharma...")}
              >
                <Ionicons name="call" size={18} color="#FF6B35" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.chatCircle, { backgroundColor: colors.inputBg }]}
                onPress={() => Alert.alert("Chat Box Mock", "Chat window initialized.")}
              >
                <Ionicons name="chatbubble-ellipses" size={18} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Checkpoint Stepper */}
        <Animated.View entering={FadeInUp.delay(400).springify()} style={[styles.stepperCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.stepperHeader, { color: colors.text }]}>Milestones Status</Text>

          <View style={styles.stepperContainer}>
            {milestones.map((m, index) => {
              const isPast = index < activeIndex;
              const isActive = index === activeIndex;
              const isFuture = index > activeIndex;

              return (
                <View key={m.key} style={styles.stepRow}>
                  {/* Left Column: Icon and Connective Bar */}
                  <View style={styles.stepLeftCol}>
                    <View 
                      style={[
                        styles.bulletCircle,
                        isPast && styles.bulletCirclePast,
                        isActive && styles.bulletCircleActive,
                        isFuture && [styles.bulletCircleFuture, { backgroundColor: colors.border, borderColor: colors.border }],
                      ]}
                    >
                      {isActive && (
                        <Animated.View style={[styles.pulseCircle, pulseStyle]} />
                      )}
                      <Ionicons 
                        name={m.icon as any} 
                        size={16} 
                        color={isActive || isPast ? "#FFFFFF" : colors.textSecondary} 
                      />
                    </View>
                    
                    {index < milestones.length - 1 && (
                      <View 
                        style={[
                          styles.connectiveLine,
                          index < activeIndex ? styles.connectiveLinePast : [styles.connectiveLineFuture, { backgroundColor: colors.border }],
                        ]}
                      />
                    )}
                  </View>

                  {/* Right Column: Descriptions */}
                  <View style={styles.stepRightCol}>
                    <Text 
                      style={[
                        styles.stepTitle,
                        isPast && [styles.stepTitlePast, { color: colors.textSecondary }],
                        isActive && [styles.stepTitleActive, { color: colors.text }],
                        isFuture && [styles.stepTitleFuture, { color: colors.textSecondary }],
                      ]}
                    >
                      {m.title}
                    </Text>
                    <Text style={[styles.stepDesc, { color: colors.textSecondary }]}>{m.desc}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </Animated.View>

        {/* developer Mock Fast-Forward and Cancellation Actions */}
        <Animated.View entering={FadeInUp.delay(500).springify()} style={styles.buttonContainer}>
          <TouchableOpacity style={styles.mockDeliverBtn} onPress={handleMockDeliver}>
            <Ionicons name="sparkles" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.mockDeliverText}>Deliver Instantly (Mock Test)</Text>
          </TouchableOpacity>

          {order.status !== "Delivered" && (
            <TouchableOpacity style={styles.cancelBtnOutline} onPress={handleCancelOrder}>
              <Text style={styles.cancelBtnText}>Cancel Order</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F6",
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F9FB",
  },
  headerTitleCol: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#181A20",
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#FF6B35",
    fontWeight: "800",
  },
  helpBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  helpText: {
    fontSize: 13,
    color: "#6C757D",
    fontWeight: "700",
  },

  /* ETA Card */
  timerCard: {
    backgroundColor: "#FF6B35",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  etaText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  timeCounter: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.5,
    marginTop: 2,
  },
  lottieMock: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 3,
    marginBottom: 12,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
  },
  orderSummaryText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
    opacity: 0.9,
  },

  /* Vector Map Card */
  mapCard: {
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
  mapTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#181A20",
    marginBottom: 12,
  },
  mapContainer: {
    height: 120,
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
  },
  mapGridLineH1: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  mapGridLineH2: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  mapGridLineV1: {
    position: "absolute",
    left: width * 0.3,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  mapGridLineV2: {
    position: "absolute",
    left: width * 0.6,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(0,0,0,0.04)",
  },
  routePathContainer: {
    position: "relative",
    height: 40,
    width: "100%",
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  routePathLine: {
    position: "absolute",
    left: 48,
    right: 48,
    height: 3,
    borderStyle: "dashed",
    borderRadius: 1,
    borderWidth: 1.5,
    borderColor: "#FFB800",
  },
  restaurantMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1E293B",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  riderMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
    position: "absolute",
    left: 40,
  },
  homeMarker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  mapFooter: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  riderLocationText: {
    fontSize: 11,
    color: "#6C757D",
    fontWeight: "700",
  },

  /* Live Radar Pulse Rings */
  riderRadarPulse: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "rgba(255, 107, 53, 0.4)",
    backgroundColor: "rgba(255, 107, 53, 0.15)",
    zIndex: 1,
  },
  restRadarPulse: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(30, 41, 59, 0.3)",
    backgroundColor: "rgba(30, 41, 59, 0.1)",
    zIndex: 1,
  },
  homeRadarPulse: {
    position: "absolute",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "rgba(16, 185, 129, 0.4)",
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    zIndex: 1,
  },

  /* Live Ticker Dashboard Columns */
  liveDashboardRow: {
    flexDirection: "row",
    backgroundColor: "#F8F9FA",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  liveStatCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  liveStatColBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#EEF2F6",
  },
  liveStatLabel: {
    fontSize: 8,
    color: "#8E8E93",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  liveStatValue: {
    fontSize: 11,
    color: "#181A20",
    fontWeight: "900",
    marginTop: 1,
  },

  /* Rider Card */
  riderCard: {
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
  riderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  riderImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  riderInfo: {
    flex: 1,
  },
  riderName: {
    fontSize: 14,
    fontWeight: "800",
    color: "#181A20",
  },
  riderRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 3,
  },
  riderRatingText: {
    fontSize: 10,
    color: "#6C757D",
    fontWeight: "600",
  },
  actionBtns: {
    flexDirection: "row",
    gap: 8,
  },
  phoneCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF5F1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE0D3",
  },
  chatCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFF5F1",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE0D3",
  },

  /* Stepper check points */
  stepperCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  stepperHeader: {
    fontSize: 14,
    fontWeight: "800",
    color: "#181A20",
    marginBottom: 18,
  },
  stepperContainer: {
    paddingLeft: 8,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepLeftCol: {
    alignItems: "center",
    marginRight: 16,
  },
  bulletCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
  },
  bulletCirclePast: {
    backgroundColor: "#10B981",
  },
  bulletCircleActive: {
    backgroundColor: "#FF6B35",
  },
  bulletCircleFuture: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1.5,
    borderColor: "#DEE2E6",
  },
  pulseCircle: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: "rgba(255, 107, 53, 0.4)",
    borderWidth: 3,
  },
  connectiveLine: {
    width: 3,
    position: "absolute",
    top: 28,
    bottom: -22,
    zIndex: 1,
  },
  connectiveLinePast: {
    backgroundColor: "#10B981",
  },
  connectiveLineFuture: {
    backgroundColor: "#DEE2E6",
  },
  stepRightCol: {
    flex: 1,
    justifyContent: "center",
  },
  stepTitle: {
    fontSize: 13,
    fontWeight: "800",
  },
  stepTitlePast: {
    color: "#10B981",
  },
  stepTitleActive: {
    color: "#FF6B35",
    fontSize: 14,
    fontWeight: "900",
  },
  stepTitleFuture: {
    color: "#6C757D",
  },
  stepDesc: {
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 2,
    fontWeight: "500",
  },

  /* Buttons */
  buttonContainer: {
    gap: 12,
  },
  mockDeliverBtn: {
    backgroundColor: "#10B981",
    borderRadius: 16,
    height: 52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  mockDeliverText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  cancelBtnOutline: {
    backgroundColor: "#FFFFFF",
    borderColor: "#EF4444",
    borderWidth: 1.5,
    borderRadius: 16,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtnText: {
    color: "#EF4444",
    fontSize: 14,
    fontWeight: "800",
  },

  /* Empty State */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#FFFFFF",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#181A20",
    marginTop: 18,
  },
  emptyText: {
    fontSize: 13,
    color: "#6C757D",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 18,
    marginBottom: 24,
  },
  backHomeBtn: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  backHomeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
