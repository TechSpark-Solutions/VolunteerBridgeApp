import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const mockEvents = [
  { id: '1', name: 'Food Drive', date: '2024-07-01', location: 'Community Center' },
  { id: '2', name: 'Park Cleanup', date: '2024-07-15', location: 'City Park' },
];

const AdminDashboard = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text>{item.date}</Text>
      <Text>{item.location}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('EditEvent', { eventId: item.id })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <Button
        title="Create Event"
        onPress={() => navigation.navigate('CreateEvent')}
      />
      <FlatList
        data={mockEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdminDashboard;
