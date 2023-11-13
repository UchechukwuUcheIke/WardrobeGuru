
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming usage of MaterialIcons for icons
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Data from "../Wardrobe_dataset.json";


const Tab = createMaterialTopTabNavigator();



export default function WardrobePage() {
    const [Select, setSelect] = useState(true);
    const [TopImg, setTI] = useState(Data.Tops);
    const [BottomImg, setBI] = useState(Data.Bottoms);
    const [AccessoriesImg, setAI] = useState(Data.Accessories);
    const [ShoesImg, setSI] = useState(Data.Shoes);
    

    function Wardrobe_Tops() {
        return (
            <View style={styles.container}>
            <FlatList
            data = {TopImg}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
                return(
                    <View style={{marginTop:10, padding:20}}>
                        <TouchableOpacity style={styles.selectButton}>
                            <Image source={{ uri: item.url }} style={styles.image} /> 
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            </View>
        );
    }

    function Wardrobe_Tops_Select() {
        //console.log("selecteditem", Img);

        const pressImg = (item) => {
            const newItem = TopImg.map((val)=>{
                if (val.id === item.id) {
                    return {...val, selected:!val.selected};
                }
                else {
                    return val;
                }
            })
            setTI(newItem);
        }

        return (
            <View style={styles.container}>
            <FlatList
            data = {TopImg}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
                return(
                    <View style={{marginTop:10, padding:20}}>
                        <TouchableOpacity style={styles.selectButton} onPress={()=>pressImg(item)}>
                            <Image source={{ uri: item.url }} style={{width: 140, height: 140, margin: '2.5%', borderWidth:item.selected?3:0, borderColor: "#33A8FF"}} />
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            </View>
        );
    }

    function Wardrobe_Bottoms() {
        return (
            <View style={styles.container}>
            <FlatList
            data = {BottomImg}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
                return(
                    <View style={{marginTop:10, padding:20}}>
                        <TouchableOpacity style={styles.selectButton}>
                            <Image source={{ uri: item.url }} style={styles.image} /> 
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            </View>
        );
    }

    function Wardrobe_Bottoms_Select() {
        //console.log("selecteditem", Img);

        const pressImg = (item) => {
            const newItem = BottomImg.map((val)=>{
                if (val.id === item.id) {
                    return {...val, selected:!val.selected};
                }
                else {
                    return val;
                }
            })
            setBI(newItem);
        }

        return (
            <View style={styles.container}>
            <FlatList
            data = {BottomImg}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
                return(
                    <View style={{marginTop:10, padding:20}}>
                        <TouchableOpacity style={styles.selectButton} onPress={()=>pressImg(item)}>
                            <Image source={{ uri: item.url }} style={{width: 140, height: 140, margin: '2.5%', borderWidth:item.selected?3:0, borderColor: "#33A8FF"}} />
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            </View>
        );
    }

    function Wardrobe_Accessories() {
        return (
            <View style={styles.container}>
            <FlatList
            data = {AccessoriesImg}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
                return(
                    <View style={{marginTop:10, padding:20}}>
                        <TouchableOpacity style={styles.selectButton}>
                            <Image source={{ uri: item.url }} style={styles.image} /> 
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            </View>
        );
    }

    function Wardrobe_Accessories_Select() {
        //console.log("selecteditem", Img);

        const pressImg = (item) => {
            const newItem = AccessoriesImg.map((val)=>{
                if (val.id === item.id) {
                    return {...val, selected:!val.selected};
                }
                else {
                    return val;
                }
            })
            setAI(newItem);
        }

        return (
            <View style={styles.container}>
            <FlatList
            data = {AccessoriesImg}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
                return(
                    <View style={{marginTop:10, padding:20}}>
                        <TouchableOpacity style={styles.selectButton} onPress={()=>pressImg(item)}>
                            <Image source={{ uri: item.url }} style={{width: 140, height: 140, margin: '2.5%', borderWidth:item.selected?3:0, borderColor: "#33A8FF"}} />
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            </View>
        );
    }

    function Wardrobe_Shoes() {
        return (
            <View style={styles.container}>
            <FlatList
            data = {ShoesImg}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
                return(
                    <View style={{marginTop:10, padding:20}}>
                        <TouchableOpacity style={styles.selectButton}>
                            <Image source={{ uri: item.url }} style={styles.image} /> 
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            </View>
        );
    }

    function Wardrobe_Shoes_Select() {
        //console.log("selecteditem", Img);

        const pressImg = (item) => {
            const newItem = ShoesImg.map((val)=>{
                if (val.id === item.id) {
                    return {...val, selected:!val.selected};
                }
                else {
                    return val;
                }
            })
            setSI(newItem);
        }

        return (
            <View style={styles.container}>
            <FlatList
            data = {ShoesImg}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            renderItem={({item}) => {
                return(
                    <View style={{marginTop:10, padding:20}}>
                        <TouchableOpacity style={styles.selectButton} onPress={()=>pressImg(item)}>
                            <Image source={{ uri: item.url }} style={{width: 140, height: 140, margin: '2.5%', borderWidth:item.selected?3:0, borderColor: "#33A8FF"}} />
                        </TouchableOpacity>
                    </View>
                )
            }}
            />
            </View>
        );
    }

    const PressSB = () => {
        if (Select) {
            setSelect(false);
        }
        else {
            setSelect(true);
            for (let i = 0; i < TopImg.length; i++) {
                if (TopImg[i].selected == true) {
                    TopImg[i].selected = false;
                }
            }
            for (let i = 0; i < BottomImg.length; i++) {
                if (BottomImg[i].selected == true) {
                    BottomImg[i].selected = false;
                }
            }
            for (let i = 0; i < AccessoriesImg.length; i++) {
                if (AccessoriesImg[i].selected == true) {
                    AccessoriesImg[i].selected = false;
                }
            }
            for (let i = 0; i < ShoesImg.length; i++) {
                if (ShoesImg[i].selected == true) {
                    ShoesImg[i].selected = false;
                }
            }
        }
    }

    const deleteImg = () => {
        const newData = TopImg.filter(ImgData => ImgData.selected == false);
        setTI(newData);
        const newBottoms = BottomImg.filter(ImgData => ImgData.selected == false);
        setBI(newBottoms);
        const newAccessories = AccessoriesImg.filter(ImgData => ImgData.selected == false);
        setAI(newAccessories);
        const newShoes = ShoesImg.filter(ImgData => ImgData.selected == false);
        setSI(newShoes);
    }

    return (
        <View style={styles.container}>
            {Select && <View style={styles.header}>
                <TouchableOpacity style={styles.selectButton} onPress={PressSB}>
                    <Text style={styles.selectButtonText}>Select</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Your Wardrobe</Text>
                <TouchableOpacity>
                    <Icon name="add" size={30} color="#000" />
                </TouchableOpacity>
            </View>}
            {Select && <Tab.Navigator>
                <Tab.Screen name="Tops" component={Wardrobe_Tops} />
                <Tab.Screen name="Bottoms" component={Wardrobe_Bottoms} />
                <Tab.Screen name="Accessories" component={Wardrobe_Accessories} />
                <Tab.Screen name="Shoes" component={Wardrobe_Shoes} />
            </Tab.Navigator>}
            {!Select && <View style={styles.header}>
                <TouchableOpacity style={styles.selectButton} onPress={PressSB}>
                    <Text style={styles.selectButtonText}>Cancel</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Your Wardrobe</Text>
                <TouchableOpacity onPress={deleteImg}>
                    <Icon name="delete" size={30} color="#000" />
                </TouchableOpacity>
            </View>}
            {!Select && <Tab.Navigator>
                <Tab.Screen name="Tops" component={Wardrobe_Tops_Select} />
                <Tab.Screen name="Bottoms" component={Wardrobe_Bottoms_Select} />
                <Tab.Screen name="Accessories" component={Wardrobe_Accessories_Select} />
                <Tab.Screen name="Shoes" component={Wardrobe_Shoes_Select} />
            </Tab.Navigator>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    selectButton: {
        // Define styles for the select button
    },
    selectButtonText: {
        // Define styles for the select button text
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#e1e1e1',
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: 140,
        height: 140,
        margin: '2.5%',
    },
});
