import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="pizza" size={50} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Log in to satisfy your cravings</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#888888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#AAAAAA"
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#888888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#AAAAAA"
            />
          </View>

          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton} activeOpacity={0.85} onPress={login}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 36,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#E23E3E",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#E23E3E",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6C757D",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#495057",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F5",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    height: 52,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#212529",
    fontSize: 15,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    color: "#E23E3E",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#E23E3E",
    borderRadius: 12,
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#E23E3E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});