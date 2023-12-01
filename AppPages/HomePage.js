/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import ConfettiCannon from "react-native-confetti-cannon";

import TextButton from "../Component/TextButton";
import OutfitDisplay from "../Component/OutfitDisplay";

export default function HomePage({
    outfitsData,
    clothesData,
    updateClothesData,
}) {
    // 4 item array that contains the URL strings of all the outfits
    const [outfitId, setOutfitId] = useState(0);
    const confettiRef = useRef(null);

    function handleChangeOutfit() {
        const numOutfits = outfitsData.length;
        // Pick random idx from 0 to the number of outfits
        const idx = Math.floor(Math.random() * (numOutfits - 1));

        setOutfitId(idx);
    }

    // Function invoked when user clicks "Looks good to me"
    // Begins the confetti animation and updates the "Last worn attribute of all clothes"
    function handleConfirmOutfit() {
        const outfit = outfitsData[outfitId];

        const hatId = outfit.clothingIds[0];
        const topId = outfit.clothingIds[1];
        const bottomId = outfit.clothingIds[2];
        const shoeId = outfit.clothingIds[3];

        // Set the last worn attribute for all clothes
        clothesData.forEach((clothes) => {
            const clothesId = clothes.id;
            updateClothesData(
                clothesData.map((item) => {
                    if (
                        clothesId === hatId ||
                        clothesId === topId ||
                        clothesId === bottomId ||
                        clothesId === shoeId
                    ) {
                        return {
                            ...item,
                            dateLastWorn: new Date().toJSON(),
                            timesWorn: item.timesWorn + 1,
                        };
                    }
                    return item;
                })
            );
        });
    }

    useEffect(() => {
        handleChangeOutfit();
    });

    // Sprays confetti on screen after user has picked out an outfit
    useEffect(() => {
        if (confettiRef.current) {
            confettiRef.current.start();
        }
    }, [updateClothesData]);

    return [
        <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            autoStart={false}
            ref={confettiRef}
            fadeOut
            style={styles.container}
        />,

        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Hello, Johnathan!</Text>
                <Text style={styles.subheading}>
                    {" "}
                    {`Here's your outfit for the day!`}{" "}
                </Text>
            </View>

            <OutfitDisplay
                style={styles.OutfitDisplay}
                outfitId={outfitId}
                outfitsData={outfitsData}
                clothesData={clothesData}
            />

            <View style={styles.optionsContainer}>
                <Slider
                    style={{ width: "50%", height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#734F96"
                    maximumTrackTintColor="#000000"
                />

                <TextButton
                    text="Looks good to me!"
                    onPress={handleConfirmOutfit}
                />

                <TextButton
                    text="Pick something else"
                    onPress={handleChangeOutfit}
                />
            </View>
        </View>,
    ];
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,

        alignItems: "center",
        height: "100%",
    },
    headingContainer: {
        width: "100%",
        height: "20%",
    },
    heading: {
        color: "black",
        fontSize: 30,
        textAlign: "center",
    },
    subheading: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
    },
    OutfitDisplay: {
        width: "50%",
        height: "50%",
    },
    optionsContainer: {
        width: "100%",
        height: "30%",
        alignItems: "center",
    },
});
