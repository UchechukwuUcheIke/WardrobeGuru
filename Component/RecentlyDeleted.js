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

    if (dateA > dateB) {
        return -1;
    }
    if (dateA < dateB) {
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
    const Clothes = clothesData
        .filter(
            (item) =>
                item.dateDeleted &&
                Date.now() - Date.parse(item.dateDeleted) < THIRTY_DAYS_IN_MS
        )
        .sort(SortMostRecent);
    const Outfits = outfitsData
        .filter(
            (item) =>
                item.dateDeleted &&
                Date.UTC - Date.parse(item.dateDeleted) < THIRTY_DAYS_IN_MS
        )
        .sort(SortMostRecent);

    const [Select, setSelect] = useState(false);
    const [Selected, setSelected] = useState([]);

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
                                borderWidth: Selected.includes(item.id) ? 3 : 0,
                                borderColor: "#33A8FF",
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.selectButton}>
                        <Image
                            source={{ uri: item.imageUrl }}
                            style={styles.image}
                            resizeMode="contain"
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

    const ToggleSelect = () => {
        if (Select) {
            setSelected([]);
        }
        setSelect(!Select);
    };

    const SelectItem = (target) => {
        setSelected([...Selected, target.id]);
    };

    // TODO: only run the function relevant to the current tab
    const DeleteItems = () => {
        updateClothesData(
            clothesData.map((item) => {
                if (Selected.includes(item.id)) {
                    return {
                        ...item,
                        dateDeleted: null,
                    };
                }
                return item;
            })
        );
        updateOutfitsData(
            outfitsData.map((item) => {
                if (Selected.includes(item.id)) {
                    return {
                        ...item,
                        dateDeleted: null,
                    };
                }
                return item;
            })
        );
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
