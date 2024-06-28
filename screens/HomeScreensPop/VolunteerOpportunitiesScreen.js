import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VolunteerOpportunitiesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Volunteer Opportunities</Text>
      <Text style={styles.text}>Browse and sign up for volunteer opportunities.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default VolunteerOpportunitiesScreen;
