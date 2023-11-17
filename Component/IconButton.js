/* eslint react/forbid-prop-types: 0 */

import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

function IconButton({ onPress, name, iconSize, iconColor }) {
    const size = iconSize; // Size of icon
    const color = iconColor; // Color of icon
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.circularButton}
        >
            <Ionicons name={name} size={size} color={color} />
        </TouchableOpacity>
    );
}

IconButton.propTypes = {
    onPress: PropTypes.func,
    name: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    iconColor: PropTypes.string,
};

IconButton.defaultProps = {
    onPress: () => {},
    iconSize: 20,
    iconColor: "black",
};

export default IconButton;

const styles = StyleSheet.create({
    circularButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#734F96",
        justifyContent: "center",
        alignItems: "center",
    },
});
