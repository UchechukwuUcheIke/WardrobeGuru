/* eslint react/forbid-prop-types: 0 */

import React from "react";
import { TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from 'prop-types';

function IconButton ({ onPress, name, containerStylesheet, iconSize, iconColor }) {
    const containerStyle = containerStylesheet || {}
    const size = iconSize // Size of icon
    const color = iconColor // Color of icon
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

IconButton.propTypes = {

onPress: PropTypes.func,
name: PropTypes.string.isRequired,
containerStylesheet: PropTypes.node.isRequired,
iconSize: PropTypes.number,
iconColor: PropTypes.string,

};

IconButton.defaultProps = {
  onPress: () => {},
  iconSize: 20,
  iconColor: "black"
}

export default IconButton;