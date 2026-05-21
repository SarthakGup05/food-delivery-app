import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  FadeIn,
  FadeOut,
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence, 
  Easing 
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    title: "Savor the Flavors",
    description: "Explore top-rated local kitchens, cafes, and bakeries serving your favorite delicious cuisines fresh.",
    icon: "restaurant-outline",
    tagline: "CURATED FOR YOU",
  },
  {
    title: "Lightning Fast Delivery",
    description: "Track your hot meals in real-time with interactive, high-fidelity maps from the chef to your doorstep.",
    icon: "bicycle-outline",
    tagline: "REAL-TIME TRACKING",
  },
  {
    title: "Claim Orange Cashbacks",
    description: "Pay securely with simplified modern UPI, card methods, and grab exclusive orange discounts on checkouts.",
    icon: "wallet-outline",
    tagline: "SAFE & SEAMLESS",
  },
];

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  const insets = useSafeAreaInsets();
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Splash animation shared values
  const logoScale = useSharedValue(0.3);
  const logoPulse = useSharedValue(1);
  const loadingProgress = useSharedValue(0);

  useEffect(() => {
    if (showSplash) {
      // 1. Spring-in logo scale
      logoScale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.back(1.5)) });

      // 2. Continuous pulse animation
      logoPulse.value = withRepeat(
        withSequence(
          withTiming(1.08, { duration: 900, easing: Easing.ease }),
          withTiming(1.0, { duration: 900, easing: Easing.ease })
        ),
        -1,
        true
      );

      // 3. Loading bar progress
      loadingProgress.value = withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.ease) });

      // 4. Timer to switch to onboarding
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2600);

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Reanimated style for Splash logo
  const animatedSplashLogo = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: logoScale.value * logoPulse.value }
      ]
    };
  });

  // Reanimated style for loading fill bar
  const animatedLoadingBar = useAnimatedStyle(() => {
    return {
      width: `${loadingProgress.value * 100}%`
    };
  });

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigation.replace("Login");
    }
  };

  const handleSkip = () => {
    navigation.replace("Login");
  };

  // Render Splash Screen
  if (showSplash) {
    return (
      <Animated.View 
        style={styles.splashContainer}
        exiting={FadeOut.duration(400)}
      >
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        
        {/* Abstract Background Design Circles */}
        <View style={styles.splashBgCircle1} />
        <View style={styles.splashBgCircle2} />

        <View style={styles.splashCenter}>
          <Animated.View style={[styles.splashLogoWrapper, animatedSplashLogo]}>
            <Ionicons name="fast-food" size={54} color="#FF6B35" />
          </Animated.View>

          <Animated.Text 
            entering={FadeInDown.delay(400).duration(800).springify()}
            style={styles.splashBrandName}
          >
            Orange Bite
          </Animated.Text>
          
          <Animated.Text 
            entering={FadeInDown.delay(700).duration(600).springify()}
            style={styles.splashTagline}
          >
            Fresh • Fast • Irresistible
          </Animated.Text>
        </View>

        {/* Loading Indicator at Bottom */}
        <View style={styles.loadingBarContainer}>
          <View style={styles.loadingBarBg}>
            <Animated.View style={[styles.loadingBarFill, animatedLoadingBar]} />
          </View>
          <Text style={styles.loadingText}>Initializing Cravings...</Text>
        </View>
      </Animated.View>
    );
  }

  // Render Carousel Onboarding Slides
  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 16) }]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      
      {/* Top Header Row with Skip Option */}
      <View style={styles.headerRow}>
        <View style={styles.brandRow}>
          <View style={styles.brandMiniLogo}>
            <Ionicons name="fast-food" size={14} color="#FFFFFF" />
          </View>
          <Text style={styles.brandText}>Orange Bite</Text>
        </View>
        
        <TouchableOpacity activeOpacity={0.7} onPress={handleSkip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
          <Ionicons name="chevron-forward" size={14} color="#6C757D" />
        </TouchableOpacity>
      </View>

      {/* Main Slide Carousel Content Container */}
      <View style={styles.carouselContainer}>
        {SLIDES.map((slide, index) => {
          if (index !== currentSlide) return null;

          return (
            <Animated.View 
              key={index} 
              style={styles.slideWrapper}
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(300)}
            >
              {/* Illustrated Icon Badge */}
              <View style={styles.iconBadgeOuter}>
                <View style={styles.iconBadgeMiddle}>
                  <View style={styles.iconBadgeInner}>
                    <Ionicons name={slide.icon as any} size={84} color="#FF6B35" />
                  </View>
                </View>
              </View>

              {/* Text Description Box */}
              <View style={styles.textCard}>
                <Text style={styles.slideTagline}>{slide.tagline}</Text>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideDesc}>{slide.description}</Text>
              </View>
            </Animated.View>
          );
        })}
      </View>

      {/* Bottom Actions Footer Drawer */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) + 10 }]}>
        {/* Paging Indicators */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, index) => {
            const isActive = index === currentSlide;
            return (
              <View 
                key={index} 
                style={[
                  styles.dot, 
                  isActive && styles.activeDot
                ]} 
              />
            );
          })}
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.actionBtn} 
          activeOpacity={0.85}
          onPress={handleNext}
        >
          <Text style={styles.actionBtnText}>
            {currentSlide === SLIDES.length - 1 ? "Get Started" : "Continue"}
          </Text>
          <Ionicons 
            name={currentSlide === SLIDES.length - 1 ? "rocket" : "arrow-forward"} 
            size={16} 
            color="#FFFFFF" 
            style={{ marginLeft: 6 }} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Splash Screen Styles */
  splashContainer: {
    flex: 1,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  splashBgCircle1: {
    position: "absolute",
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: (width * 1.5) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    top: -width * 0.4,
    left: -width * 0.3,
  },
  splashBgCircle2: {
    position: "absolute",
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    bottom: -width * 0.2,
    right: -width * 0.2,
  },
  splashCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  splashLogoWrapper: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  splashBrandName: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: -1,
    marginTop: 20,
  },
  splashTagline: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
    fontWeight: "600",
    marginTop: 6,
    letterSpacing: 1,
  },
  loadingBarContainer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    width: "100%",
  },
  loadingBarBg: {
    width: width * 0.6,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 10,
  },
  loadingBarFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
  loadingText: {
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  /* Onboarding Styles */
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 50,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandMiniLogo: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#FF6B35",
    justifyContent: "center",
    alignItems: "center",
  },
  brandText: {
    fontSize: 14,
    fontWeight: "900",
    color: "#181A20",
    letterSpacing: -0.3,
  },
  skipBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    gap: 2,
  },
  skipText: {
    fontSize: 12,
    color: "#6C757D",
    fontWeight: "800",
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  slideWrapper: {
    width: "100%",
    alignItems: "center",
  },
  iconBadgeOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "#FFF5F1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  iconBadgeMiddle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#FFE0D3",
    justifyContent: "center",
    alignItems: "center",
  },
  iconBadgeInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  textCard: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  slideTagline: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FF6B35",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  slideTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "#181A20",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  slideDesc: {
    fontSize: 13,
    color: "#6C757D",
    textAlign: "center",
    lineHeight: 20,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    paddingTop: 16,
  },
  dotsRow: {
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#DEE2E6",
  },
  activeDot: {
    width: 18,
    backgroundColor: "#FF6B35",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B35",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});