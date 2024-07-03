import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [orgName, setOrgName] = useState('');
  const [missionStatement, setMissionStatement] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [otherImages, setOtherImages] = useState([]);

  const handleProfileCreation = () => {
    if (!orgName || !missionStatement || !contactInfo || !projectDescription) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    const nonprofitProfile = {
      orgName,
      missionStatement,
      contactInfo,
      projectDescription,
      logoUrl,
      otherImages,
    };

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
    <LinearGradient
      colors={isDarkMode ? ['#000000', '#434343'] : ['#90A1A4','#95A6A9', '#EFF6F7']}
      style={styles.gradient}
    >
      <Image source={require('../assets/home.png')} style={styles.image} />
      <View style={styles.container}>
        <Text style={isDarkMode ? styles.titleDark : styles.title}>Welcome to Volunteer Bridge</Text>

        {/* Button to navigate to NonprofitProfileScreen */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NonprofitProfileScreen')}>
          <Text style={styles.buttonText}>Create Nonprofit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('VolunteerOpportunities')}>
          <Text style={styles.buttonText}>Browse Nonprofit Profiles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EventCalendar')}>
          <Text style={styles.buttonText}>View Event Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewsFeed')}>
          <Text style={styles.buttonText}>Check News and Updates</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  image: {
    width:'100%',
    height:250,
    marginTop:20,
    marginBottom:-80,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily:'Times New Roman',
    
  },
  titleDark: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#f3f6f4', 
    textAlign: 'center',
    marginBottom: 40,
    fontFamily:'Times New Roman',
  },
  button: {
    backgroundColor: '#1a759f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
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
});

export default HomeScreen;
