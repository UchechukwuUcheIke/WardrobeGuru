/* eslint react/forbid-prop-types: 0 */

import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";

function TextButton({ onPress, text }) {
    const activeOpacity = 0.8;
    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            onPress={onPress}
            style={styles.buttonContainer}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

TextButton.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
};

TextButton.defaultProps = {
    onPress: () => {},
};

export default TextButton;

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#8088E9",
        marginTop: 5,
        padding: 8,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        textAlign: "center",
        textAlignVertical: "center",
    },
});
