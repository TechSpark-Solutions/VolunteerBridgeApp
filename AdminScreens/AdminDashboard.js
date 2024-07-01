import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Modal, TextInput, ImageBackground } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


const AdminDashboard = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [events, setEvents] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventContact, setNewEventContact] = useState('');
  const [newEventDetails, setNewEventDetails] = useState('');
  const [skills, setSkills] = useState({
    Cleaning: false,
    Organization: false,
    "Heavy Lifting": false,
    Spanish: false,
    Cooking: false,
    Gardening: false,
    "Environmental Awareness": false
  });
  const [newEventLocation, setNewEventLocation] = useState('');
  // const [newEventLocation, setNewEventLocation] = useState('');

  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  async function fetchEvents() {
    // Fetch events from the database or API
    

    const fetchedEvents = await axios.get(`http://10.0.0.236:3000/api/v1/events`);
    setEvents(fetchedEvents.data);
  }

  useEffect(() => {
    fetchEvents()
  }, []);

  const handleCreateEvent = async () => {
    const selectedSkills = Object.keys(skills).filter(skill => skills[skill]);
    const newEvent = {
      name: newEventName,
      date: newEventDate,
      location: newEventLocation,
      skills: selectedSkills,
      detail: newEventDetails,
      contact: newEventContact,
    };
    
    const createdEvent = await axios.post(`http://10.0.0.236:3000/api/v1/events`, newEvent);
    setEvents([...events, createdEvent.data]);
    setIsModalVisible(false);
  };

  const handleUpdateEvent = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
  };

  const renderItem = ({ item }) => (
    <View style={isDarkMode ? styles.eventItemDark : styles.eventItem}>
      <Text style={isDarkMode ? styles.eventNameDark : styles.eventName}>{item.name}</Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>{item.date}</Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>{item.location}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditEvent', {
          eventId: item.id,
          eventDetails: item,
          updateEvent: handleUpdateEvent,
        })}
      />
    </View>
  );

  const toggleSkill = (skill) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [skill]: !prevSkills[skill]
    }));
  };

  const [height, setHeight] = useState(200);

  return (
    <ImageBackground source={require('../assets/background3.jpg')} style={styles.backgroundImage}>
      <View style={isDarkMode ? styles.containerDark : styles.container}>
        <Text style={isDarkMode ? styles.titleDark : styles.title}>Admin Dashboard</Text>
        <Button
          title="Create Event"
          onPress={() => setIsModalVisible(true)}
        />
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                <Text style={styles.modalTitle}>Create New Event</Text>
                <Text style={styles.label}>Event Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Community Cleanup"
                  placeholderTextColor='grey'
                  value={newEventName}
                  onChangeText={text => setNewEventName(text)}
                />
                <Text style={styles.label}>Event Date</Text>
                <TextInput
                  style={styles.input}
                  placeholder="10-10-2010"
                  placeholderTextColor='grey'
                  value={newEventDate}
                  onChangeText={text => setNewEventDate(text)}
                />
                <Text style={styles.label}>Event Location</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Central Park"
                  placeholderTextColor='grey'
                  value={newEventLocation}
                  onChangeText={text => setNewEventLocation(text)}
                />
                <Text style={styles.label}>Contact</Text>
                <TextInput
                  style={styles.input}
                  placeholder="email@example.com"
                  placeholderTextColor='grey'
                  value={newEventContact}
                  onChangeText={text => setNewEventContact(text)}
                />
                <Text style={styles.label}>Details</Text>
                <TextInput
                  style={{borderWidth: 1, 
                  borderRadius: 5,
                  borderColor: '#ccc', 
                  padding: 10,
                  marginBottom: 10,
                  height: Math.max(40, height+10) }}
                  multiline
                  placeholder="Join us for a community cleanup event at Central Park."
                  placeholderTextColor='grey'
                  value={newEventDetails}
                  onChangeText={text => setNewEventDetails(text)}
                  onContentSizeChange={(e) => {
                    setHeight(e.nativeEvent.contentSize.height)
                  }
                }
                />
                <Text style={styles.label}>Required Skills</Text>
                {Object.keys(skills).map(skill => (
                  <CheckBox
                    containerStyle={styles.checkBox}
                    key={skill}
                    title={skill}
                    checked={skills[skill]}
                    onPress={() => toggleSkill(skill)}
                  />))}
                <Button title="Create" onPress={handleCreateEvent} />
                <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
              </ScrollView>
            </View>
          </View>
        </Modal>
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
    padding: 20,
    backgroundColor: 'rgba(240, 240, 240, 0.8)', // Semi-transparent background overlay for light mode
  },
  containerDark: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background overlay for dark mode
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  eventItem: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  eventItemDark: {
    padding: 20,
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  eventNameDark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    color: '#000',
  },
  textDark: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2
  },
  checkBox: {
    padding: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AdminDashboard;
