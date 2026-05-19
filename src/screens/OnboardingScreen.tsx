import { View, Text, Button } from "react-native";

export default function OnboardingScreen({ navigation }: { navigation: any }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 28 }}>
        Food Delivery App
      </Text>

      <Button
        title="Get Started"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
}