import { useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeStackNavigator from "./HomeStackNavigator";

import SearchScreen from "../screens/SearchScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileDrawerNavigator from "./ProfileDrawerNavigator";

import { CartContext } from "../context/CartContext";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { cart } = useContext(CartContext);
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? route.name;

        return {
          headerShown: false,
          tabBarActiveTintColor: "#E23E3E",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle:
            routeName === "RestaurantDetail" || routeName === "Cart"
              ? { display: "none" }
              : {
                  borderTopWidth: 1,
                  borderTopColor: "#E9ECEF",
                  backgroundColor: "#FFFFFF",
                  height: 60 + insets.bottom,
                  paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                  paddingTop: 8,
                },

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
          tabBarBadge: cart.length > 0 ? cart.length : null,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileDrawerNavigator}
      />
    </Tab.Navigator>
  );
}