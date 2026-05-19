import { useContext } from "react";
import React from "react";
import { View, ActivityIndicator } from "react-native";

import { AuthContext } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

export default function RootNavigator() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#E23E3E" />
      </View>
    );
  }

  return isAuthenticated
    ? <TabNavigator />
    : <AuthNavigator />;
}