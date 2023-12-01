import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal, View, Text, TextInput, StyleSheet, Image } from "react-native";
import TextButton from "./TextButton";

function ClothingItemModal({ visible, onClose, onSave, item }) {
    //   const [nickname, setNickname] = useState(item.nickname || '');
    //   const [category, setCategory] = useState(item.category || '');
    //   const [formality, setFormality] = useState(item.formality || '');
    //   const [warmth, setWarmth] = useState(item.warmth || '');
    //   // add more states for other attributes

    const [category, setCategory] = useState("");
    const [formality, setFormality] = useState(1);
    const [warmth, setWarmth] = useState(1);

    // This effect will update the state whenever the item prop changes
    useEffect(() => {
        if (item) {
            setCategory(item.category);
            setFormality(item.formalityRating);
            setWarmth(item.warmthRating);
        }
    }, [item]); // Only re-run the effect if the item changes

    const handleSave = () => {
        // Call the onSave function passed from the parent component, with the new details
        onSave({
            ...item,
            category,
            formality,
            warmth /* ... other attributes */,
        });
        onClose(); // Close the modal
    };

    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalView}>
                <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text>Category:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCategory}
                    value={category}
                />
                <Text>Formality:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setFormality}
                    value={formality}
                />
                <Text>Warmth:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWarmth}
                    value={warmth}
                />
                <TextButton text="Save" onPress={handleSave} />
                <TextButton text="Cancel" onPress={onClose} />
            </View>
        </Modal>
    );
}

// TODO: make these match the proptypes expected in the json file (or update the json file format)
ClothingItemModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    item: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        formalityRating: PropTypes.number.isRequired,
        warmthRating: PropTypes.number.isRequired,
    }).isRequired,
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
