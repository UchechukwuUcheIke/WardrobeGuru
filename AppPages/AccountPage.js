import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

import RecentlyDeleted from "../Component/RecentlyDeleted";

const TILE_SIZE = 120;
const SPACING = 8;

// TODO: Add other pages as screens
function MenuScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Tile
                    iconName="person"
                    label="User Profile"
                    onPress={() => console.log("User Profile pressed")}
                />
                <Tile
                    iconName="settings"
                    label="Settings"
                    onPress={() => console.log("Settings pressed")}
                />
            </View>
            <View style={styles.row}>
                <Tile
                    iconName="trash"
                    label="Recently Deleted"
                    onPress={() => navigation.navigate("Recently Deleted")}
                />
                <Tile
                    iconName="help-circle"
                    label="Help"
                    onPress={() => console.log("Help pressed")}
                />
            </View>
        </View>
    );
}

function Tile({ iconName, label, onPress }) {
    return (
        <TouchableOpacity style={styles.tile} onPress={onPress}>
            <Ionicons name={iconName} size={40} color="#8088E9" />
            <Text style={styles.label} numberOfLines={2} ellipsizeMode="tail">
                {label}
            </Text>
        </TouchableOpacity>
    );
}

Tile.propTypes = {
    iconName: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};

// TODO: Add other pages as screens
export default function AccountPage() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName="Menu"
            screenOptions={() => ({
                headerTitleAlign: "center",
            })}
        >
            <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Recently Deleted" component={RecentlyDeleted} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    tile: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#8088E9",
        width: TILE_SIZE,
        height: TILE_SIZE,
        borderRadius: 8,
        padding: 8,
        margin: SPACING,
    },
    label: {
        marginTop: 8,
        fontSize: 14,
        textAlign: "center",
    },
});
