import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, View, Text, TextInput, StyleSheet, Image } from "react-native";
import TextButton from "./TextButton";

function ClothingItemModal({ visible, onClose, onSave, item, editMode, toggleEditMode}) {
    //   const [nickname, setNickname] = useState(item.nickname || '');
    //   const [category, setCategory] = useState(item.category || '');
    //   const [formality, setFormality] = useState(item.formality || '');
    //   const [warmth, setWarmth] = useState(item.warmth || '');
    //   // add more states for other attributes

    const [id, setId] = useState("");
    const [nickname, setNickname] = useState("");
    const [category, setCategory] = useState("");
    const [formality, setFormality] = useState("");
    const [warmth, setWarmth] = useState("");
    const [dateAdded, setDateAdded] = useState("");
    const [dateLastWorn, setDateLastWorn] = useState("");
    const [timesWorn, setTimesWorn] = useState("");

    // This effect will update the state whenever the item prop changes
    useEffect(() => {
        if (item) {
            setId(item.id || "");
            setNickname(item.nickname || "");
            setCategory(item.category || "");
            setFormality(item.formality || "");
            setWarmth(item.warmth || "");
            setDateAdded(item.dateAdded || "");
            setDateLastWorn(item.dateLastWorn || "");
            setTimesWorn(item.timesWorn || "");
        }
    }, [item]); // Only re-run the effect if the item changes

    const handleSave = () => {
        // Call the onSave function passed from the parent component, with the new details
        onSave({
            ...item,
            nickname,
            category,
            formality,
            warmth /* ... other attributes */,
        });
        onClose(); // Close the modal        
        toggleEditMode(); 
    };

    const getTextInputStyle = (isEditMode) => {
        return {
            height: 40,
            marginVertical: 10,
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            borderColor: isEditMode ? "#007BFF" : "#ddd", // Highlight border in edit mode
            backgroundColor: isEditMode ? "#FFFFFF" : "#F8F8F8", // Lighter background when not editable
            color: isEditMode ? "#000000" : "#777777", // Dim text color when not editable
            width: "100%",
        };
    };

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                {/* Display the photo */}
                {item.url && (
                    <Image
                        source={{ uri: item.url }}
                        style={styles.image}
                        resizeMode="contain"
                    />
                )}
                {/* <Text>Nick Name:</Text>
                <TextInput
                    style={getTextInputStyle(editMode)}
                    onChangeText={setNickname}
                    value={nickname}
                    editable={editMode}
                /> */}
                <Text>Category:</Text>
                <TextInput
                    style={getTextInputStyle(editMode)}
                    onChangeText={setCategory}
                    value={category}
                    editable={editMode}
                />
                <Text>Formality:</Text>
                <TextInput
                    style={getTextInputStyle(editMode)}
                    onChangeText={setFormality}
                    value={formality}
                    editable={editMode}
                />
                <Text>Warmth:</Text>
                <TextInput
                    style={getTextInputStyle(editMode)}
                    onChangeText={setWarmth}
                    value={warmth}
                    editable={editMode}
                />
                <Text>Date Added:</Text>
                <TextInput
                    style={getTextInputStyle(false)}
                    value={dateAdded}
                    editable={false}
                />
                <Text>Date Last Worn:</Text>
                <TextInput
                    style={getTextInputStyle(false)}
                    value={dateLastWorn}
                    editable={false}
                />
                <Text>Times Worn:</Text>
                <TextInput
                    style={getTextInputStyle(false)}
                    value={timesWorn}
                    editable={false}
                />
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
ClothingItemModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    item: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
            selected: PropTypes.bool.isRequired,
        })
    ).isRequired,
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
});

export default ClothingItemModal;
