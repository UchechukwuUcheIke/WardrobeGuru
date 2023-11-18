import React, { useEffect, useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
} from "react-native";

const ClothingItemModal = ({ visible, onClose, onSave, item }) => {
    //   const [nickname, setNickname] = useState(item.nickname || '');
    //   const [category, setCategory] = useState(item.category || '');
    //   const [formality, setFormality] = useState(item.formality || '');
    //   const [warmth, setWarmth] = useState(item.warmth || '');
    //   // add more states for other attributes

    const [nickname, setNickname] = useState("");
    const [category, setCategory] = useState("");
    const [formality, setFormality] = useState("");
    const [warmth, setWarmth] = useState("");

    // This effect will update the state whenever the item prop changes
    useEffect(() => {
        if (item) {
            setNickname(item.nickname || "");
            setCategory(item.category || "");
            setFormality(item.formality || "");
            setWarmth(item.warmth || "");
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
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
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
                <Text>Nick Name:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNickname}
                    value={nickname}
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
                <Button title="Save" onPress={handleSave} />
                <Button title="Cancel" onPress={onClose} />
            </View>
        </Modal>
    );
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
