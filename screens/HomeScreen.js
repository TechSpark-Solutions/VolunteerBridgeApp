import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, TextInput, Button, Alert } from 'react-native';
import NewsFeedScreen from './HomeScreensPop/NewsFeedScreen';
import EventCalendarScreen from './HomeScreensPop/EventCalendarScreen';
import VolunteerOpportunitiesScreen from './HomeScreensPop/VolunteerOpportunitiesScreen';

const HomeScreen = ({ navigation }) => {
  const [orgName, setOrgName] = useState('');
  const [missionStatement, setMissionStatement] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [otherImages, setOtherImages] = useState([]);

  const handleProfileCreation = () => {
    // Validate input fields
    if (!orgName || !missionStatement || !contactInfo || !projectDescription) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    // Construct nonprofit profile object
    const nonprofitProfile = {
      orgName,
      missionStatement,
      contactInfo,
      projectDescription,
      logoUrl,
      otherImages,
    };

    // Here you can send the nonprofitProfile object to your backend API for storage
    // Example API call:
    // fetch('https://your-api-endpoint.com/nonprofit/profile', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(nonprofitProfile),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Nonprofit profile created:', data);
    //   Alert.alert('Success', 'Nonprofit profile created successfully.');
    // })
    // .catch(error => {
    //   console.error('Error creating nonprofit profile:', error);
    //   Alert.alert('Error', 'Failed to create nonprofit profile. Please try again later.');
    // });

    // For demonstration, alert success and reset form
    Alert.alert('Success', 'Nonprofit profile created successfully.');
    resetForm();
  };

  const resetForm = () => {
    setOrgName('');
    setMissionStatement('');
    setContactInfo('');
    setProjectDescription('');
    setLogoUrl('');
    setOtherImages([]);
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to VolunteerBridge</Text>
        
        {/* Nonprofit Profile Creation Form */}
        <TextInput
          style={styles.input}
          placeholder="Organization Name"
          value={orgName}
          onChangeText={text => setOrgName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Mission Statement"
          multiline
          numberOfLines={4}
          value={missionStatement}
          onChangeText={text => setMissionStatement(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Contact Information"
          value={contactInfo}
          onChangeText={text => setContactInfo(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Project Description"
          multiline
          numberOfLines={4}
          value={projectDescription}
          onChangeText={text => setProjectDescription(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Logo URL"
          value={logoUrl}
          onChangeText={text => setLogoUrl(text)}
        />
        {/* Input for other images can be added similarly */}

        <Button title="Create Profile" onPress={handleProfileCreation} />

        {/* Navigation buttons */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VolunteerOpportunities')}>
          <Text style={styles.buttonText}>Volunteer Opportunities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EventCalendar')}>
          <Text style={styles.buttonText}>Event Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewsFeed')}>
          <Text style={styles.buttonText}>News & Updates</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background overlay
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
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

export default HomeScreen;
