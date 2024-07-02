import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const EventCalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/v1/events`);
      const eventsData = response.data.reduce((acc, event) => {
        const date = event.date.split('T')[0]; // Extract the date part only
        acc[date] = {
          marked: true,
          dotColor: 'blue',
          activeOpacity: 0,
        };
        return acc;
      }, {});
      setEvents(eventsData);
      setEventList(response.data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch events');
      setLoading(false);
    }
  };

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const selectedEvents = eventList.filter((event) => event.date.split('T')[0] === selectedDate);
    if (selectedEvents.length > 0) {
      const eventDetails = selectedEvents.map(event => `${event.name}\n\n${event.details}\nLocation: ${event.location}\nContact: ${event.contact}`).join('\n\n');
      Alert.alert('Events on ' + selectedDate, eventDetails);
    } else {
      Alert.alert('No events', 'There are no events on this day.');
    }
  };

  if (loading) {
    return (
      <LinearGradient
        colors={['#000000', '#434343']}
        style={styles.gradient}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#90A1A4', '#95A6A9', '#EFF6F7']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Event Calendar</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            markedDates={events}
            onDayPress={handleDayPress}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Times New Roman',
  },
  calendarContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default EventCalendarScreen;
