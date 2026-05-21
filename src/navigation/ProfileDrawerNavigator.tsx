import { useContext } from "react";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProfileScreen from "../screens/ProfileScreen";
import OrdersScreen from "../screens/OrdersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HelpScreen from "../screens/HelpScreen";

import CustomDrawerContent from "../components/CustomDrawerContent";

import { AuthContext } from "../context/AuthContext";
import { useAppTheme } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
  const { logout } = useContext(AuthContext);
  const { colors } = useAppTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },
        drawerActiveTintColor: "#FF6B35",
        drawerInactiveTintColor: colors.textSecondary,
        drawerLabelStyle: {
          fontWeight: "bold",
        },
      }}
      drawerContent={(props: any) => (
        <CustomDrawerContent {...props} />
      )}
    >
      <Drawer.Screen
        name="My Profile"
        component={ProfileScreen}
      />

      <Drawer.Screen
        name="Active & Past Orders"
        component={OrdersScreen}
      />

      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
      />

      <Drawer.Screen
        name="Help"
        component={HelpScreen}
      />

      <Drawer.Screen
        name="Logout"
        component={HelpScreen}
        listeners={{
          focus: () => {
            logout();
          },
        }}
      />
    </Drawer.Navigator>
  );
}
