import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import {
  View,
  Text,
  Image,
} from "react-native";

export default function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          padding: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri: "https://i.pravatar.cc/150",
          }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            marginBottom: 10,
          }}
        />

        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Sarthak Gupta
        </Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
