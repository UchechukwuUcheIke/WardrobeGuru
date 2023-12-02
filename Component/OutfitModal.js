/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, View, Text, TextInput, StyleSheet, Image } from "react-native";
import TextButton from "./TextButton";
import OutfitDisplay from "./OutfitDisplay";

function OutfitModal({
    visible,
    onClose,
    onSave,
    item,
    editMode,
    toggleEditMode,
    clothesData
}) {
    const [formality, setFormality] = useState(1);
    const [warmth, setWarmth] = useState(1);

    // This effect will update the state whenever the item prop changes
    useEffect(() => {
        if (item) {
            setFormality(item.formalityRatingAvg);
            setWarmth(item.warmthRatingAvg)
        }
    }, [item]); // Only re-run the effect if the item changes

    const handleSave = () => {
        const formalityRatingAvg = formality === "" ? 1 : formality;
        const warmthRatingAvg = warmth === "" ? 1 : warmth;
        // Call the onSave function passed from the parent component, with the new details
        onSave({
            ...item,
            formalityRatingAvg,
            warmthRatingAvg /* ... other attributes */,
        });
        onClose(); // Close the modal
        toggleEditMode();
    };

    const getTextInputStyle = (isEditMode) => ({
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: isEditMode ? "#007BFF" : "#ddd", // Highlight border in edit mode
        backgroundColor: isEditMode ? "#FFFFFF" : "#F8F8F8", // Lighter background when not editable
        color: isEditMode ? "#000000" : "#777777", // Dim text color when not editable
        width: "100%",
    });

    // Format the date as "Mon DD, YYYY"
    const options = { month: "short", day: "numeric", year: "numeric" };

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <OutfitDisplay
                    style={styles.OutfitDisplay}
                    outfit={item}
                    clothesData={clothesData}
                />
                <Text>Formality:</Text>
                <TextInput
                    style={getTextInputStyle(editMode)}
                    onChangeText={(text) => {
                        const numericValue = parseInt(text, 10);
                        if (!Number.isNaN(numericValue) || text === "") {
                            setFormality(
                                text === ""
                                    ? ""
                                    : Math.min(5, Math.max(1, numericValue))
                            );
                        }
                    }}
                    value={formality}
                    editable={editMode}
                />
                <Text>Warmth:</Text>
                <TextInput
                    style={getTextInputStyle(editMode)}
                    onChangeText={(text) => {
                        const numericValue = parseInt(text, 10);
                        if (!Number.isNaN(numericValue) || text === "") {
                            setWarmth(
                                text === ""
                                    ? ""
                                    : Math.min(5, Math.max(1, numericValue))
                            );
                        }
                    }}
                    value={warmth}
                    editable={editMode}
                />
                {!editMode && (
                    <View style={styles.metaView}>
                        <Text style={styles.metaText}>
                            In Wardrobe Since:{" "}
                            {item.dateAdded === null
                                ? "?"
                                : new Date(item.dateAdded).toLocaleString(
                                      "en-US",
                                      options
                                  )}
                        </Text>
                        <Text style={styles.metaText}>
                            Last Worn:{" "}
                            {item.dateLastWorn === null
                                ? "?"
                                : new Date(item.dateLastWorn).toLocaleString(
                                      "en-US",
                                      options
                                  )}
                        </Text>
                        <Text style={styles.metaText}>
                            Total Times Worn: {item.timesWorn}
                        </Text>
                    </View>
                )}
                {/* Buttons for Edit and Close */}
                {!editMode && (
                    <>
                        <TextButton text="Edit" onPress={toggleEditMode} />
                        <TextButton text="Close" onPress={onClose} />
                    </>
                )}

                {/* Save and Cancel buttons only appear when in edit mode */}
                {editMode && (
                    <>
                        <TextButton text="Save" onPress={handleSave} />
                        <TextButton text="Cancel" onPress={onClose} />
                    </>
                )}
            </View>
        </Modal>
    );
}

// TODO: make these match the proptypes expected in the json file (or update the json file format)
OutfitModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    item: PropTypes.shape({
        formalityRatingAvg: PropTypes.number.isRequired,
        warmthRatingAvg: PropTypes.number.isRequired,
    }).isRequired,
    clothesData: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200,
        marginBottom: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: "#ddd",
        width: "100%",
    },
    metaView: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
        opacity: "50%",
    },
    metaText: {
        marginBottom: 5,
    },
    OutfitDisplay: {
        width: 70,
        height: 280,
    },
});

export default OutfitModal;
