import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { logout } = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const options = [
    { icon: "person-outline", title: "Edit Profile", subtitle: "Update email, phone, name" },
    { icon: "location-outline", title: "Manage Addresses", subtitle: "Saved home and work offices" },
    { icon: "card-outline", title: "Payment Methods", subtitle: "Manage credit card, UPI details" },
    { icon: "notifications-outline", title: "Notifications", subtitle: "Promotions, alerts, offers" },
    { icon: "shield-checkmark-outline", title: "Security & Privacy", subtitle: "Change password, permissions" },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 20 }]}>
        <View style={styles.avatarBorder}>
          <Image source={{ uri: "https://i.pravatar.cc/150" }} style={styles.avatar} />
        </View>
        <Text style={styles.name}>Sarthak Gupta</Text>
        <Text style={styles.email}>sarthak.gupta@example.com</Text>
      </View>

      {/* Option List */}
      <View style={styles.optionsCard}>
        {options.map((opt, idx) => (
          <TouchableOpacity key={idx} style={[styles.optionRow, idx === options.length - 1 && styles.lastOptionRow]}>
            <View style={styles.iconCircle}>
              <Ionicons name={opt.icon as any} size={20} color="#E23E3E" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>{opt.title}</Text>
              <Text style={styles.optionSubtitle}>{opt.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6C757D" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8} onPress={logout}>
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Version 1.0.0 (Expo SDK 54)</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#E23E3E",
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
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
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F5",
  },
  lastOptionRow: {
    borderBottomWidth: 0,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF8F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 12,
    color: "#6C757D",
  },
  logoutButton: {
    backgroundColor: "#E23E3E",
    borderRadius: 16,
    height: 52,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E23E3E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#ADB5BD",
    marginVertical: 20,
  },
});
