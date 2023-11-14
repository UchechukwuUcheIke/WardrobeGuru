import React from "react";
import { TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function IconButton ({ onPress, name, containerStylesheet, iconSize, iconColor }) {
    const containerStyle = containerStylesheet || {}
    const size = iconSize || 20 // Size of icon
    const color = iconColor || "black" // Color of icon
    return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={containerStyle}
    >
      <Ionicons
        name={name}
        size={size}
        color={color}
      />
    </TouchableOpacity>
    )
};

export default IconButton;