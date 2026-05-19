import { useContext } from "react";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MyOrdersScreen from "../screens/MyOrdersScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HelpScreen from "../screens/HelpScreen";

import CustomDrawerContent from "../components/CustomDrawerContent";

import { AuthContext } from "../context/AuthContext";

const Drawer = createDrawerNavigator();

export default function ProfileDrawerNavigator() {
  const { logout } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      drawerContent={(props: any) => (
        <CustomDrawerContent {...props} />
      )}
    >
      <Drawer.Screen
        name="My Orders"
        component={MyOrdersScreen}
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
