import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';


const GlobalSettings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, setLanguage } = useLanguage();
  const [isNewsNotificationEnabled, setIsNewsNotificationEnabled] = useState(false);


  const handleNotificationToggle = () => {
    setIsNewsNotificationEnabled(previousState => !previousState);
    if (!isNewsNotificationEnabled) {
      handleNotificationSignup();
    } else {
      Alert.alert('Success', t('unsubscribed'));
    }
  };


  const handleNotificationSignup = () => {
    Alert.alert('Success', t('signedUp'));
  };


  const handleLanguageChange = (language) => {
    setLanguage(language);
  };


  return (
    <View style={isDarkMode ? styles.containerDark : styles.container}>
      <Text style={isDarkMode ? styles.titleDark : styles.title}>{t('globalSettings')}</Text>
      <View style={styles.settingItem}>
        <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>{t('darkMode')}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <View style={styles.settingItem}>
        <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>{t('newsNotifications')}</Text>
        <Switch value={isNewsNotificationEnabled} onValueChange={handleNotificationToggle} />
      </View>
      <View style={styles.settingItem}>
        <Text style={isDarkMode ? styles.settingTextDark : styles.settingText}>Language</Text>
        <Button title="English" onPress={() => handleLanguageChange('en')} />
        <Button title="Español" onPress={() => handleLanguageChange('es')} />
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


