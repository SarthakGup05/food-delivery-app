import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";

export default function RootNavigator() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated
    ? <TabNavigator />
    : <AuthNavigator />;
}