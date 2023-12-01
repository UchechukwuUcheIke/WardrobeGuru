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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { HeaderBackButton } from "@react-navigation/elements";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

// TODO: set this dynamically based on screen width
const NUM_COLUMNS = 2;

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

function SortMostRecent(a, b) {
    const dateA = new Date(a.dateDeleted);
    const dateB = new Date(b.dateDeleted);

    if (dateA < dateB) {
        return -1;
    }
    if (dateA > dateB) {
        return 1;
    }
    return 0;
}

export default function RecentlyDeletedPage({
    clothesData,
    outfitsData,
    updateClothesData,
    updateOutfitsData,
}) {
    const [Select, setSelect] = useState(false);
    const [Clothes, setClothes] = useState(
        clothesData
            .filter(
                (item) =>
                    item.dateDeleted &&
                    Date.now() - Date.parse(item.dateDeleted) <
                        THIRTY_DAYS_IN_MS
            )
            .sort(SortMostRecent)
    );
    const [Outfits, setOutfits] = useState(
        outfitsData
            .filter(
                (item) =>
                    item.dateDeleted &&
                    Date.UTC - Date.parse(item.dateDeleted) < THIRTY_DAYS_IN_MS
            )
            .sort(SortMostRecent)
    );

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
            })
        ).isRequired,
    };

    function EmptyList(items) {
        return (
            <Text style={styles.empty}>No recently deleted {items} found.</Text>
        );
    }

    function ClothesTab() {
        return (
            <View style={styles.tabContainer}>
                <FlatList
                    data={Clothes}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    numColumns={NUM_COLUMNS}
                    renderItem={RenderItem}
                    ListEmptyComponent={EmptyList("clothes")}
                />
            </View>
        );
    }

    function OutfitsTab() {
        return (
            <View style={styles.tabContainer}>
                <FlatList
                    data={Outfits}
                    keyExtractor={(item) => item.id}
                    horizontal={false}
                    numColumns={NUM_COLUMNS}
                    renderItem={RenderItem}
                    ListEmptyComponent={EmptyList("outfits")}
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
        const newClothes = Clothes.map((item) => {
            if (item.selected) {
                return { ...item, dateDeleted: null, selected: false };
            }
            return item;
        });
        updateClothesData(newClothes);
        const newOutfits = Outfits.map((item) => {
            if (item.selected) {
                return { ...item, dateDeleted: null, selected: false };
            }
            return item;
        });
        updateOutfitsData(newOutfits);
        setSelect(false);
    };

    useEffect(() => {
        if (Select) {
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity style={styles.tab} onPress={DeleteItems}>
                        <Icon name="restore" size={30} color="#000" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={styles.tab} onPress={ToggleSelect}>
                        <Text>Cancel</Text>
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
                        <Text>Select</Text>
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
});
