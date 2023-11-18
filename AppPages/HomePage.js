import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import TextButton from "../Component/TextButton";
import OutfitDisplay from "../Component/OutfitDisplay";

export default function HomePage() {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>Hello, Johnathan!</Text>
                <Text style={styles.subheading}>
                    {" "}
                    {`Here's your outfit for the day!`}{" "}
                </Text>
            </View>

            <OutfitDisplay
                style={styles.OutfitDisplay}
                hatImgSrc="https://www.agnoulitahats.com/cdn/shop/files/DSC_0006.webp?crop=center&height=1875&v=1689711052&width=2500"
                shirtImgSrc="https://cdn11.bigcommerce.com/s-za5m5kya2c/images/stencil/1280x1280/products/263/644/Oppenheimer_Mock_Up_Edited__64095.1691524917.png?c=1"
                pantsImgSrc="https://static.vecteezy.com/system/resources/previews/021/809/260/original/yellow-pants-isolated-on-a-transparent-background-png.png"
                shoesImgSrc="https://cdn.imgbin.com/13/0/11/imgbin-dress-shoe-bata-shoes-oxford-shoe-hush-puppies-sandals-86zmS8Vd1d7BKFmqv15irniAM.jpg"
            />

            <View style={styles.optionsContainer}>
                <Slider
                    style={{ width: "50%", height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="#734F96"
                    maximumTrackTintColor="#000000"
                />

                <TextButton text="Looks good to me!" />

                <TextButton text="Pick something else" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,

        alignItems: "center",
        height: "100%",
    },
    headingContainer: {
        width: "100%",
        height: "20%",
    },
    heading: {
        color: "black",
        fontSize: 30,
        textAlign: "center",
    },
    subheading: {
        color: "black",
        fontSize: 20,
        textAlign: "center",
    },
    OutfitDisplay: {
        width: "50%",
        height: "50%",
    },
    optionsContainer: {
        width: "100%",
        height: "30%",
        alignItems: "center",
    },
});
