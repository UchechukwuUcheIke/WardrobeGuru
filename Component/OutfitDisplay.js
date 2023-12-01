/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */

import React from "react";
import { StyleSheet, Image, View } from "react-native";

export default function OutfitDisplay({ outfit, clothesData }) {
    const hatId = outfit.clothingIds[0];
    const topId = outfit.clothingIds[1];
    const bottomId = outfit.clothingIds[2];
    const shoeId = outfit.clothingIds[3];

    let hatURL = "";
    let topURL = "";
    let bottomURL = "";
    let shoeURL = "";

    // Iterate through outfits list and get imageURL of clothes with corresponding ids
    clothesData.forEach((clothes) => {
        const clothesId = clothes.id;
        if (clothesId === hatId) {
            hatURL = clothes.imageUrl;
        }
        if (clothesId === topId) {
            topURL = clothes.imageUrl;
        }
        if (clothesId === bottomId) {
            bottomURL = clothes.imageUrl;
        }
        if (clothesId === shoeId) {
            shoeURL = clothes.imageUrl;
        }
    });

    return (
        <View style={styles.displayStyle}>
            <Image
                style={styles.image}
                source={{
                    uri: hatURL,
                }}
                resizeMode="contain"
            />
            <Image
                style={styles.image}
                source={{
                    uri: topURL,
                }}
                resizeMode="contain"
            />
            <Image
                style={styles.image}
                source={{
                    uri: bottomURL,
                }}
                resizeMode="contain"
            />
            <Image
                style={styles.image}
                source={{
                    uri: shoeURL,
                }}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    displayStyle: {
        width: "50%",
        height: "50%",
        marginBottom: "1%",
    },
    image: {
        width: "100%",
        height: "20%",
        marginBottom: "1%",
    },
});
