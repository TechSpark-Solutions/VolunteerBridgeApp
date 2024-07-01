// Each event is rendered using the EventItem component. EventItem Component: Receives an event object as a prop and displays its details. Styled to match the overall app theme.

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventItem = ({ event }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{event.name}</Text>
      <Text style={styles.details}>Date: {event.date}</Text>
      <Text style={styles.details}>Location: {event.location}</Text>
      <Text style={styles.details}>Time: {event.time}</Text>
      <Text style={styles.details}>Skills Needed: {event.skills.join(', ')}</Text>
      <Text style={styles.details}>Contact: {event.contact}</Text>
      <Text style={styles.details}>Details: {event.details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: '#333',
  },
});

export default EventItem;
