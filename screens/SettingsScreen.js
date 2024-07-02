import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, Alert, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  const handleNotificationSignup = () => {
    Alert.alert('Success', 'You have signed up for news notifications.');
  };

  return (
    <ImageBackground
    source={require('../assets/image1_0.jpg')}
    style={styles.backgroundImage}
  >
      <View style={isDarkMode ? styles.containerDark : styles.container}>
        <View style={styles.content}>
        
          <Text style={isDarkMode ? styles.titleDark : styles.title}>Settings</Text>
          <Button
            title="Global Settings"
            onPress={() => navigation.navigate('GlobalSettings')}
          />
          <Button
            title="User Profile Settings"
            onPress={() => navigation.navigate('UserProfileSettings')}
          />
        </View>
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
    padding: 20,
    backgroundColor: 'rgba(240, 220, 240, 0.4)', 
  },
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(51, 51, 51, 0.5)', 
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
    marginTop:-400,
    color: '#000',
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: -400,
    padding:20,
    color: '#fff',
  },
  
});

export default SettingsScreen;