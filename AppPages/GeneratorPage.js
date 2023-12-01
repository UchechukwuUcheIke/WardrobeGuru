/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import Slider from "@react-native-community/slider";
import IconButton from "../Component/IconButton";
import OutfitDisplay from "../Component/OutfitDisplay";

export default function GeneratorPage({ clothesData, outfitsData }) {
    const [isDiscoveryMode, setDiscoveryMode] = useState(false);
    const [formalityLevel, setFormalityLevel] = useState(3);
    const handleDiscoveryModeToggle = () => {
        setDiscoveryMode(!isDiscoveryMode);
    };

    const handleFormalityChange = (value) => {
        setFormalityLevel(value);
    };

    const handleCheck = () => {
        // Handle check action
    };

    const handleCancel = () => {
        // Handle cancel action
    };

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

            <View style={styles.featureRow}>
                <Text style={styles.label}>Casual</Text>
                <Slider
                    style={{ width: 150, height: 40, marginBottom: 50 }}
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

            <OutfitDisplay
                style={styles.OutfitDisplay}
                outfit={outfitsData[0]}
                clothesData={clothesData}
            />

            <View style={styles.optionsContainer}>
                <IconButton name="close-outline" />
                <IconButton name="checkmark-outline" />
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
    featureRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    OutfitDisplay: {
        width: "50%",
        height: "60%",
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 20,
    },
    label: {
        fontSize: 20,
    },
});
