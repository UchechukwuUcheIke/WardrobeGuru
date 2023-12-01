/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import Slider from "@react-native-community/slider";
import IconButton from "../Component/IconButton";
import OutfitDisplay from "../Component/OutfitDisplay";

export default function GeneratorPage({
    clothesData,
    outfitsData,
    updateOutfitsData,
}) {
    const [isDiscoveryMode, setDiscoveryMode] = useState(false);
    const [formalityLevel, setFormalityLevel] = useState(3);
    const [outfit, setOutfit] = useState({});

    const handleDiscoveryModeToggle = () => {
        setDiscoveryMode(!isDiscoveryMode);
    };
    const handleFormalityChange = (value) => {
        setFormalityLevel(value);
    };

    const clothesByCategory = (groupedClothes, item) => {
        const { category } = item;

        // Create an array for the category if it doesn't exist
        if (!groupedClothes[category]) {
            groupedClothes[category] = [];
        }

        // Push the item to the corresponding category array
        groupedClothes[category].push(item);

        return groupedClothes;
    };

    const OwnedClothes = clothesData
        .filter((item) => item.dateDeleted === null && item.ownedByUser)
        .reduce(clothesByCategory, {});
    const UnownedClothes = clothesData
        .filter((item) => !item.ownedByUser)
        .reduce(clothesByCategory, {});

    const handleCheck = () => {
        updateOutfitsData([...outfitsData, outfit]);
    };

    const handleCancel = () => {
        const clothingIds = [];
        let formalityRatingAvg = 0;
        let warmthRatingAvg = 0;
        const unownedIdx = isDiscoveryMode ? Math.floor(Math.random() * 4) : -1;

        // Generate Hat
        let idx = 0;
        let attempts = 0;
        let collection =
            unownedIdx === 0
                ? UnownedClothes.accessories
                : OwnedClothes.accessories;
        do {
            idx = Math.floor(Math.random() * collection.length);
            attempts += 1;
        } while (
            attempts < 20 &&
            Math.abs(formalityLevel - collection[idx].formalityRating) > 1
        );
        if (attempts >= 20) {
            setOutfit({});
            return;
        }
        clothingIds[0] = collection[idx].id;
        formalityRatingAvg += collection[idx].formalityRating;
        warmthRatingAvg += collection[idx].warmthRating;

        // Generate Top
        attempts = 0;
        collection = unownedIdx === 1 ? UnownedClothes.tops : OwnedClothes.tops;
        do {
            idx = Math.floor(Math.random() * collection.length);
            attempts += 1;
        } while (
            attempts < 20 &&
            Math.abs(formalityLevel - collection[idx].formalityRating) > 1
        );
        if (attempts >= 20) {
            setOutfit({});
            return;
        }
        clothingIds[1] = collection[idx].id;
        formalityRatingAvg += collection[idx].formalityRating;
        warmthRatingAvg += collection[idx].warmthRating;

        // Generate Bottom
        attempts = 0;
        collection =
            unownedIdx === 2 ? UnownedClothes.bottoms : OwnedClothes.bottoms;
        do {
            idx = Math.floor(Math.random() * collection.length);
            attempts += 1;
        } while (
            attempts < 20 &&
            Math.abs(formalityLevel - collection[idx].formalityRating) > 1
        );
        if (attempts >= 20) {
            setOutfit({});
            return;
        }
        clothingIds[2] = collection[idx].id;
        formalityRatingAvg += collection[idx].formalityRating;
        warmthRatingAvg += collection[idx].warmthRating;

        // Generate Shoes
        attempts = 0;
        collection =
            unownedIdx === 3 ? UnownedClothes.shoes : OwnedClothes.shoes;
        do {
            idx = Math.floor(Math.random() * collection.length);
            attempts += 1;
        } while (
            attempts < 20 &&
            Math.abs(formalityLevel - collection[idx].formalityRating) > 1
        );
        if (attempts >= 20) {
            setOutfit({});
            return;
        }
        clothingIds[3] = collection[idx].id;
        formalityRatingAvg += collection[idx].formalityRating;
        warmthRatingAvg += collection[idx].warmthRating;

        formalityRatingAvg /= 4;
        warmthRatingAvg /= 4;

        setOutfit({
            id: Date.now(), // Unique ID for the new item
            dateAdded: new Date().toJSON(),
            dateDeleted: null,
            dateLastWorn: null,
            timesWorn: 0,
            clothingIds,
            formalityRatingAvg,
            warmthRatingAvg,
            ownedByUser: !isDiscoveryMode,
        });
    };

    useEffect(() => {
        handleCancel();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Outfit Generator</Text>

            <View style={styles.featureRow}>
                <Text style={styles.label}>Discovery Mode</Text>
                <Switch
                    value={isDiscoveryMode}
                    onValueChange={handleDiscoveryModeToggle}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    ios_backgroundColor="#3e3e3e"
                />
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
                        {`There aren't enough items in your wardrobe to generate outfits. Please try moving the slider or adding more clothes to your wardrobe!`}{" "}
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

                <View style={styles.buttonContainer}>
                    <IconButton name="close-outline" onPress={handleCancel} />
                    <IconButton
                        name="checkmark-outline"
                        onPress={handleCheck}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: "center",
        height: "100%",
    },
    heading: {
        marginTop: 20,
        color: "black",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10,
    },
    subheading: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
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
        marginBottom: 40,
    },
    OutfitDisplay: {
        width: "50%",
        height: "60%",
    },
    optionsContainer: {
        marginTop: -340,
        width: "100%",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 10,
    },
    label: {
        padding: 10,
        fontSize: 18,
    },
});
