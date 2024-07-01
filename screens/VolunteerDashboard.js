import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook from context
import EventItem from './EventItem'; // Import EventItem component

const VolunteerDashboard = ({ navigation }) => {
  const { isDarkMode } = useTheme(); // Use the isDarkMode state from ThemeContext
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
    <ImageBackground
      source={require('../assets/background2.jpg')}
      style={styles.backgroundImage}
    >
      <View style={isDarkMode ? styles.containerDark : styles.container}>
        <Text style={isDarkMode ? styles.titleDark : styles.title}>Volunteer Dashboard</Text>
        
        {/* Event List */}
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventItem event={item} />}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  titleDark: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#bbb', // Adjusted color for dark mode
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default VolunteerDashboard;

