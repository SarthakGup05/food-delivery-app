import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileDrawerNavigator() {
  return (
    <View style={styles.container}>
      <Text>ProfileDrawerNavigator</Text>
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
