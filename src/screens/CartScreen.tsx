import { useContext } from "react";

import {
  View,
  Text,
  Button,
} from "react-native";

import { CartContext } from "../context/CartContext";

export default function CartScreen({ navigation }: { navigation: any }) {
  const { cart } = useContext(CartContext);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 30 }}>
        Cart
      </Text>

      {cart.map((item: any, index: number) => (
        <View
          key={index}
          style={{
            marginVertical: 10,
          }}
        >
          <Text>
            {item.name} - ₹{item.price}
          </Text>
        </View>
      ))}

      <Button
        title="Back To Home"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        }
      />
    </View>
  );
}