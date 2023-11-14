/* eslint-disable react/no-unstable-nested-components */
// Imports for React Native
import React from "react";

// Imports for Navigation Bar
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Imports for Navigation Bar icons
import Ionicons from "react-native-vector-icons/Ionicons";

// App Pages
import HomePage from "./AppPages/HomePage";
import AccountPage from "./AppPages/AccountPage";
import GeneratorPage from "./AppPages/GeneratorPage";
import OutfitPage from "./AppPages/OutfitsPage";
import WardrobePage from "./AppPages/WardrobePage";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerStyle: {
                        backgroundColor: "#8088E9",
                    },
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                    headerTitleAlign: "center",
                    tabBarIcon: ({ focused, color, size }) => {
                        const icons = {
                            Generator: "compass",
                            Outfits: "bookmark",
                            Home: "home",
                            Wardrobe: "shirt",
                            Account: "person-circle",
                        };

                        return (
                            <Ionicons
                                name={
                                    focused
                                        ? icons[route.name]
                                        : `${icons[route.name]}-outline`
                                }
                                size={size}
                                color={color}
                            />
                        );
                    },
                    tabBarActiveTintColor: "#8088E9",
                    tabBarInactiveTintColor: "gray",
                })}
            >
                <Tab.Screen
                    name="Generator"
                    component={GeneratorPage}
                    options={{ title: "Outfit Generator" }}
                />
                <Tab.Screen
                    name="Outfits"
                    component={OutfitPage}
                    options={{ title: "Saved Outfits" }}
                />
                <Tab.Screen
                    name="Home"
                    component={HomePage}
                    options={{ title: "Home" }}
                />
                <Tab.Screen
                    name="Wardrobe"
                    component={WardrobePage}
                    options={{ title: "Wardrobe" }}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountPage}
                    options={{ title: "Account" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
