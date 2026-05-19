import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import RootNavigator from "../navigation/RootNavigator";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

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
    <AuthProvider>
      <CartProvider>
        <NavigationIndependentTree>
          <NavigationContainer linking={linking}>
            <RootNavigator />
          </NavigationContainer>
        </NavigationIndependentTree>
      </CartProvider>
    </AuthProvider>
  );
}