import React from "react";
import { TouchableOpacity, Text } from "react-native";

function IconButton ({ onPress, name, containerStylesheet, iconStylesheet }) {
    const containerStyle = containerStylesheet | {}
    const textStyle = textStylesheet | {}
    return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={containerStyle}
    >
      <Icon
      name={name}
      style={iconStylesheet}
      />
    </TouchableOpacity>
    )
};

export default IconButton;