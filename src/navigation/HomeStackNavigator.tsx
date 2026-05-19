import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import RestaurantDetailScreen from "../screens/RestaurantDetailScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#E23E3E",
        },
        headerTintColor: "#fff",
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
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
      />
    </Stack.Navigator>
  );
}