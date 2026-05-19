import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TabNavigator() {
  return (
    <View style={styles.container}>
      <Text>TabNavigator</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
