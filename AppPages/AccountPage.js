import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const TILE_SIZE = 120;
const SPACING = 8;

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

export default function AccountPage() {
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
                    onPress={() => console.log("Recently Deleted pressed")}
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
