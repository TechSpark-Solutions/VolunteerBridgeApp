import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';

const UserProfileSettings = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const [bio, setBio] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

  const handleSave = async () => {
    const profileData = {
      firstName,
      lastName,
      phone,
      email,
      age,
      location,
      skills,
      bio,
    };

    try {
      const response = await fetch('https://example.com/api/profile', {
        method: 'POST', // or 'PUT' for updating existing profile
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        Alert.alert('Success', 'Profile information saved successfully');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to save profile information');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving profile information');
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderStateItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setLocation(item); toggleModal(); }}>
      <Text style={styles.stateItem}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>User Profile Settings</Text>
      
      <Text style={styles.label}>First Name:</Text>
      <TextInput
        style={styles.input}
        value={firstName}
        onChangeText={setFirstName}
        placeholder="Enter your first name"
      />

      <Text style={styles.label}>Last Name:</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Enter your last name"
      />

      <Text style={styles.label}>Phone:</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Age:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Location (State):</Text>
      <TouchableOpacity onPress={toggleModal} style={styles.dropdown}>
        <Text style={styles.dropdownText}>{location || "Select your state"}</Text>
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <FlatList
            data={states}
            renderItem={renderStateItem}
            keyExtractor={(item) => item}
          />
          <Button title="Close" onPress={toggleModal} />
        </View>
      </Modal>

      <Text style={styles.label}>Skills:</Text>
      <TextInput
        style={styles.input}
        value={skills}
        onChangeText={setSkills}
        placeholder="Enter your skills"
      />

      <Text style={styles.label}>Bio:</Text>
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Tell us about yourself"
        multiline
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={[styles.button, styles.saveButton]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'center',
    paddingLeft: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  stateItem: {
    padding: 10,
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  saveButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserProfileSettings;
