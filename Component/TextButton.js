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
        backgroundColor: "#734F96",
        marginTop: 5,
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },
});
