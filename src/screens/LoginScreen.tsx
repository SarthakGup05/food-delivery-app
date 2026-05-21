import React, { useContext, useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StatusBar,
  Dimensions
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import Animated, { 
  FadeInDown, 
  FadeOutUp, 
  Layout, 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const { login } = useContext(AuthContext);
  const { colors, isDark } = useAppTheme();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  const [securePassword, setSecurePassword] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Tab Indicator Animation value
  const tabOffset = useSharedValue(0);

  const toggleMode = (targetMode: "login" | "signup") => {
    setMode(targetMode);
    tabOffset.value = withSpring(targetMode === "login" ? 0 : 1, { damping: 15 });
  };

  const animatedTabIndicator = useAnimatedStyle(() => {
    // 0 is left, 1 is right. Width of slider is (width - 48 - 8) / 2 approx
    const sliderWidth = (width - 48 - 8) / 2;
    return {
      transform: [
        { translateX: tabOffset.value * sliderWidth }
      ]
    };
  });

  const handleAuthAction = () => {
    if (mode === "signup" && !agreeTerms) {
      alert("Please agree to our privacy policies and terms of service to create an account.");
      return;
    }
    
    // Auto-authenticate with context mock
    login();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />
      
      <ScrollView 
        contentContainerStyle={[styles.scrollContainer, { paddingTop: Math.max(insets.top, 24) }]} 
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header Icon Block */}
        <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.header}>
          <View style={[styles.logoOuterCircle, { backgroundColor: isDark ? "#242630" : "#FFF5F1", borderColor: colors.border }]}>
            <View style={styles.logoInnerCircle}>
              <Ionicons name="fast-food" size={38} color="#FFFFFF" />
            </View>
          </View>
          <Text style={[styles.title, { color: colors.text }]}>
            {mode === "login" ? "Welcome Back!" : "Join Orange Bite"}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {mode === "login" ? "Log in to satisfy your tasty cravings" : "Create an account for lightning-fast deliveries"}
          </Text>
        </Animated.View>

        {/* Sliding Segmented Form Toggle */}
        <Animated.View entering={FadeInDown.delay(200).springify()} style={[styles.tabContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Animated.View style={[styles.tabIndicator, animatedTabIndicator, { backgroundColor: isDark ? "#1C1E26" : "#FF6B35" }]} />
          
          <TouchableOpacity 
            style={styles.tabBtn} 
            activeOpacity={0.8}
            onPress={() => toggleMode("login")}
          >
            <Text style={[styles.tabBtnText, { color: colors.textSecondary }, mode === "login" && { color: "#FFFFFF", fontWeight: "900" }]}>
              Sign In
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.tabBtn} 
            activeOpacity={0.8}
            onPress={() => toggleMode("signup")}
          >
            <Text style={[styles.tabBtnText, { color: colors.textSecondary }, mode === "signup" && { color: "#FFFFFF", fontWeight: "900" }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Unified Input Card */}
        <Animated.View entering={FadeInDown.delay(300).springify()} style={[styles.formCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <ScrollView scrollEnabled={false}>
            {/* Dynamic Sign-Up Fields (Name and Phone) */}
            {mode === "signup" && (
              <Animated.View 
                entering={FadeInDown.duration(400)}
                exiting={FadeOutUp.duration(300)}
                layout={Layout.springify()}
              >
                <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                  <Ionicons name="person-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={isDark ? "#8E8EAE" : "#ADB5BD"}
                  />
                </View>

                <Text style={[styles.label, { color: colors.text }]}>Phone Number</Text>
                <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
                  <Ionicons name="call-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Enter 10-digit number"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="number-pad"
                    placeholderTextColor={isDark ? "#8E8EAE" : "#ADB5BD"}
                  />
                </View>
              </Animated.View>
            )}

            {/* Common Fields: Email */}
            <Text style={[styles.label, { color: colors.text }]}>Email Address</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
              <Ionicons name="mail-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your email ID"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={isDark ? "#8E8EAE" : "#ADB5BD"}
              />
            </View>

            {/* Common Fields: Password */}
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
              <Ionicons name="lock-closed-outline" size={18} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Enter your account password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={securePassword}
                autoCapitalize="none"
                placeholderTextColor={isDark ? "#8E8EAE" : "#ADB5BD"}
              />
              <TouchableOpacity onPress={() => setSecurePassword(!securePassword)} style={styles.eyeToggle}>
                <Ionicons 
                  name={securePassword ? "eye-off-outline" : "eye-outline"} 
                  size={18} 
                  color={colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>

            {/* Forgot Button (Only in login mode) */}
            {mode === "login" ? (
              <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            ) : (
              /* Privacy Terms (Only in signup mode) */
              <TouchableOpacity 
                style={styles.termsRow} 
                activeOpacity={0.8}
                onPress={() => setAgreeTerms(!agreeTerms)}
              >
                <View style={[styles.checkbox, { borderColor: colors.border }, agreeTerms && styles.checkboxActive]}>
                  {agreeTerms && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                </View>
                <Text style={[styles.termsText, { color: colors.textSecondary }]}>
                  I agree to the <Text style={[styles.termsBold, { color: colors.text }]}>Terms of Service</Text> and <Text style={[styles.termsBold, { color: colors.text }]}>Privacy Policy</Text>.
                </Text>
              </TouchableOpacity>
            )}

            {/* Primary Action Button */}
            <TouchableOpacity 
              style={styles.actionButton} 
              activeOpacity={0.85} 
              onPress={handleAuthAction}
            >
              <Text style={styles.actionButtonText}>
                {mode === "login" ? "Sign In" : "Create Account"}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
        
        {/* Mock accounts hints */}
        <Animated.View entering={FadeInDown.delay(400).springify()} style={[styles.hintCard, { backgroundColor: colors.inputBg, borderColor: colors.border }]}>
          <Ionicons name="information-circle-outline" size={16} color="#FF6B35" />
          <Text style={[styles.hintText, { color: colors.textSecondary }]}>
            For fast testing, you can tap Sign In/Up with any credentials to instantly authenticate.
          </Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoOuterCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFF5F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FFE0D3",
  },
  logoInnerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#181A20",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    color: "#6C757D",
    textAlign: "center",
    fontWeight: "500",
  },

  /* Segmented Sliding Tab Picker */
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    position: "relative",
    height: 48,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  tabIndicator: {
    position: "absolute",
    height: 40,
    // (width - 48 [padding] - 8 [slider margins]) / 2
    width: "48.5%",
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    left: 4,
  },
  tabBtn: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  tabBtnText: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "800",
  },
  tabBtnTextActive: {
    color: "#FFFFFF",
  },

  /* Input Form Box */
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#181A20",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 18,
    height: 52,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#181A20",
    fontSize: 13,
    fontWeight: "600",
  },
  eyeToggle: {
    padding: 6,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 20,
    paddingVertical: 4,
  },
  forgotText: {
    fontSize: 12,
    color: "#FF6B35",
    fontWeight: "800",
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#DEE2E6",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  checkboxActive: {
    backgroundColor: "#FF6B35",
    borderColor: "#FF6B35",
  },
  termsText: {
    flex: 1,
    fontSize: 10,
    color: "#6C757D",
    lineHeight: 14,
    fontWeight: "500",
  },
  termsBold: {
    color: "#FF6B35",
    fontWeight: "700",
  },
  actionButton: {
    backgroundColor: "#FF6B35",
    borderRadius: 16,
    height: 52,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 6,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  /* Hints */
  hintCard: {
    flexDirection: "row",
    backgroundColor: "#FFF5F1",
    borderColor: "#FFE0D3",
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginTop: 20,
    alignItems: "center",
    gap: 8,
  },
  hintText: {
    flex: 1,
    fontSize: 10,
    color: "#6C757D",
    lineHeight: 14,
    fontWeight: "600",
  },
});