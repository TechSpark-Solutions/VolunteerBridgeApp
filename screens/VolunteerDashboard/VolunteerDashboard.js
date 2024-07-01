import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const VolunteerDashboard = ({ navigation }) => {
  return (
    <ImageBackground
      //source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Volunteer Dashboard</Text>
        
        {/* Navigation buttons */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpModal')}>
          <Text style={styles.buttonText}>Sign Up for an Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EventListScreen')}>
          <Text style={styles.buttonText}>Event List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileSettings')}>
          <Text style={styles.buttonText}>Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfileSettingsEdit')}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default VolunteerDashboard;
