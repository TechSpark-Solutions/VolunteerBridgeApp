import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Alert, Image,TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  const handleNotificationSignup = () => {
    Alert.alert('Success', 'You have signed up for news notifications.');
  };
 
  return (
    <LinearGradient
    colors={isDarkMode ? ['#000000', '#434343'] : ['#90A1A4','#95A6A9', '#EFF6F7']}
    style={styles.gradient}
  >
    
      <View style={isDarkMode ? styles.containerDark : styles.container}>
        <View style={styles.content}>
        
          <Text style={isDarkMode ? styles.titleDark : styles.title}></Text>
         
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GlobalSettings')}>
          {/* <MaterialIcons name="app-settings-alt" size={24} color="white" style={styles.buttonIcon} /> */}
          <Text style={styles.buttonText}>Global Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfileSettings')}>
          <Text style={styles.buttonText}>User Profile settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
        
          <Text style={styles.buttonText}>Feedback</Text>
        </TouchableOpacity>
         
        </View>
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
    padding: 20,
    // backgroundColor: 'rgba(240, 220, 240, 0.4)', 
  },
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // backgroundColor: 'rgba(51, 51, 51, 0.5)', 
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding:20,
    marginTop:-55,
    color: '#000',
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -100,
    padding:20,
    color: '#fff',
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
  buttonIcon: {
    marginRight: 10,
  },
  
});
 
export default SettingsScreen;