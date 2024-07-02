import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNonprofitProfileContext } from '../../context/NonprofitProfileContext';
import { LinearGradient } from 'expo-linear-gradient';

const VolunteerOpportunitiesScreen = () => {
  const { nonprofitProfiles } = useNonprofitProfileContext();

  return (
    <LinearGradient
      colors={['#90A1A4', '#95A6A9', '#EFF6F7']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Nonprofit Profiles</Text>
        <Text style={styles.text}>Browse Nonprofit profiles and contacts</Text>

        {nonprofitProfiles.map((profile, index) => (
          <View key={index} style={styles.profileContainer}>
            <Text style={styles.profileTitle}>{profile.orgName}</Text>
            <Text style={styles.profileText}>Mission: {profile.missionStatement}</Text>
            <Text style={styles.profileText}>Contact: {profile.contactInfo}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Times New Roman',
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Times New Roman',
  },
  profileContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Times New Roman',
  },
  profileText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
    fontFamily: 'Times New Roman',
  },
});

export default VolunteerOpportunitiesScreen;
