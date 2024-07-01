import React from 'react';
import { View, Text, Button, StyleSheet, Switch, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  const handleNotificationSignup = () => {
    Alert.alert('Success', 'You have signed up for news notifications.');
  };

  return (
    <View style={isDarkMode ? styles.containerDark : styles.container}>
      <Text style={isDarkMode ? styles.titleDark : styles.title}>Settings</Text>

      {/* Removed the Dark Mode switch */}
      
      <Button title="Enable News Notifications" onPress={handleNotificationSignup} />
  
      <Button
        title="Global Settings"
        onPress={() => navigation.navigate('GlobalSettings')}
      />
      <Button
        title="User Profile Settings"
        onPress={() => navigation.navigate('UserProfileSettings')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
});

export default SettingsScreen;
