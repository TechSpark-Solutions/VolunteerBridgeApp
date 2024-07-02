import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import EventItem from './EventItem'; // Assume EventItem is a separate component

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the database or API
    // For demonstration, we use static data
    const fetchedEvents = [
      {
        id: '1',
        name: 'Community Cleanup',
        date: '2023-08-12',
        location: 'Central Park',
        time: '10:00 AM',
        skills: ['Cleaning', 'Organization'],
        details: 'Join us for a community cleanup event at Central Park.',
        contact: 'email@example.com',
        locationLatitude: 40.785091,
        locationLongitude: -73.968285,
      },
      // Add more event objects here
    ];
    setEvents(fetchedEvents);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event List</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventItem event={item} />}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default EventList;


