/* eslint-disable react/no-unstable-nested-components */
// Imports for React Native
import React, { useState } from "react";

// Imports for Navigation Bar
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Imports for Navigation Bar icons
import Ionicons from "react-native-vector-icons/Ionicons";

// App Pages
import HomePage from "./AppPages/HomePage";
import AccountPage from "./AppPages/AccountPage";
import GeneratorPage from "./AppPages/GeneratorPage";
import OutfitsPage from "./AppPages/OutfitsPage";
import WardrobePage from "./AppPages/WardrobePage";

import ClothesData from "./assets/data/clothes.json";
import OutfitsData from "./assets/data/outfits.json";

const Tab = createBottomTabNavigator();

export default function App() {
    const [clothesData, setClothesData] = useState(ClothesData);
    const [outfitsData, setOutfitsData] = useState(OutfitsData);

    const updateClothesData = (newData) => {
        setClothesData(newData);
    };
    const updateOutfitsData = (newData) => {
        setOutfitsData(newData);
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
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
                    component={() => (
                        <GeneratorPage
                            clothesData={clothesData}
                            outfitsData={outfitsData}
                            updateClothesData={updateClothesData}
                            updateOutfitsData={updateOutfitsData}
                        />
                    )}
                    options={{ title: "Outfit Generator" }}
                />
                <Tab.Screen
                    name="Outfits"
                    component={() => (
                        <OutfitsPage
                            clothesData={clothesData}
                            outfitsData={outfitsData}
                            updateClothesData={updateClothesData}
                            updateOutfitsData={updateOutfitsData}
                        />
                    )}
                    options={{ title: "Saved Outfits" }}
                />
                <Tab.Screen
                    name="Home"
                    component={() => (
                        <HomePage
                            outfitsData={outfitsData}
                            updateOutfitsData={updateOutfitsData}
                        />
                    )}
                    options={{ title: "Home" }}
                />
                <Tab.Screen
                    name="Wardrobe"
                    component={() => (
                        <WardrobePage
                            clothesData={clothesData}
                            updateClothesData={updateClothesData}
                        />
                    )}
                    options={{ title: "Wardrobe" }}
                />
                <Tab.Screen
                    name="Account"
                    component={() => (
                        <AccountPage
                            clothesData={clothesData}
                            outfitsData={outfitsData}
                            updateClothesData={updateClothesData}
                            updateOutfitsData={updateOutfitsData}
                        />
                    )}
                    options={{ title: "Account" }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
