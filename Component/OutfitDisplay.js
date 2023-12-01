/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */

import React from "react";
import { StyleSheet, Image, View } from "react-native";

export default function OutfitDisplay({ outfit, clothesData, style }) {
    const hatId = outfit.clothingIds[0];
    const topId = outfit.clothingIds[1];
    const bottomId = outfit.clothingIds[2];
    const shoeId = outfit.clothingIds[3];

    let hat;
    let top;
    let bottom;
    let shoe;

    // Iterate through outfits list and get imageURL of clothes with corresponding ids
    clothesData.forEach((clothes) => {
        const clothesId = clothes.id;
        if (clothesId === hatId) {
            hat = clothes;
        }
        if (clothesId === topId) {
            top = clothes;
        }
        if (clothesId === bottomId) {
            bottom = clothes;
        }
        if (clothesId === shoeId) {
            shoe = clothes;
        }
    });

    return (
        <View style={style}>
            <Image
                style={[
                    styles.image,
                    {
                        borderWidth: hat.ownedByUser ? 0 : 2,
                    },
                ]}
                source={{
                    uri: hat.imageUrl,
                }}
                resizeMode="contain"
            />
            <Image
                style={[styles.image, { borderWidth: top.ownedByUser ? 0 : 2 }]}
                source={{
                    uri: top.imageUrl,
                }}
                resizeMode="contain"
            />
            <Image
                style={[
                    styles.image,
                    { borderWidth: bottom.ownedByUser ? 0 : 2 },
                ]}
                source={{
                    uri: bottom.imageUrl,
                }}
                resizeMode="contain"
            />
            <Image
                style={[
                    styles.image,
                    { borderWidth: shoe.ownedByUser ? 0 : 2 },
                ]}
                source={{
                    uri: shoe.imageUrl,
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
        borderColor: "#FFD700",
    },
});
