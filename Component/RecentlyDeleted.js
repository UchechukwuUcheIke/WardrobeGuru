/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Data from "../assets/data/recently_deleted.json";

const Tab = createMaterialTopTabNavigator();

export default function RecentlyDeletedPage() {
    const [Select, setSelect] = useState(false);
    const [Clothes, setClothes] = useState(Data.Clothes);
    const [Outfits, setOutfits] = useState(Data.Outfits);
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
                    <TouchableOpacity style={styles.selectButton}>
                        <Image
                            source={{ uri: item.url }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    function ClothesTab() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={Clothes}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    numColumns={2}
                    renderItem={RenderItem}
                />
            </View>
        );
    }

    function OutfitsTab() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={Outfits}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    numColumns={2}
                    renderItem={RenderItem}
                />
            </View>
        );
    }

    // TODO: only run the function relevant to the current tab
    const ToggleSelect = () => {
        if (Select) {
            const newClothes = Clothes.map((item) => {
                if (item.selected) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            setClothes(newClothes);
            const newOutfits = Outfits.map((item) => {
                if (item.selected) {
                    return { ...item, selected: !item.selected };
                }
                return item;
            });
            setOutfits(newOutfits);
        }
        setSelect(!Select);
    };

    // TODO: only run the function relevant to the current tab
    const SelectItem = (target) => {
        const newClothes = Clothes.map((item) => {
            if (item.id === target.id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setClothes(newClothes);
        const newOutfits = Outfits.map((item) => {
            if (item.id === target.id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setOutfits(newOutfits);
    };

    // TODO: only run the function relevant to the current tab
    const DeleteItems = () => {
        const newClothes = Clothes.filter((item) => !item.selected);
        setClothes(newClothes);
        const newOutfits = Outfits.filter((item) => !item.selected);
        setOutfits(newOutfits);
        setSelect(false);
    };

    useEffect(() => {
        if (Select) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity style={styles.tab} onPress={DeleteItems}>
                        <Icon
                            name="restore-from-trash"
                            size={30}
                            color="#000"
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={styles.tab} onPress={ToggleSelect}>
                        <Text style={styles.selectButtonText}>Cancel</Text>
                    </TouchableOpacity>
                ),
            });
        } else {
            navigation.setOptions({
                headerLeft: () => (
                    <HeaderBackButton onPress={() => navigation.goBack()} />
                ),
                headerRight: () => (
                    <TouchableOpacity style={styles.tab} onPress={ToggleSelect}>
                        <Text style={styles.selectButtonText}>Select</Text>
                    </TouchableOpacity>
                ),
            });
        }
    });

    return (
        <View style={styles.container}>
            <Tab.Navigator>
                <Tab.Screen name="Clothes" component={ClothesTab} />
                <Tab.Screen name="Outfits" component={OutfitsTab} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#FFFFFF",
        paddingTop: 55,
        paddingBottom: 0,
    },
    headerText: {
        fontSize: 16,
        fontWeight: "600",
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#e1e1e1",
    },
    tab: {
        padding: 10,
    },
    grid: {
        // Define styles for grid layout
    },
    scrollContainer: {
        flex: 1,
    },
    imageGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
    },
    image: {
        width: 140,
        height: 140,
        margin: "2.5%",
    },
});
