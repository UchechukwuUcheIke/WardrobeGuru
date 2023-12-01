/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TextButton from "../Component/TextButton";
import ClothingItemModal from "../Component/ClothingItemModal";

import Data from "../assets/data/wardrobe.json";

const Tab = createMaterialTopTabNavigator();

// TODO: set this dynamically based on screen width
const NUM_COLUMNS = 2;

export default function WardrobePage() {
    const [Select, setSelect] = useState(false);
    const [Tops, setTops] = useState(Data.Tops);
    const [Bottoms, setBottoms] = useState(Data.Bottoms);
    const [Accessories, setAccessories] = useState(Data.Accessories);
    const [Shoes, setShoes] = useState(Data.Shoes);

    const [Adding, setAdding] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState({}); // The item currently being edited

    const [editMode, setEditMode] = useState(false);

    const navigation = useNavigation();

    function RenderItem({ item }) {
        return (
            <View style={{ marginTop: 10, padding: 20 }}>
                {Select ? (
                    <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => SelectItem(item)}
                    >
                        <Image
                            source={{ uri: item.url }}
                            style={{
                                width: 140,
                                height: 140,
                                margin: "2.5%",
                                borderWidth: item.selected ? 3 : 0,
                                borderColor: "#33A8FF",
                            }}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity 
                        style={styles.selectButton}
                        onPress={() => showItemDetail(item)}>
                        <Image
                            source={{ uri: item.url }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    RenderItem.propTypes = {
        item: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                selected: PropTypes.bool.isRequired,
            })
        ).isRequired,
    };

    function EmptyList(items) {
        return (
            <Text style={styles.empty}>
                It seems you haven&apos;t added any {items} to your wardrobe
                yet! To get started, press the + icon above.
            </Text>
        );
    }

    function TopsTab() {
        return (
            <View style={styles.tabContainer}>
                <FlatList
                    data={Tops}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    numColumns={NUM_COLUMNS}
                    renderItem={RenderItem}
                    ListEmptyComponent={EmptyList("tops")}
                />
            </View>
        );
    }

    function BottomsTab() {
        return (
            <View style={styles.tabContainer}>
                <FlatList
                    data={Bottoms}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    numColumns={NUM_COLUMNS}
                    renderItem={RenderItem}
                    ListEmptyComponent={EmptyList("bottoms")}
                />
            </View>
        );
    }

    function AccessoriesTab() {
        return (
            <View style={styles.tabContainer}>
                <FlatList
                    data={Accessories}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    numColumns={NUM_COLUMNS}
                    renderItem={RenderItem}
                    ListEmptyComponent={EmptyList("accessories")}
                />
            </View>
        );
    }

    function ShoesTab() {
        return (
            <View style={styles.tabContainer}>
                <FlatList
                    data={Shoes}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    numColumns={NUM_COLUMNS}
                    renderItem={RenderItem}
                    ListEmptyComponent={EmptyList("shoes")}
                />
            </View>
        );
    }

    const ToggleSelect = () => {
        if (Select) {
            const newTops = Tops.map((item) => {
                if (item.selected) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            setTops(newTops);
            const newBottoms = Bottoms.map((item) => {
                if (item.selected) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            setBottoms(newBottoms);
            const newAccessories = Accessories.map((item) => {
                if (item.selected) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            setAccessories(newAccessories);
            const newShoes = Shoes.map((item) => {
                if (item.selected) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            setShoes(newShoes);
        }
        setSelect(!Select);
    };

    const SelectItem = (target) => {
        const newTops = Tops.map((item) => {
            if (item.id === target.id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setTops(newTops);
        const newBottoms = Bottoms.map((item) => {
            if (item.id === target.id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setBottoms(newBottoms);
        const newAccessories = Accessories.map((item) => {
            if (item.id === target.id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setAccessories(newAccessories);
        const newShoes = Shoes.map((item) => {
            if (item.id === target.id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setShoes(newShoes);
    };

    const DeleteItems = (itemToDelete) => {
        if (itemToDelete) {
            // Logic for deleting a single item
            setTops((prevItems) => prevItems.filter((item) => item.id !== itemToDelete.id));
            setBottoms((prevItems) => prevItems.filter((item) => item.id !== itemToDelete.id));
            setAccessories((prevItems) => prevItems.filter((item) => item.id !== itemToDelete.id));
            setShoes((prevItems) => prevItems.filter((item) => item.id !== itemToDelete.id));
        } else {
            const newTops = Tops.filter((item) => !item.selected);
            setTops(newTops);
            const newBottoms = Bottoms.filter((item) => !item.selected);
            setBottoms(newBottoms);
            const newAccessories = Accessories.filter((item) => !item.selected);
            setAccessories(newAccessories);
            const newShoes = Shoes.filter((item) => !item.selected);
            setShoes(newShoes);
            setSelect(false);
        }
    };

    function showModal() {
        setIsModalVisible(true);
    }

    function hideModal() {
        setIsModalVisible(false);
    }

    const AddItems = () => {
        showModal();
    };


    const showItemDetail = (item) => {
        setCurrentItem(item);        
        setEditMode(false);
        setIsEditModalVisible(true);
    };


    const toggleEditMode = () => {
        setEditMode(!editMode);
    };


    useEffect(() => {
        if (Select) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity style={styles.tab} onPress={DeleteItems}>
                        <Icon name="delete" size={30} color="#fff" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={styles.tab} onPress={ToggleSelect}>
                        <Text style={styles.selectText}>Cancel</Text>
                    </TouchableOpacity>
                ),
            });
        } else {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity style={styles.tab} onPress={AddItems}>
                        <Icon name="add-circle" size={30} color="#fff" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={styles.tab} onPress={ToggleSelect}>
                        <Text style={styles.selectText}>Select</Text>
                    </TouchableOpacity>
                ),
            });
        }
    });

    function AddNewItem() {
        // Step 1: Simulate selecting a photo
        const newItem = {
            id: Date.now().toString(), // Unique ID for the new item
            url: "https://store.nytimes.com/cdn/shop/products/TruthHoodie-WhiteFront_1024x1024.jpg?v=1571439084",
            category: "tops",
            selected: false,
            nickname: "New Hoodie",
            formality: "casual",
            warmth: "warm",
            timesWorn: 0,
            dateAdded: new Date().toLocaleDateString(),
        };

        // Step 2: Show loading icon
        setAdding(true);

        setTimeout(() => {
            // Step 3: Add the new item to the state
            hideModal();
            setAdding(false);
            setCurrentItem(newItem); // Set the new item as the current item
            setEditMode(true);
            setIsEditModalVisible(true); // Show the edit modal
        }, 2000); // Simulate loading for 2 seconds
    }

    function handlePhotoOptionSelection() {
        // Simulate a delay for photo selection or capture
        setTimeout(() => {
            AddNewItem();
        }, 1000);
    }


    // const handleSaveItem = (editedItem) => {
    //     setTops((prevItems) => [editedItem, ...prevItems]);
    //     setIsEditModalVisible(false); // Hide the edit modal
    // };
    
    const handleSaveItem = (editedItem) => {
        // Function to update the specific category array
        const updateArray = (array, setFunction) => {
            const index = array.findIndex(item => item.id === editedItem.id);
            if (index >= 0) {
                // Update existing item
                const newArray = [...array];
                newArray[index] = editedItem;
                setFunction(newArray);
            } else {
                // Add new item
                setFunction([editedItem, ...array]);
            }
        };
    
        // Determine which category to update
        switch (editedItem.category) {
            case 'tops':
                updateArray(Tops, setTops);
                break;
            case 'bottoms':
                updateArray(Bottoms, setBottoms);
                break;
            case 'accessories':
                updateArray(Accessories, setAccessories);
                break;
            case 'shoes':
                updateArray(Shoes, setShoes);
                break;
            default:
                // Handle unknown category
                break;
        }
    
        setIsEditModalVisible(false); // Hide the modal
    };


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent
                visible={isModalVisible}
                onRequestClose={hideModal}
            >
                {Adding ? (
                    // Show loading indicator when adding a new item
                    <View style={styles.modalView}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : (
                    <View style={styles.modalView}>
                        <TextButton
                            text="Take Photo"
                            onPress={() => handlePhotoOptionSelection("take")}
                        />
                        <TextButton
                            text="Upload Photo"
                            onPress={() => handlePhotoOptionSelection("upload")}
                        />
                        <TextButton text="Cancel" onPress={() => hideModal()} />
                    </View>
                )}
            </Modal>
            <Tab.Navigator>
                <Tab.Screen name="Tops" component={TopsTab} />
                <Tab.Screen name="Bottoms" component={BottomsTab} />
                <Tab.Screen name="Accessories" component={AccessoriesTab} />
                <Tab.Screen name="Shoes" component={ShoesTab} />
            </Tab.Navigator>
            <ClothingItemModal
                visible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
                onSave={handleSaveItem}
                item={currentItem}
                editMode={editMode} // Pass this state down to the modal
                toggleEditMode={toggleEditMode}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    tabContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tab: {
        padding: 10,
    },
    image: {
        width: 140,
        height: 140,
        margin: "2.5%",
    },
    empty: {
        padding: 50,
        fontSize: 16,
    },
    selectText: {
        color: "white",
    },
});
