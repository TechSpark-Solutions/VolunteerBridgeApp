import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';

const EventCalendarScreen = () => {
  const [events, setEvents] = useState({});
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://volunteerbridge-authapi.onrender.com/api/v1/events');
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Event Calendar</Text>
      <View style={styles.calendarContainer}>
        <Calendar
          markedDates={events}
          onDayPress={handleDayPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    textAlign: 'center',
  },
  calendarContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

export default EventCalendarScreen;
