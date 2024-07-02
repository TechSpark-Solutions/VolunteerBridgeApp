import React, { useState, useMemo } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook from context
import * as LocalAuthentication from 'expo-local-authentication';
import * as AppleAuthentication from 'expo-apple-authentication';
import RadioGroup from 'react-native-radio-buttons-group';
import axios from 'axios';

const UserProfileSettings = () => {

  const API_URL = process.env.EXPO_PUBLIC_API_URL

  const navigation = useNavigation();
  const { isDarkMode } = useTheme(); // Retrieve isDarkMode state and toggleTheme function

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState({ "email": null, "firstName": null, "lastName": null, "role": "user", "userID": null });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];

  const checkHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      console.log('This device is not compatible for biometric authentication');
      return false;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      console.log('No biometrics are enrolled');
      return false;
    }
    return true;
  };



  const authenticate = async () => {



    const hasHardware = await checkHardware();
    if (!hasHardware) return;
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });


    try {
      if (credential) {
        const { user, email, fullName } = credential;
        let signInInfo = { userID: user, email: email, firstName: fullName.givenName, lastName: fullName.familyName, role: 'user' }
        if (signInInfo.email !== null) {
          await axios.post(`${API_URL}/api/v1/signup/`, signInInfo);
        }
        const res = await axios.post(`${API_URL}/api/v1/signin/`, signInInfo);
        let userInfo = res.data;

        setIsAuthenticated(true);
        setUserData(userInfo);
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setPhone(userInfo.phone);
        setEmail(userInfo.email);
        setAge(userInfo.age);
        setLocation(userInfo.location);
        setBio(userInfo.bio);
        setSelectedRole(userInfo.role);
      }
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        console.log('User canceled the sign-in');
      } else {
        console.error('Error with Apple Sign In:', error);
      }
    }
  }

  const handleSave = async () => {
    const profileData = {
      firstName,
      lastName,
      phone,
      email,
      age,
      location,
      role: selectedRole,
      bio,
    };
    Alert.alert('Saved');
    try {
      const response = await axios.put(`${API_URL}/api/v1/signin/${userData.userID}`, profileData);
      

    } catch (error) {
      Alert.alert('Error', error.message);
    }

  };

  const roleButtons = useMemo(() => ([
    {
      id: 'user',
      label: 'User',
      value: 'user'
    },
    {
      id: 'admin',
      label: 'Admin',
      value: 'admin'
    }
  ]), []);

  const [selectedRole, setSelectedRole] = useState('user');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderStateItem = ({ item }) => (
    <TouchableOpacity onPress={() => { setLocation(item); toggleModal(); }}>
      <Text style={styles.stateItem}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={isDarkMode ? styles.containerDark : styles.container}>
      <Text style={isDarkMode ? styles.titleDark : styles.title}>User Profile Settings</Text>
      {isAuthenticated ? <>
        <>
          {userData ?
            <>
              <RadioGroup
                radioButtons={roleButtons}
                onPress={setSelectedRole}
                selectedId={selectedRole}
              />
              <Text style={isDarkMode ? styles.labelDark : styles.label}>First Name:</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
              />

              <Text style={isDarkMode ? styles.labelDark : styles.label}>Last Name:</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
              />

              <Text style={isDarkMode ? styles.labelDark : styles.label}>Phone:</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />

              <Text style={isDarkMode ? styles.labelDark : styles.label}>Email:</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />

              <Text style={isDarkMode ? styles.labelDark : styles.label}>Age:</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
                value={age ? age.toString() : ''}
                onChangeText={setAge}
                placeholder="Enter your age"
                keyboardType="numeric"
              />

              <Text style={isDarkMode ? styles.labelDark : styles.label}>Location (State):</Text>
              <TouchableOpacity onPress={toggleModal} style={[styles.dropdown, isDarkMode && styles.dropdownDark]}>
                <Text style={[styles.dropdownText, isDarkMode && styles.dropdownTextDark]}>{location || "Select your state"}</Text>
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
              <Text style={isDarkMode ? styles.labelDark : styles.label}>Bio:</Text>
              <TextInput
                style={[styles.input, isDarkMode && styles.inputDark]}
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
            </> : <Text>Reset Sign in with Apple and try again.</Text>
          }
        </>
      </> : <>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

          <Button title="Sign In" onPress={authenticate} />
        </View>
      </>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  titleDark: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  labelDark: {
    fontSize: 16,
    marginBottom: 8,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 8,
    color: '#000',
  },
  inputDark: {
    color: '#fff',
    borderColor: '#888',
  },
  dropdown: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'center',
    paddingLeft: 8,
    backgroundColor: '#fff',
  },
  dropdownDark: {
    backgroundColor: '#444',
    borderColor: '#888',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownTextDark: {
    color: '#fff',
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
    color: '#000',
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
