import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GlobalSettings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Global Settings</Text>
      <Text>This section is for handling settings that relate to the app</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default GlobalSettings;
