import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const NewsFeedScreen = () => {
  const [events, setEvents] = useState([]);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const API_URL = process.env.EXPO_PUBLIC_API_URL;
      const response = await axios.get(`${API_URL}/api/v1/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      Alert.alert('Error', 'Failed to fetch events. Please try again later.');
    }
  };

  const openEventPopup = (event) => {
    setSelectedEvent(event);
    setShowEventPopup(true);
  };

  const closeEventPopup = () => {
    setShowEventPopup(false);
    setSelectedEvent(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News & Updates</Text>
      <Text style={styles.text}>Organization news and updates will appear here.</Text>

      {/* Event Popup */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showEventPopup}
        onRequestClose={closeEventPopup}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {selectedEvent && (
              <>
                <Text style={styles.eventName}>{selectedEvent.name}</Text>
                <Text style={styles.eventDate}>Date: {selectedEvent.date}</Text>
                <Text style={styles.eventLocation}>Location: {selectedEvent.location}</Text>
                <Text style={styles.eventDetails}>Details: {selectedEvent.details}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeEventPopup}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Display Events */}
      <View style={styles.eventsContainer}>
        {events.map(event => (
          <TouchableOpacity
            key={event.id}
            style={styles.eventItem}
            onPress={() => openEventPopup(event)}
          >
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDate}>Date: {event.date}</Text>
            <Text style={styles.eventLocation}>Location: {event.location}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: 20,
  },
  eventsContainer: {
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    width: '80%',
  },
  eventDetails: {
    marginTop: 5,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#1a759f',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NewsFeedScreen;
