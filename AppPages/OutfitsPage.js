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
import Data from "../assets/data/saved_outfits.json";

// TODO: set this dynamically based on screen width
const NUM_COLUMNS = 2;

export default function OutfitPage() {
    const [Select, setSelect] = useState(false);
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

    RenderItem.propTypes = {
        item: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                selected: PropTypes.bool.isRequired,
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

    const SelectItem = (target) => {
        const newOutfits = Outfits.map((item) => {
            if (item.id === target.id) {
                return { ...item, selected: !item.selected };
            }
            return item;
        });
        setOutfits(newOutfits);
    };

    const DeleteItems = () => {
        const newOutfits = Outfits.filter((item) => !item.selected);
        setOutfits(newOutfits);
        setSelect(false);
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
