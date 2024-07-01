import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const EventsList = ({ events, navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.eventItem}
      onPress={() => navigation.navigate('EventDetailsScreen', { event: item })}
    >
      <Text style={styles.eventName}>{item.name}</Text>
      <Text>{item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  eventItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EventsList;

