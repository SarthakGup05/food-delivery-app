import { useContext } from "react";
import { View, Button, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const { login } = useContext(AuthContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 26 }}>
        Login Screen
      </Text>

      <Button
        title="Login"
        onPress={login}
      />
    </View>
  );
}