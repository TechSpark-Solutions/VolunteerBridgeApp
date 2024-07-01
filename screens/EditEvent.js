import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const EditEvent = ({ route, navigation }) => {
  const { eventId, eventDetails, updateEvent } = route.params;
  const [name, setName] = useState(eventDetails.name);
  const [date, setDate] = useState(eventDetails.date);
  const [location, setLocation] = useState(eventDetails.location);
  const handleSave = () => {
    const updatedEvent = { id: eventId, name, date, location};
    updateEvent(updatedEvent);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Event: {eventId}</Text>
      <TextInput
      style={styles.input}
      placeholder='Event Name'
      value={name}
      onChangeText={setName}
      />
      <TextInput
      style={styles.input}
      placeholder='Event Location'
      value={location}
      onChangeText={setLocation}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
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