import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNonprofitProfileContext } from '../../context/NonprofitProfileContext';
import { LinearGradient } from 'expo-linear-gradient';

const NonprofitProfileScreen = ({ navigation }) => {
  const { addNonprofitProfile } = useNonprofitProfileContext();
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

    addNonprofitProfile(nonprofitProfile);

    Alert.alert('Success', 'Nonprofit profile created successfully. Your org. profile will be displayed in the  "Browse Volunteer Opportunities screen (in our Home Screen) ! 😊 ');
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
      colors={['#90A1A4', '#95A6A9', '#EFF6F7']}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Nonprofit Profile Creation</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleProfileCreation}>
          <Text style={styles.buttonText}>Create Profile</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Times New Roman',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    fontFamily: 'Times New Roman',
  },
});

export default NonprofitProfileScreen;
