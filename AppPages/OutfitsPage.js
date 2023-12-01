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
    FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import OutfitDisplay from "../Component/OutfitDisplay";

// TODO: set this dynamically based on screen width
const NUM_COLUMNS = 2;

function SortMostRecent(a, b) {
    const dateA = new Date(a.dateAdded);
    const dateB = new Date(b.dateAdded);

    if (dateA > dateB) {
        return -1;
    }
    if (dateA < dateB) {
        return 1;
    }
    return 0;
}

export default function OutfitsPage({
    clothesData,
    outfitsData,
    updateOutfitsData,
}) {
    const Outfits = outfitsData
        .filter((item) => item.dateDeleted === null && item.ownedByUser)
        .sort(SortMostRecent);

    const [Select, setSelect] = useState(false);
    const [Selected, setSelected] = useState([]);

    const navigation = useNavigation();

    // TODO: Update this to use OutfitDisplay instead of Image (whether select is enabled or not)
    function RenderItem({ item }) {
        console.log("HERE")
        return (
            <View style={{ marginTop: 10, padding: 20 }}>
                {Select ? (
                    <TouchableOpacity
                        style={styles.selectButton}
                        onPress={() => SelectItem(item)}
                    >
                        <OutfitDisplay
                            style={[
                                styles.OutfitDisplay,
                                {
                                    borderWidth: Selected.includes(item.id)
                                        ? 3
                                        : 0,
                                    borderColor: "#33A8FF",
                                },
                            ]}
                            outfit={item}
                            clothesData={clothesData}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.selectButton}>
                        <OutfitDisplay
                            style={styles.OutfitDisplay}
                            outfit={item}
                            clothesData={clothesData}
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
                ownedByUser: PropTypes.bool.isRequired,
            })
        ).isRequired,
    };

    function EmptyList() {
        return (
            <Text style={styles.empty}>
                It seems you haven&apos;t saved any outfits yet! To get started,
                press the + icon above.
            </Text>
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
                    ListEmptyComponent={EmptyList}
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

    const DeleteItems = () => {
        updateOutfitsData(
            outfitsData.map((item) => {
                if (Selected.includes(item.id)) {
                    return {
                        ...item,
                        dateDeleted: new Date().toJSON(),
                    };
                }
                return item;
            })
        );
    };

    const AddItems = () => {
        navigation.navigate("Generator");
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

    return <View style={styles.container}>{OutfitsTab()}</View>;
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
    OutfitDisplay: {
        width: 140,
        height: 560,
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
