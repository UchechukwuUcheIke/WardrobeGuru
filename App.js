// Imports for React Native
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Imports for Navigation Bar
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Imports for Navigation Bar icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

// App Pages
import HomePage from './AppPages/HomePage';
import AccountPage from './AppPages/AccountPage';
import GeneratorPage from './AppPages/GeneratorPage';
import OutfitPage from './AppPages/OutfitsPage';
import WardrobePage from './AppPages/WardrobePage';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
        
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Generator') {
              iconName = focused
                ? 'search-circle' 
                : 'search-circle-outline';
            } else if (route.name === "Saved Outfits") {
              iconName = focused
                ? 'bookmarks' 
                : 'bookmarks-outline';
              
            } else if (route.name === "Account") {
              iconName = focused
                ? 'person-circle' 
                : 'person-circle-outline';
              
            } else if (route.name === "Wardrobe") {
              iconName = focused
                ? 'file-tray-stacked' 
                : 'file-tray-stacked-outline';
            }
        
            
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'lavender',
            tabBarInactiveTintColor: 'gray',
        })}>

        <Tab.Screen name="Generator" component={GeneratorPage} />
        <Tab.Screen name="Saved Outfits" component={OutfitPage} />
        <Tab.Screen name="Home" component={HomePage} />
        <Tab.Screen name="Wardobe" component={WardrobePage} />
        <Tab.Screen name="Account" component={AccountPage} />
            
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
