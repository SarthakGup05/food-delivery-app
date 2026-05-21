import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import CartScreen from "../screens/CartScreen";
import ActiveOrderScreen from "../screens/ActiveOrderScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 300,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({
          title: (route.params as any)?.name ?? "Restaurant",
          headerBackTitle: "Back",
        })}
      />

      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Checkout" }}
      />

      <Stack.Screen
        name="ActiveOrder"
        component={ActiveOrderScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "My Profile" }}
      />
    </Stack.Navigator>
  );
}