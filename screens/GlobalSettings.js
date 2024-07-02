import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const GlobalSettings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isNewsNotificationEnabled, setIsNewsNotificationEnabled] = useState(false);

  const handleNotificationToggle = () => {
    setIsNewsNotificationEnabled(previousState => !previousState);
    if (!isNewsNotificationEnabled) {
      handleNotificationSignup();
    } else {
      Alert.alert('Success', 'You have unsubscribed from news notifications.');
    }
  };

  const handleNotificationSignup = () => {
    Alert.alert('Success', 'You have signed up for news notifications.');
  };

  return (
    <View style={isDarkMode ? styles.containerDark : styles.container}>
      <Text style={isDarkMode ? styles.titleDark : styles.title}>Global Settings</Text>
      <View style={styles.settingItem}>
        <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <View style={styles.settingItem}>
        <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>News Notifications</Text>
        <Switch value={isNewsNotificationEnabled} onValueChange={handleNotificationToggle} />
      </View>
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
    marginBottom: 20,
    color: '#000',
  },
  titleDark: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
    color: '#000',
  },
  settingTextDark: {
    fontSize: 18,
    color: '#fff',
  },
});

export default GlobalSettings;
