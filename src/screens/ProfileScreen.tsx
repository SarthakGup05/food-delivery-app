import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useAppTheme } from "../context/ThemeContext";

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const { logout } = useContext(AuthContext);
  const { activeOrders } = useContext(CartContext);
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();

  const options = [
    { icon: "receipt-outline", title: "My Past Orders", subtitle: "View complete billing history", route: "Orders" },
    { icon: "location-outline", title: "Manage Addresses", subtitle: "Saved home and work locations", route: "Home" },
    { icon: "card-outline", title: "Payment Methods", subtitle: "Manage credit card, UPI details" },
    { icon: "notifications-outline", title: "Notifications", subtitle: "Promotions, alerts, offers" },
    { icon: "shield-checkmark-outline", title: "Security & Privacy", subtitle: "Change password, permissions" },
  ];

  const currentActive = activeOrders[0]; // Get most recent active order

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]} 
      contentContainerStyle={{ paddingBottom: 100 }} 
      showsVerticalScrollIndicator={false}
    >
      {/* Header Banner */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 20 }]}>
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.avatarBorder}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" }} 
            style={styles.avatar} 
          />
        </Animated.View>
        <Animated.Text entering={FadeInDown.delay(150).springify()} style={styles.name}>Sarthak Gupta</Animated.Text>
        <Animated.Text entering={FadeInDown.delay(200).springify()} style={styles.email}>sarthak.gupta@example.com</Animated.Text>
      </View>

      {/* Floating Active Order Banner (If available) */}
      {currentActive && (
        <Animated.View entering={FadeInDown.delay(250).springify()} style={[styles.activeBanner, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.activeBannerLeft}>
            <View style={styles.pulsingDotWrapper}>
              <View style={styles.pulsingDot} />
            </View>
            <View style={{ marginLeft: 10, flex: 1 }}>
              <Text style={[styles.activeBannerTitle, { color: colors.text }]}>Active Order: {currentActive.status}</Text>
              <Text style={[styles.activeBannerText, { color: colors.textSecondary }]} numberOfLines={1}>{currentActive.restaurant} • {currentActive.items}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.trackBtn}
            onPress={() => navigation.navigate("HomeTab", { screen: "ActiveOrder", params: { orderId: currentActive.id } })}
          >
            <Text style={styles.trackBtnText}>Track</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Option List */}
      <View style={[styles.optionsCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {options.map((opt, idx) => (
          <Animated.View key={idx} entering={FadeInUp.delay(idx * 80).springify()}>
            <TouchableOpacity 
              style={[styles.optionRow, { borderBottomColor: colors.border }, idx === options.length - 1 && styles.lastOptionRow]}
              onPress={() => {
                if (opt.route) {
                  navigation.navigate(opt.route);
                } else {
                  alert(`${opt.title} coming soon!`);
                }
              }}
            >
              <View style={[styles.iconCircle, { backgroundColor: colors.inputBg }]}>
                <Ionicons name={opt.icon as any} size={20} color="#FF6B35" />
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={[styles.optionTitle, { color: colors.text }]}>{opt.title}</Text>
                <Text style={[styles.optionSubtitle, { color: colors.textSecondary }]}>{opt.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Logout Button */}
      <Animated.View entering={FadeInUp.delay(options.length * 80).springify()}>
        <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={logout}>
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </Animated.View>

      <Text style={[styles.versionText, { color: colors.textSecondary }]}>Version 1.2.0 (Premium Orange Edition)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
  },
  header: {
    backgroundColor: "#FF6B35",
    paddingTop: 20,
    paddingBottom: 35,
    alignItems: "center",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  avatarBorder: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 22,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
  },
  
  /* Floating Active Order Banner */
  activeBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF6B35",
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 20,
    marginTop: -20,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5,
  },
  activeBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  pulsingDotWrapper: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  pulsingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
  },
  activeBannerTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#FFFFFF",
  },
  activeBannerText: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 2,
    fontWeight: "600",
  },
  trackBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  trackBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },

  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F8F9FA",
  },
  lastOptionRow: {
    borderBottomWidth: 0,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF5F1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#181A20",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 11,
    color: "#6C757D",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    borderRadius: 16,
    height: 52,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  versionText: {
    textAlign: "center",
    fontSize: 11,
    color: "#ADB5BD",
    marginVertical: 20,
    fontWeight: "600",
  },
});
