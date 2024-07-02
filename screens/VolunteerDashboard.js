import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const VolunteerDashboard = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [events, setEvents] = useState([]);
  const [signedUpEvents, setSignedUpEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const API_URL = process.env.EXPO_PUBLIC_API_URL;
      const fetchedEvents = await axios.get(`${API_URL}/api/v1/events`);
      setEvents(fetchedEvents.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      Alert.alert('Error', 'Failed to fetch events. Please try again later.');
    }
  }

  const handleSignUp = (eventId) => {
    if (signedUpEvents.includes(eventId)) {
      // If already signed up, remove from signedUpEvents
      setSignedUpEvents(signedUpEvents.filter(id => id !== eventId));
    } else {
      // If not signed up, add to signedUpEvents
      setSignedUpEvents([...signedUpEvents, eventId]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDate}>Date: {item.date}</Text>
      <Text style={styles.eventLocation}>Location: {item.location}</Text>
      <Text style={styles.eventSkills}>Skills Required: {item.skills.join(', ')}</Text>
      <Text style={styles.eventDetails}>Details: {item.details}</Text>
      <TouchableOpacity onPress={() => handleSignUp(item.id)}>
        <Text style={styles.signUpButton}>
          {signedUpEvents.includes(item.id) ? 'Unsign Up' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../assets/background2.jpg')}
      style={styles.backgroundImage}
    >
      <View style={isDarkMode ? styles.containerDark : styles.container}>
        <Text style={isDarkMode ? styles.titleDark : styles.title}>Sign up — Volunteer!</Text>
        
        {/* Event List */}
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />

        {/* Signed Up Events Display */}
        {signedUpEvents.length > 0 && (
          <View style={styles.signedUpEventsContainer}>
            <Text style={styles.signedUpEventsTitle}>You are signed up for:</Text>
            {signedUpEvents.map(eventId => {
              const event = events.find(evt => evt.id === eventId);
              return (
                <Text key={eventId} style={styles.signedUpEvent}>{event.name} on {event.date}</Text>
              );
            })}
          </View>
        )}
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
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  eventItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDate: {
    color: 'gray',
  },
  eventLocation: {
    marginTop: 5,
  },
  eventSkills: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  eventDetails: {
    marginTop: 5,
  },
  signUpButton: {
    color: '#1a759f',
    fontWeight: 'bold',
    marginTop: 10,
  },
  signedUpEventsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  signedUpEventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signedUpEvent: {
    fontSize: 16,
  },
});

export default VolunteerDashboard;
