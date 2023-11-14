import React from "react";
import { TouchableOpacity, Text } from "react-native";

function TextButton ({ onPress, title, containerStylesheet, textStylesheet }) {
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
        {title}</Text>
    </TouchableOpacity>
    )
};


export default TextButton;
