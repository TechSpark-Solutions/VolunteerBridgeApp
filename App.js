import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';


import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import AdminDashboard from './AdminScreens/AdminDashboard';
import VolunteerDashboard from './screens/VolunteerDashboard';
import GlobalSettings from './screens/GlobalSettings';
import UserProfileSettings from './screens/UserProfileSettings';
import SignUpModal from './screens/SignUpModal';
import CreateEvent from './screens/CreateEvent';
import EditEvent from './screens/EditEvent';
import EventList from './screens/EventList';
import VolunteerOpportunitiesScreen from './screens/HomeScreensPop/VolunteerOpportunitiesScreen';
import EventCalendarScreen from './screens/HomeScreensPop/EventCalendarScreen';
import NewsFeedScreen from './screens/HomeScreensPop/NewsFeedScreen';
import NonprofitProfileScreen from './screens/HomeScreensPop/NonprofitProfileScreen';


import { ThemeProvider } from './context/ThemeContext';
import { NonprofitProfileProvider } from './context/NonprofitProfileContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainTabNavigator = () => {
  const { t } = useLanguage();


  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#1a759f',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('home'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="VolunteerDashboard"
        component={VolunteerDashboard}
        options={{
          tabBarLabel: t('dashboard'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: t('settings'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AdminDashboard"
        component={AdminDashboard}
        options={{
          tabBarLabel: t('admin'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};


const AuthStack = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="HomeScreen" component={MainTabNavigator} />
    <Stack.Screen name="GlobalSettings" component={GlobalSettings} />
    <Stack.Screen name="UserProfileSettings" component={UserProfileSettings} />
    <Stack.Screen name="SignUpModal" component={SignUpModal} />
    <Stack.Screen name="CreateEvent" component={CreateEvent} />
    <Stack.Screen name="EditEvent" component={EditEvent} />
    <Stack.Screen name="EventList" component={EventList} />
    <Stack.Screen name="VolunteerOpportunities" component={VolunteerOpportunitiesScreen} />
    <Stack.Screen name="EventCalendar" component={EventCalendarScreen} />
    <Stack.Screen name="NewsFeed" component={NewsFeedScreen} />
    <Stack.Screen name="NonprofitProfileScreen" component={NonprofitProfileScreen} />
  </Stack.Navigator>
);


const App = () => {
  return (
    <ThemeProvider>
      <NonprofitProfileProvider>
        <LanguageProvider>
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
        </LanguageProvider>
      </NonprofitProfileProvider>
    </ThemeProvider>
  );
};


export default App;