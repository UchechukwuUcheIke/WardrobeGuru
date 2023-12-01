/* eslint-disable react/prop-types */
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

const Tab = createMaterialTopTabNavigator();

// TODO: set this dynamically based on screen width
const NUM_COLUMNS = 2;

function SortMostRecent(a, b) {
    const dateA = new Date(a.dateAdded);
    const dateB = new Date(b.dateAdded);

    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
}

export default function WardrobePage({ clothesData, updateClothesData }) {
    const [Select, setSelect] = useState(false);
    const [Accessories, setAccessories] = useState(
        clothesData
            .filter(
                (item) =>
                    item.dateDeleted === null &&
                    item.ownedByUser &&
                    item.category === "accessories"
            )
            .sort(SortMostRecent)
    );
    const [Tops, setTops] = useState(
        clothesData
            .filter(
                (item) =>
                    item.dateDeleted === null &&
                    item.ownedByUser &&
                    item.category === "tops"
            )
            .sort(SortMostRecent)
    );
    const [Bottoms, setBottoms] = useState(
        clothesData
            .filter(
                (item) =>
                    item.dateDeleted === null &&
                    item.ownedByUser &&
                    item.category === "bottoms"
            )
            .sort(SortMostRecent)
    );
    const [Shoes, setShoes] = useState(
        clothesData
            .filter(
                (item) =>
                    item.dateDeleted === null &&
                    item.ownedByUser &&
                    item.category === "shoes"
            )
            .sort(SortMostRecent)
    );

    const [Adding, setAdding] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState({}); // The item currently being edited

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
                            source={{ uri: item.imageUrl }}
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
                    <TouchableOpacity style={styles.selectButton}>
                        <Image
                            source={{ uri: item.imageUrl }}
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
                imageUrl: PropTypes.string.isRequired,
                selected: PropTypes.bool.isRequired,
                ownedByUser: PropTypes.bool.isRequired,
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

    const DeleteItems = () => {
        const newAccessories = Accessories.map((item) => {
            if (item.selected) {
                return { ...item, dateDeleted: Date.now(), selected: false };
            }
            return item;
        });
        const newTops = Tops.map((item) => {
            if (item.selected) {
                return { ...item, dateDeleted: Date.now(), selected: false };
            }
            return item;
        });
        const newBottoms = Bottoms.map((item) => {
            if (item.selected) {
                return { ...item, dateDeleted: Date.now(), selected: false };
            }
            return item;
        });
        const newShoes = Shoes.map((item) => {
            if (item.selected) {
                return { ...item, dateDeleted: Date.now(), selected: false };
            }
            return item;
        });
        updateClothesData({
            ...newAccessories,
            ...newTops,
            ...newBottoms,
            ...newShoes,
        });
        setSelect(false);
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
            imageUrl:
                "https://store.nytimes.com/cdn/shop/products/TruthHoodie-WhiteFront_1024x1024.jpg?v=1571439084",
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
            setIsEditModalVisible(true); // Show the edit modal
        }, 2000); // Simulate loading for 2 seconds
    }

    function handlePhotoOptionSelection() {
        // Simulate a delay for photo selection or capture
        setTimeout(() => {
            AddNewItem();
        }, 1000);
    }

    // Define a function to handle saving the edited item
    const handleSaveItem = (editedItem) => {
        setTops((prevItems) => [editedItem, ...prevItems]);
        setIsEditModalVisible(false); // Hide the edit modal
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
                <Tab.Screen name="Accessories" component={AccessoriesTab} />
                <Tab.Screen name="Tops" component={TopsTab} />
                <Tab.Screen name="Bottoms" component={BottomsTab} />
                <Tab.Screen name="Shoes" component={ShoesTab} />
            </Tab.Navigator>
            <ClothingItemModal
                visible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
                onSave={handleSaveItem}
                item={currentItem}
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
