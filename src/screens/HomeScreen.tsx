import { View, Text, TouchableOpacity } from "react-native";

const restaurants = [
  {
    id: 1,
    name: "Burger Palace",
    price: 250,
  },
  {
    id: 2,
    name: "Pizza Hub",
    price: 450,
  },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {restaurants.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={{
            backgroundColor: "#fff",
            padding: 20,
            marginBottom: 15,
            borderRadius: 10,
          }}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              id: item.id,
              name: item.name,
              price: item.price,
            })
          }
        >
          <Text style={{ fontSize: 20 }}>
            {item.name}
          </Text>

          <Text>₹{item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}