import React from "react";
import { Text } from "react-native";
import { View, Image, StyleSheet, FlatList } from 'react-native';

import image1 from "../images/saved_1.png"
import image2 from "../images/saved_2.png"
import image3 from "../images/saved_3.png"
import image4 from "../images/saved_4.png"

const Grid = () => {
  return (
    <View style={styles.gridContainer}>
        <Image source={image1} style={styles.gridItem} />
        <Image source={image2} style={styles.gridItem} />
        <Image source={image3} style={styles.gridItem} />
        <View style={styles.triangle1} />
        <View style={styles.triangle2} />
        <Image source={image4} style={styles.gridItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    fflexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 60,
  },
   gridItem: {
    width: '50%', // Adjust as needed based on your layout
    height: 240, // Adjust as needed based on your layout
    marginBottom: 0,
    marginRight: 5,
    marginLeft: 5,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle1: {
    position: 'absolute',
    bottom: 20, 
    left: 340, 
    elevation: 200,
    width: 10,
    height: 20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black', // Change the color as needed
    borderLeftColor: 'transparent',
    transform: [{ rotate: '90deg' }],
  },
  triangle2: {
    position: 'absolute',
    bottom: 20, 
    left: 20, 
    elevation: 100,
    width: 10,
    height: 20,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftWidth: 5,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black', // Change the color as needed
    borderLeftColor: 'transparent',
    transform: [{ rotate: '270deg' }],
  }
});

export default Grid;





// export default function OutfitPage() {
//     return <Text>OutfitPage</Text>;
    
// }


