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
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  }
});
export default EditEvent;