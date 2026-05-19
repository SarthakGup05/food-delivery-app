import { useContext } from "react";

import {
  View,
  Text,
  Button,
} from "react-native";

import { CartContext } from "../context/CartContext";

export default function RestaurantDetailScreen({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) {
  const { addToCart } = useContext(CartContext);

  const {
    id,
    name = "Restaurant",
    price = 0,
  } = route.params || {};

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 28 }}>
        {name}
      </Text>

      <Text style={{ fontSize: 22 }}>
        ₹{price}
      </Text>

      <Button
        title="Add To Cart"
        onPress={() => {
          addToCart({ name, price });

          navigation.navigate("Cart");
        }}
      />

      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}