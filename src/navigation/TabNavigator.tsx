import React, { useContext, useEffect } from "react";
import { Pressable } from "react-native";

import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

import HomeStackNavigator from "./HomeStackNavigator";

import SearchScreen from "../screens/SearchScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileDrawerNavigator from "./ProfileDrawerNavigator";

import { CartContext } from "../context/CartContext";
import { useAppTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();

// Spring Animated Bottom Tab Button Component
function AnimatedTabButton({ children, onPress, accessibilityState }: any) {
  const focused = accessibilityState?.selected;
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    // Elegant spring animation on transition
    scale.value = withSpring(focused ? 1.15 : 1, { damping: 10, stiffness: 140 });
    translateY.value = withSpring(focused ? -4 : 0, { damping: 10, stiffness: 140 });
    rotate.value = withSpring(focused ? 1 : 0, { damping: 8, stiffness: 120 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
        { rotate: `${rotate.value * 8}deg` }
      ],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Animated.View style={animatedStyle}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

// Custom Animated Tab Bar wrapping the standard BottomTabBar
function AnimatedTabBar(props: any) {
  const { tabBarTranslateY } = useAppTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: tabBarTranslateY.value }],
    };
  });

  return (
    <Animated.View style={[{ position: "absolute", bottom: 0, left: 0, right: 0 }, animatedStyle]}>
      <BottomTabBar {...props} />
    </Animated.View>
  );
}

export default function TabNavigator() {
  const { cart } = useContext(CartContext);
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();

  const totalItems = cart.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);

  return (
    <Tab.Navigator
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

        return {
          headerShown: false,
          tabBarActiveTintColor: "#FF6B35",
          tabBarInactiveTintColor: isDark ? "#8E8EAE" : "#8E8E93",
          tabBarStyle:
            routeName === "RestaurantDetail" || routeName === "Cart"
              ? { display: "none" }
              : {
                  position: "absolute",
                  bottom: Math.max(insets.bottom, 12),
                  left: 45,
                  right: 45,
                  borderRadius: 32,
                  height: 60,
                  paddingBottom: 8,
                  paddingTop: 8,
                  backgroundColor: isDark ? "rgba(24, 26, 32, 0.72)" : "rgba(255, 255, 255, 0.72)",
                  borderWidth: 1,
                  borderColor: isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.05)",
                  shadowColor: isDark ? "#000000" : "#000000",
                  shadowOffset: { width: 0, height: 10 },
                  shadowOpacity: isDark ? 0.35 : 0.06,
                  shadowRadius: 20,
                  elevation: 8,
                },

          tabBarButton: (props) => <AnimatedTabButton {...props} />,

          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "HomeTab") {
              iconName = "home";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Orders") {
              iconName = "receipt";
            } else if (route.name === "Profile") {
              iconName = "person";
            }

            return (
              <Ionicons
                name={iconName as any}
                size={size}
                color={color}
              />
            );
          },
        };
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: "Home",
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />

      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarBadge: totalItems > 0 ? totalItems : null,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileDrawerNavigator}
      />
    </Tab.Navigator>
  );
}