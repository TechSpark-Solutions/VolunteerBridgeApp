import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Modal, TextInput, ImageBackground,TouchableOpacity, } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import { CheckBox } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';


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

  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  async function fetchEvents() {
    // Fetch events from the database or API


    const fetchedEvents = await axios.get(`${API_URL}/api/v1/events`);
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

    const createdEvent = await axios.post(`${API_URL}/api/v1/events`, newEvent);
    setEvents([...events, createdEvent.data]);
    setIsModalVisible(false);
  };

  const handleUpdateEvent = async (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    await axios.put(`${API_URL}/api/v1/events/${updatedEvent.id}`, updatedEvent);
    setEvents(updatedEvents);
  };

  async function handleDeleteEvent(deletedEvent){
    await axios.delete(`${API_URL}/api/v1/events/${deletedEvent.id}`);
    const updatedEvents = events.filter((event) => event.id !== deletedEvent.id);
    setEvents(updatedEvents);

  }

  const renderItem = ({ item }) => (
    <View style={isDarkMode ? styles.eventItemDark : styles.eventItem}>
      <Text style={isDarkMode ? styles.eventNameDark : styles.eventName}>{item.name}</Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>Date: {item.date}</Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>Location: {item.location}</Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>Contact: {item.contact}</Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>Skills: {item.skills ? item.skills.join(', '):  null}</Text>
      <Text style={isDarkMode ? styles.textDark : styles.text}>Details: {item.details}</Text>
      <Button
      style={styles.button}
        title="Edit"
        flex="row"
        color="#1a759f"
        buttonStyle={styles.editButton}
        titleStyle={styles.editButtonText}
        onPress={() => {
          let skillsObject = {
            Cleaning: false,
            Organization: false,
            "Heavy Lifting": false,
            Spanish: false,
            Cooking: false,
            Gardening: false,
            "Environmental Awareness": false
          };
          function createSkillsObject(itemSkills){
            for(let i = 0; i < itemSkills.length; i++){
              skillsObject[itemSkills[i]] = true;
            }

          }
          createSkillsObject(item.skills)

          navigation.navigate('EditEvent', {

            eventName: item.name,
            eventDetails: item,
            eventId: item.id,
            eventDate: item.date,
            eventLocation: item.location,
            eventSkills: skillsObject,
            eventDetails: item.details,
            eventContact: item.contact,
            updateEvent: handleUpdateEvent
          })
          
        }
        }
      />

<Button
        title="Delete"
        color="red"
        flex="row"
        buttonStyle={styles.deleteButton}
        titleStyle={styles.deleteButtonText}
        onPress={() => handleDeleteEvent(item)}
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
    <LinearGradient
      colors={isDarkMode ? ['#000000', '#434343'] : ['#90A1A4','#95A6A9', '#EFF6F7']}
      style={styles.gradient}
    >
      <View style={isDarkMode ? styles.containerDark : styles.container}>
        <Text style={isDarkMode ? styles.titleDark : styles.title}></Text>
        <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
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
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: '#ccc',
                    padding: 10,
                    marginBottom: 10,
                    height: Math.max(40, height + 10)
                  }}
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
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: 'rgba(240, 240, 240, 0.8)', // Semi-transparent background overlay for light mode
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
    fontFamily:'Times New Roman',
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  eventItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
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
    backgroundColor:'lightgrey',
    padding:10,
    margin:0,
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
  button: {
    backgroundColor: '#1a759f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30 ,
    marginTop:-20,
    width: '100%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily:'Times New Roman',
  },
  editButton: {
    backgroundColor: 'transparent',
   
  },
  deleteButton: {
    backgroundColor: 'transparent',
  },
  editButtonText: {
    color: '#f0f0f0',
  },
  deleteButtonText: {
    color: 'red',
  },

});

export default AdminDashboard;
