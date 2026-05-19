import { useContext } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";

import HomeStackNavigator from "./HomeStackNavigator";

import SearchScreen from "../screens/SearchScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ProfileDrawerNavigator from "./ProfileDrawerNavigator";

import { CartContext } from "../context/CartContext";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { cart } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

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
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? "Home";

          return {
            title: "Home",

            tabBarStyle:
              routeName === "RestaurantDetail" ||
              routeName === "Cart"
                ? { display: "none" }
                : undefined,
          };
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
          tabBarBadge:
            cart.length > 0 ? cart.length : null,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileDrawerNavigator}
      />
    </Tab.Navigator>
  );
}