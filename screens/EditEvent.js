import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';

const EditEvent = ({ route, navigation }) => {
  const { eventId, eventName, eventDate, eventDetails, eventLocation, eventSkills, eventContact, updateEvent } = route.params;
  const [name, setName] = useState(eventName);
  const [date, setDate] = useState(eventDate);
  const [details, setDetails] = useState(eventDetails);
  const [location, setLocation] = useState(eventLocation);
  const [skills, setSkills] = useState(eventSkills);
  const [contact, setContact] = useState(eventContact);

  const [height, setHeight] = useState(200);

  console.log('skills', skills);

  const handleSave = () => {
    const selectedSkills = Object.keys(skills).filter(skill => skills[skill]);
    const updatedEvent = { id: eventId, name, date, details, location, skills: selectedSkills, contact };
    updateEvent(updatedEvent);
    navigation.goBack();
  };

  const toggleSkill = (skill) => {
    setSkills(prevSkills => ({
      ...prevSkills,
      [skill]: !prevSkills[skill]
    }));
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Edit Event: {eventName}</Text>
        <TextInput
          style={styles.input}
          placeholder='Event Name'
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder='Event Date'
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder='Event Contact'
          value={contact}
          onChangeText={setContact}
        />
        <TextInput
          style={styles.input}
          placeholder='Event Location'
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={{
            borderRadius: 5,
            borderColor: '#ccc',
            padding: 10,
            paddingTop: 6,
            marginBottom: 10,
            height: Math.max(50, height + 10),
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 15,
            marginBottom: 20,
            fontSize: 16,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 2,
          }}
          multiline
          placeholder='Event Details'
          value={details}
          onChangeText={setDetails}
          onContentSizeChange={(e) => {
            setHeight(e.nativeEvent.contentSize.height)
          }}
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
        <Button title="Save" onPress={handleSave} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:40,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  saveButton: {
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  saveButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  }
});
export default EditEvent;