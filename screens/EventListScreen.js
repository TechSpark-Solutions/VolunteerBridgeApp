import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import EventItem from './EventItem'; // Assume EventItem is a separate component
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  async function fetchEvents(){
    // Fetch events from the database or API
    // For demonstration, we use static data
    const API_URL = process.env.EXPO_PUBLIC_API_URL

    const fetchedEvents = await axios.get(`${API_URL}/api/v1/events`)
    setEvents(fetchedEvents.data);
  }

  useEffect(() => {
    fetchEvents()
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


