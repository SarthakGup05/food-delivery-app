import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      {/* Background Accent Circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />

      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="fast-food" size={100} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>Craving Something Delicious?</Text>
        <Text style={styles.subtitle}>
          Get your favorite meals delivered fresh, hot, and lightning-fast right to your doorstep.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.85}
          onPress={() => navigation.replace("Login")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Ionicons name="arrow-forward" size={20} color="#E23E3E" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E23E3E",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  circle1: {
    position: "absolute",
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: (width * 1.2) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    top: -width * 0.3,
    left: -width * 0.2,
  },
  circle2: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    bottom: -width * 0.2,
    right: -width * 0.2,
  },
  content: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 50,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E23E3E",
  },
});