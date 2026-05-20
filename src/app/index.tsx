import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "../navigation/RootNavigator";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";

const linking: any = {
  prefixes: ["foodapp://"],
  config: {
    screens: {
      HomeTab: {
        screens: {
          RestaurantDetail: "restaurant/:id",
        },
      },
    },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <NavigationIndependentTree>
              <NavigationContainer linking={linking}>
                <RootNavigator />
              </NavigationContainer>
            </NavigationIndependentTree>
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}