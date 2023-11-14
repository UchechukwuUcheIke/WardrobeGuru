/* eslint react/forbid-prop-types: 0 */

import React from "react";
import { TouchableOpacity, Text } from "react-native";
import PropTypes from 'prop-types';

function TextButton ({ onPress, text, containerStylesheet, textStylesheet }) {
    const containerStyle = containerStylesheet || {}
    const textStyle = textStylesheet || {}

    const activeOpacity = 0.8
    return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={containerStyle}
    >
      <Text 
      style={textStyle}>
        {text}</Text>
    </TouchableOpacity>
    )
};

TextButton.propTypes = {

onPress: PropTypes.func.isRequired,
text: PropTypes.string.isRequired,
containerStylesheet: PropTypes.node.isRequired,
textStylesheet: PropTypes.node.isRequired,

};

export default TextButton;
