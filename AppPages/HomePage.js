/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable-next-line react-hooks/exhaustive-deps */

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
    const [formalityLevel, setFormalityLevel] = useState(3);
    const [outfit, setOutfit] = useState({});
    const confettiRef = useRef(null);

    function handleChangeOutfit() {
        const lastId = outfit.id;
        let idx = 0;
        let attempts = 0;
        do {
            idx = Math.floor(Math.random() * outfitsData.length);
            attempts += 1;
        } while (
            (attempts < 20 &&
                Math.abs(formalityLevel - outfitsData[idx].formalityRatingAvg) >
                    1) ||
            outfitsData[idx].id === lastId
        );

        if (attempts < 20) {
            setOutfit(outfitsData[idx]);
        } else {
            setOutfit({});
        }
    }

    const handleFormalityChange = (value) => {
        setFormalityLevel(value);
    };

    // Function invoked when user clicks "Looks good to me"
    // Begins the confetti animation and updates the "Last worn attribute of all clothes"
    function handleConfirmOutfit() {
        if (outfit.length > 0) {
            const hatId = outfit.clothingIds[0];
            const topId = outfit.clothingIds[1];
            const bottomId = outfit.clothingIds[2];
            const shoeId = outfit.clothingIds[3];

            // Set the last worn attribute for all clothes
            updateClothesData(
                clothesData.map((item) => {
                    if (
                        item.id === hatId ||
                        item.id === topId ||
                        item.id === bottomId ||
                        item.id === shoeId
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
        }
    }

    useEffect(() => {
        handleChangeOutfit();
    }, []);

    // Sprays confetti on screen after user has picked out an outfit
    useEffect(() => {
        if (confettiRef.current) {
            confettiRef.current.start();
        }
    }, [clothesData]);

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

            <View style={styles.mainContainer}>
                {Object.keys(outfit).length > 0 ? (
                    <OutfitDisplay
                        style={styles.OutfitDisplay}
                        outfit={outfit}
                        clothesData={clothesData}
                    />
                ) : (
                    <Text style={styles.subheading}>
                        {" "}
                        {`There aren't any more saved outfits that match your needs. Please try moving the slider or generating more outfits!`}{" "}
                    </Text>
                )}
            </View>

            <View style={styles.optionsContainer}>
                <View style={styles.featureRow}>
                    <Text style={styles.label}>Casual</Text>
                    <Slider
                        style={{ width: 150, height: 40 }}
                        minimumValue={1}
                        maximumValue={5}
                        step={1}
                        value={formalityLevel}
                        minimumTrackTintColor="#81b0ff"
                        maximumTrackTintColor="#000000"
                        onSlidingComplete={handleFormalityChange}
                    />
                    <Text style={styles.label}>Formal</Text>
                </View>

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
        marginTop: 20,
        marginBottom: -10,
        width: "100%",
        height: "20%",
    },
    mainContainer: {
        width: "60%",
        alignItems: "center",
        height: "100%",
    },
    featureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
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
        marginTop: -370,
        width: "100%",
        height: "30%",
        alignItems: "center",
    },
    label: {
        padding: 10,
        fontSize: 18,
    },
});
